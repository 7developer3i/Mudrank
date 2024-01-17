import { useDispatch, useSelector } from "react-redux";
import portfolio from "../../../images/no_invest.png";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BaseUrl } from "../../../apis/contant";
import AuthContext from "../../../context/AuthContext";
import Cookies from "js-cookie";
import toast, { Toaster } from 'react-hot-toast';


const BankDetails = () => {

  const authcontext = useContext(AuthContext);
  const { bankData, setBankData} = authcontext

  const profile_details = useSelector((state) => state.profile_details);
  const Investor_data = useSelector((state) => state.fetch_investor_data.data);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState(false);
  const [editBankDetails, setEditBankDetails] = useState(true);
  const [bankname, setBankname] = useState("")
  const [accnum, setAccnum] = useState("")
  const [ifccode, setIfccode] = useState("")




  const { register, handleSubmit, getValues } = useForm({

  });

  const fetchData = () => {
    const id = Cookies.get("user_id")
    axios.get(`${BaseUrl.url}fetchbankdetails/${id}`).then((res) => {
      // console.log(res.data,"kkkk");
      setBankData(res.data)
    }).catch((err) => {
      console.log("err", err);
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const editData = (e) => {
    // console.log("called edit");
    const id = Cookies.get("user_id")
    e.preventDefault()
    axios.put(`${BaseUrl.url}updatebankdetails/${id}`, { "ifsc_code": ifccode, "account_number": accnum, "bank_name": bankname }).then((res) => {
      console.log(res.data);
      if (res.data.status == 200) {
        setEditBankDetails(true)
        toast.success(res.data.message, {
          duration: 2000, position: "top-center"
        });
      }
    }).catch((err) => {
      console.log("err", err);
    })
  }

  const EditBankDetails = () => {
    return (
      <>
      
      <div className="bank_edit_form">
        <form>
          <div className="form_input">
            <label for="">
              <p className="sml">Bank Name</p>
            </label>
            <input value={bankname} type="text" onChange={(e) => setBankname(e.target.value)} />
          </div>

          <div className="form_input">
            <label for="">
              <p className="sml">Account Number</p>
            </label>
            <input  value={accnum} onChange={(e) => setAccnum(e.target.value)} />
          </div>

          <div className="form_input">
            <label for="">
              <p className="sml">IFSC Code</p>
            </label>
            <input value={ifccode} onChange={(e) => setIfccode(e.target.value)} />
          </div>

          <div className="save_can">
            <button
              className="button wclr bbg"
              tabIndex="0"
              type="submit"
              colour="primary" onClick={(e) => editData(e)}
            >
              Save Changesssss
              <span className="load_data"></span>
            </button>
            <button
              className="button wclr bblk"
              tabIndex="0"
              type="button"
              colour="primary"
              id="close-email"
              onClick={() => setEditBankDetails(false)
              }
            >
              Cancel
              <span className="load_data"></span>
            </button>
          </div>
        </form>
      </div>
      </>
    );
  };

  const bankDetailsTrue = () => {
    return (
      <>
      
        {bankData &&
          <>
            <div className="bank_data">
              <div className="mypro_data_item">
                <p className="sml">Account Holder Name</p>
                <div className="ot_data">

                  <p className="sml">{bankData && bankData.account_holder_name}</p>
                </div>
              </div>
              <div className="mypro_data_item">
                <p className="sml">Bank Name</p>
                <div className="ot_data">
                  <p className="sml">{bankData && bankData.bank_name}</p>
                </div>
              </div>
              <div className="mypro_data_item">
                <p className="sml">Account Number</p>
                <div className="ot_data">
                  <p className="sml">{bankData && bankData.account_number}</p>
                </div>
              </div>
              <div className="mypro_data_item">
                <p className="sml">IFSC Code</p>
                <div className="ot_data">
                  <p className="sml">{bankData && bankData.ifsc_code}</p>
                </div>
              </div>
            </div>
          </>
        }
      </>
    );
  };

  const noBankDetails = () => {
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
          <h5>No Bank Details</h5>
          <p> You have not add Bank details on Mudrank</p>
        </div>
        <div className="inner_btn">
          <a onClick={() => navigate("/kyc-form")} className="button wclr bblk">
            Add Bank Details
          </a>
        </div>
      </div>
    );
  };

  // useEffect(() => {
  //   if (bankData) {
  //     setError(false);
  //   }
  // }, [bankData])

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    <div
      className={`live_tab_inn${profile_details.bank_details ? " active" : ""}`}
    >
      <div className="mypro_inner">
        {error && noBankDetails()}

        {!error && <div className="bank_details">
          <div className="ot_data">
            <button
              className=""
              tabIndex="0"
              type="button"
              colour="primary"
              id="email"
              onClick={() => {
                setBankname(bankData.bank_name); setAccnum(bankData.account_number);
                setIfccode(bankData.ifsc_code)
                setEditBankDetails(false)
              }}
            >
              Edit
            </button>
          </div>
          <div className="mypro_cnt">
            <div className="mypro_item">
              <p className="mypro_tt">Bank Details</p>
              <div className="mypro_data">
                {editBankDetails && bankDetailsTrue()}
                {(!editBankDetails && bankData) && EditBankDetails()}
              </div>
            </div>
          </div>
        </div>}

      </div>
    </div>
    </>
  );
};

export default BankDetails;
