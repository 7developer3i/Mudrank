import React, { useState, useEffect } from "react";
import portfolio from "../../../images/no_invest.png";
import { useSelector } from "react-redux";
import axios from "axios";
import { useForm } from "react-hook-form";
import { BaseUrl } from "../../../apis/contant";
import Cookies from "js-cookie";
import SetCookie from "../../../hook/setCookie";
import toast, { Toaster } from 'react-hot-toast';

const NominneDetals = () => {
  const profile_details = useSelector((state) => state.profile_details);
  const Investor_data = useSelector((state) => state.fetch_investor_data.data);

  const [error, setError] = useState(true);
  const [editNomieeDetails, setEditNomineeDetails] = useState(false);
  const [getData, setGateData] = useState([])
  const user_id = Cookies.get("user_id")

  const showData = () => {
    const id = user_id
    axios.get(`${BaseUrl.url}nominee/${id}`).then((res) => {
      console.log(res.data, "rewee");
      setGateData(res.data.data);
      if (res.data.data.length > 0) {
        setError(false);
      } else {
        setError(true);
      }
    }).catch((err) => {
      console.log("err", err);
    })

  };

  useEffect(() => {
    showData()
  }, [])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Name: '',  // Default values or leave empty for new entries
      DateOfBirth: '',
      ParentName: '',
      Relationship: '',
      ContactNumber: '',
    },
  });

  useEffect(() => {
    if (editNomieeDetails) {  // Assuming isEdit is a state variable indicating whether it's an edit mode
      setValue('name', getData[0].Name);
      setValue('dob', getData[0].DateOfBirth);
      setValue('parentname', getData[0].ParentName);
      setValue('relationominee', getData[0].Relationship);
      setValue('contact', getData[0].ContactNumber);
    }
  }, [editNomieeDetails, getData[0]]);


  const onSubmit = (data) => {
    if (editNomieeDetails) {
      axios.put(`${BaseUrl.url}nominee/${user_id}`, { data }).then((res) => {
        console.log(res.data.message, "edit nominee respone");
        if (res.data.status == 200) {
          const id = user_id
          toast.success(res.data.message, {
            duration: 1000, position: "top-center"
          });
          axios.get(`${BaseUrl.url}nominee/${id}`).then((res) => {
            console.log(res.data, "rewee");
            setGateData(res.data.data);
            if (res.data.data.length > 0) {
              setError(false);
            } else {
              setError(true);
            }
          }).catch((err) => {
            console.log("err", err);
          })
          setError(false);
          setEditNomineeDetails(false);
        }
      }).catch((err) => {
        console.log("err", err);
      })
    } else {
      data.user_id = user_id
      axios.post(`${BaseUrl.url}nominee`, { data }).then((res) => {
        SetCookie("nominee_id", res.data.id)
        if (res.data.status == 200) {
          reset()
          toast.success(res.data.message, {
            duration: 1000, position: "top-center"
          });
          setEditNomineeDetails(false)
          showData()
        }
      }).catch((err) => {
        console.log(err, "err");
      })

    }
  };

  const noNomineeDetails = () => {
    return (
      <div className="no_item">
        <div className="no_img">
          <div
            className="backimg"
            style={{
              backgroundImage: `url(${portfolio})`,
            }}
          >
            <svg
              className="transparent_svg"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 311 211"
            >
              <rect
                className="cls-1"
                x="0.5"
                y="0.5"
                width="310"
                height="210"
              ></rect>
            </svg>
          </div>
        </div>
        <div className="no_cnt">
          <h5>No Nominee Details</h5>
          <p> You have not add Nominee details on Mudrank</p>
        </div>
        <div className="inner_btn">
          <a
            onClick={() => {
              setError(false);
              setEditNomineeDetails(true);
            }}
            className="button wclr bblk"
          >
            Add Nominee Details
          </a>
        </div>
      </div>
    );
  };

  const trueNomineeDetails = () => {
    return (
      <>
        {getData.length > 0 &&
          <>
            <div className="bank_data">
              <div className="mypro_data_item">
                <p className="sml">Nominee Name</p>
                <div className="ot_data">
                  <p className="sml">{getData[0].Name}</p>
                </div>
              </div>
              <div className="mypro_data_item">
                <p className="sml">Nominee Date of Birth</p>
                <div className="ot_data">
                  <p className="sml">{getData[0].DateOfBirth}</p>
                </div>
              </div>
              <div className="mypro_data_item">
                <p className="sml">Name of Parent</p>
                <div className="ot_data">
                  <p className="sml">{getData[0].ParentName}</p>
                </div>
              </div>
              <div className="mypro_data_item">
                <p className="sml">Relationship with nominee</p>
                <div className="ot_data">
                  <p className="sml">{getData[0].Relationship}</p>
                </div>
              </div>
            </div>
            <div className="mypro_data_item">
              <p className="sml">Contact Number</p>
              <div className="ot_data">
                <p className="sml">{getData[0].ContactNumber}</p>
              </div>
            </div>
          </>
        }
      </>
    );
  };

  const EditNomineeDetails = () => {
    return (
      <div className="bank_edit_form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form_input">
            <label for="">
              <p className="sml">Nomineeeeerrrr  Name</p>
            </label>
            <input type="text" {...register("name", { required: true })} />
            {errors.name && (
              <span style={{ color: "red" }}>This field is required</span>
            )}
          </div>

          <div className="form_input">
            <label for="">
              <p className="sml">Nominee Date of Birth</p>
            </label>
            <input type="text" {...register("dob", { required: true })} />
            {errors.dob && (
              <span style={{ color: "red" }}>This field is required</span>
            )}
          </div>

          <div className="form_input">
            <label for="">
              <p className="sml">Name of Parent</p>
            </label>
            <input
              type="text"
              {...register("parentname", { required: true })}
            />
            {errors.parentname && (
              <span style={{ color: "red" }}>This field is required</span>
            )}
          </div>

          <div className="form_input">
            <label for="">
              <p className="sml">Relationship with nominee</p>
            </label>
            <input
              type="text"
              {...register("relationominee", { required: true })}
            />
            {errors.relationominee && (
              <span style={{ color: "red" }}>This field is required</span>
            )}
          </div>

          <div className="form_input">
            <label for="">
              <p className="sml">Contact Number</p>
            </label>
            <input type="text" {...register("contact", { required: true })} />
            {errors.contact && (
              <span style={{ color: "red" }}>This field is required</span>
            )}
          </div>



          {editNomieeDetails ? (<div className="save_can">
            <button
              className="button wclr bbg"
              tabIndex="0"
              // type="submit"
              colour="primary"
            >
              update Changes
              <span className="load_data"></span>
            </button>
            <button
              className="button wclr bblk"
              tabIndex="0"
              type="button"
              colour="primary"
              id="close-email"
            >
              Cancel
              <span className="load_data"></span>
            </button>
          </div>) : (<div className="save_can">
            <button
              className="button wclr bbg"
              tabIndex="0"
              // type="submit"
              colour="primary"
            >
              Save Changes
              <span className="load_data"></span>
            </button>
            <button
              className="button wclr bblk"
              tabIndex="0"
              type="button"
              colour="primary"
              id="close-email"
            >
              Cancel
              <span className="load_data"></span>
            </button>
          </div>)}

        </form>
      </div>
    );
  };

  const fetchBankDetailsData = async () => {
    try {
      const response = await axios.get("");
      setError(false);
    } catch (error) {
      // setError(true)
      throw error;
    }
  };

  useEffect(() => {
    fetchBankDetailsData();
  }, []);

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div
        className={`live_tab_inn${profile_details.nominee_details ? " active" : ""
          }`}
      >
        {error && noNomineeDetails()}
        {(!error) && (
          <div className="mypro_inner">
            <div className="bank_details">
              <div className="ot_data">
                <button
                  className=""
                  tabIndex="0"
                  type="button"
                  colour="primary"
                  id="email"
                  onClick={() => setEditNomineeDetails(true)}
                >
                  Edit
                </button>
              </div>
              <div className="mypro_cnt">
                <div className="mypro_item">
                  <p className="mypro_tt">Nominee Details</p>
                  <div className="mypro_data">
                    {!editNomieeDetails && trueNomineeDetails()}
                    {editNomieeDetails && EditNomineeDetails()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NominneDetals;
