import React, { useEffect, useState } from "react";
import axios from "axios";
import banner from "../../images/banner.png";
import { useDispatch, useSelector } from "react-redux";
import { show_page } from "../../feature/navbaraction/navbarSlice";
import { useNavigate } from "react-router-dom";
import { currenctSteps } from "../../feature/kycsteps/action";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { fetchDataSuccess } from "../../feature/investor-profile/fetchProfileData";
import { useForm } from "react-hook-form";
import { BaseUrl } from "../../apis/contant";
import Cookies from "js-cookie";
import toast, { Toaster } from 'react-hot-toast';

export const KycForm = () => {
  const Investor_data = useSelector((state) => state.fetch_investor_data.data);
  const currentStep = useSelector((state) => state.kyc_steps);

  const [dateOfBirth, setDateOfBirth] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [isValidPan, setIsValidPan] = useState(true);
  const [full_name, setFullName] = useState(null);
  const [validpannumber, setValidPanNumber] = useState(false);

  // errors
  const [panError, setPanError] = useState(null);


  const authcontext = useContext(AuthContext);
  const { loggedInUserId, bankname, setBankname, accountnum, setAccountnum,
    ifsccode, setIfsccode, } = authcontext;
  // const onSubmit = async (data) => {
  //   try {
  //     const response = await fetch(`${BaseUrl.url}kyc/bank-details`, {
  //       method: "POST",
  //       body: JSON.stringify({ ...data, user_id: Investor_data.id }),
  //       headers: { 'content-type': 'application/json' }
  //     });
  //     const datas = await response.json();
  //     if (datas.message === "Bank Account details verified successfully.") {
  //       alert(datas.message);
  //       reset();
  //     } else {
  //       console.log("error bank details");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     alert(error.response.data.message);
  //   }
  // };

useEffect(()=>{
  document.body.style.backgroundColor="black"
})

const handleSubmit = (e) => {
  e.preventDefault()
  console.log("bb", bankname, "ccc", accountnum, "ddd", ifsccode);


  const id = Cookies.get("user_id")
  axios.post(`${BaseUrl.url}bankdetails/${id}`, {"bank_name": bankname,"account_number": accountnum,"ifsc_code": ifsccode}).then((res) => {
    console.log(res.data);
    if (res.data.status == 200) {
      setIfsccode("")
      setAccountnum("")
      setBankname("")
      toast.success(res.data.message, {
        duration: 1000, position: "top-center"
      })
    }
  }).catch((err) => {
    console.log("err", err);
  })
}


// useEffect(()=>{
//     handleSubmit()
// },[])

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDateOfBirthChange = (e) => {
    const dob = e.target.value;
    setDateOfBirth(dob);
  };

  const handlePanNumberChange = (e) => {
    const pan = e.target.value;
    setPanNumber(pan);

    // Validate PAN number using regex (AAAAA9999A format)
    const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    setIsValidPan(regex.test(pan));
  };

  // const handleSubmits = async (e) => {
  //   e.preventDefault();
  //   const parsedDate = new Date(dateOfBirth);
  //   const formattedDate = `${parsedDate.getMonth() + 1}-${parsedDate.getDate()}-${parsedDate.getFullYear()}`;

  //   try {
  //     const response = await axios.post(`${BaseUrl.url}kyc/verify`, {
  //       date_of_birth: formattedDate,
  //       user_id: Investor_data.id,
  //       pancard_number: panNumber,
  //     });
  //     if (response.data.data.code === 200) {
  //       setValidPanNumber(true);
  //       setPanError(null);
  //       setFullName(response.data.data.data.full_name);
  //       fetchInvestorProfileData();
  //     }
  //   } catch (error) {
  //     setPanError(error.response.data.message);
  //     console.log(error);
  //   }
  // };

  const fetchInvestorProfileData = async () => {
    if (loggedInUserId) {
      try {
        const response = await axios.get(`${BaseUrl.url}investor/profile/${loggedInUserId}`);
        dispatch(fetchDataSuccess(response.data.profileData));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
     <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <section className="login">
        <div className="bcontainer">
          <div className="kyc_heading">
            <div className="page_head">
              <a
                onClick={() => {
                  navigate("/mainpage");
                  dispatch(show_page("profile"));
                }}
              >
                <p className="bck_btn">
                  <svg
                    className="bck_svg"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 7 12"
                    width="7"
                    height="12"
                    fill="none"
                  >
                    <path
                      d="M1.22445 10.5789L1.22434 10.579L1.21766 10.5723C0.95179 10.3064 0.95179 9.87 1.21766 9.60412L4.78994 6.03184C4.94595 5.87584 4.94595 5.62193 4.78994 5.46593L1.21766 1.89365C0.95179 1.62777 0.95179 1.19133 1.21766 0.925457C1.48354 0.659584 1.91998 0.659584 2.18585 0.925457L5.75813 4.49774C6.44589 5.18549 6.44589 6.31228 5.75813 7.00004L2.18585 10.5723C2.04959 10.7086 1.87459 10.7731 1.70176 10.7731C1.52087 10.7731 1.35168 10.6976 1.22445 10.5789Z"
                      fill="#090909"
                      stroke="#090909"
                      strokeWidth="0.547896"
                    ></path>
                  </svg>
                  Back{" "}
                </p>
              </a>
            </div>

            <div className="kyc_tt">
              <h4>Complete your KYC</h4>
              <p>Verify your account in just a few simple steps</p>
            </div>

            <div className="kyc_steps">
              <div className="kyc_inner_steps">
                <div className="kyc_steps_lists">
                  <div className="kyc_step_linner">
                    <div className="kyc_tab_list">
                      <button
                        tabIndex="-1"
                        type="button"
                        role="tab"
                        aria-selected="false"
                      >
                        <div>
                          <span className="stp_icn">
                            {currentStep.first_step ? (
                              "1"
                            ) : (
                              <svg
                                className="svg"
                                focusable="false"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                data-testid="CheckIcon"
                              >
                                <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                              </svg>
                            )}
                          </span>
                          <p className="stp_tt sml">Email</p>
                        </div>
                        <span className="btm_brd"></span>
                      </button>
                      <button
                        className={`${currentStep.second_step ? "active" : ""}`}
                        tabIndex="0"
                        type="button"
                        role="tab"
                        aria-selected="true"
                      >
                        <div>
                          <span className="stp_icn">
                            {currentStep.second_step ? (
                              "2"
                            ) : (
                              <svg
                                className="svg"
                                focusable="false"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                data-testid="CheckIcon"
                              >
                                <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                              </svg>
                            )}
                          </span>
                          <p className="stp_tt sml">Identification</p>
                        </div>
                        <span className="btm_brd"></span>
                      </button>
                      <button
                        type="button"
                        role="tab"
                        aria-selected="false"
                        className={`${currentStep.third_step ? "active" : ""}`}
                      >
                        <div>
                          <span className="stp_icn">
                            {currentStep.third_step ? (
                              "3"
                            ) : (
                              <svg
                                className="svg"
                                focusable="false"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                data-testid="CheckIcon"
                              >
                                <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                              </svg>
                            )}
                          </span>
                          <p className="stp_tt sml">Bank details</p>
                        </div>

                        <span className="btm_brd"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* varify identity */}

            {/* {currentStep.second_step && !validpannumber && (
              <div className="inner_container log_inner">
                <div
                  className="inner_img backimg"
                  style={{ backgroundImage: `url(${banner})` }}
                >
                  <div className="form_inner">
                    <div className="page_head">
                      <h5 className="ssize">Verify Your Identity</h5>
                    </div>
                    <div className="login_form kyc_form">
                      <form>
                        <div className="form_input">
                          <label htmlFor="email">
                            <p>PAN</p>
                          </label>
                          <input
                            type="text"
                            id="email"
                            name="fname"
                            placeholder="Enter your PAN"
                            value={panNumber}
                            onChange={handlePanNumberChange}
                          />
                        </div>
                        <div className="form_input">
                          <label htmlFor="password">
                            <p>Date of Birth</p>
                          </label>
                          <input
                            type="date"
                            id="password"
                            name="password"
                            placeholder="YYYY/MM/DD"
                            value={dateOfBirth}
                            onChange={handleDateOfBirthChange}
                          />
                        </div>
                        {panError !== null && <p style={{ color: "red" }}>{panError}</p>}
                        <input
                          onClick={(e) => handleSubmits(e)}
                          className="button"
                          type="submit"
                          value="Continue"
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )} */}

            {/* varify details */}

            {validpannumber && (
              <div className="inner_container log_inner">
                <div
                  className="inner_img backimg"
                  style={{ backgroundImage: `url(${banner})` }}
                >
                  <div className="form_inner login_form">
                    <div className="page_head">
                      <h5 className="ssize">Verify Your Details</h5>
                    </div>

                    <div className="mypro_data">
                      <div className="mypro_data_item">
                        <p className="sml">Full Name</p>
                        <div className="ot_data">
                          <p className="">{full_name}</p>
                        </div>
                      </div>

                      <div className="mypro_data_item">
                        <p className="sml">Date of Birth</p>
                        <div className="ot_data">
                          <p className="">{dateOfBirth}</p>
                        </div>
                      </div>

                      {/* <div className="mypro_data_item">
                      <p className="sml">
                        Father's Name
                      </p>
                      <div className="ot_data">
                        <p className="">
                          loreum ipsum
                        </p>
                        <button
                          tabIndex="0"
                          type="button"
                          colour="primary"
                        >Edit</button>
                      </div>
                    </div>

                    <div>
                      <form>
                        <div className="form_input">
                          <label for="email">
                            <p className="sml">Father's Name</p>
                          </label>
                          <input
                            id="email"
                            placeholder=" "
                            value=""
                          />
                        </div>
                        <div className="save_can">
                          <button
                            className="button wclr wbg"
                            tabIndex="0"
                            type="submit"
                            colour="primary"
                            onClick=""
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
                            onClick=""
                          >
                            Cancel
                            <span className="load_data"></span>
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className="mypro_data_item">
                      <p className="sml">
                        Full Address
                      </p>
                      <div className="ot_data">
                        <p className="">
                          loreum ipsum
                        </p>
                        <button
                          tabIndex="0"
                          type="button"
                          colour="primary"
                        >Edit</button>
                      </div>
                    </div>

                    <div>
                      <form>
                        <div className="form_input">
                          <label for="email">
                            <p className="sml">Full Address</p>
                          </label>
                          <input
                            id="email"
                            placeholder=" "
                            value=""
                          />
                        </div>
                        <div className="save_can">
                          <button
                            className="button wclr wbg"
                            tabIndex="0"
                            type="submit"
                            colour="primary"
                            onClick=""
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
                            onClick=""
                          >
                            Cancel
                            <span className="load_data"></span>
                          </button>
                        </div>
                      </form>
                    </div> */}

                      <input onClick={() => {
                        setValidPanNumber(false);
                        dispatch(currenctSteps("third"))
                      }} className="button" type="submit" value="Next" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!currentStep.third_step && (
              <div className="inner_container log_inner">
                <div
                  className="inner_img backimg"
                  style={{ backgroundImage: `url(${banner})` }}
                >
                  <div className="form_inner">
                    <div className="page_head">
                      <h5 className="ssize">Verify Your Bank Details</h5>
                    </div>
                    <div className="login_form kyc_form">
                      <form>
                        <div className="form_input">
                          <label>
                            <p>Bank Nameee</p>
                          </label>
                          <input
                            type="text"
                            id="bank_name" onChange={(e) => setBankname(e.target.value)}
                            placeholder="Enter your Bank Name"
                          />
                        </div>

                        <div className="form_input">
                          <label>
                            <p>Account Number</p>
                          </label>
                          <input
                            type="text"
                            id="email" onChange={(e) => setAccountnum(e.target.value)}
                            placeholder="Enter your Account Number"
                          />
                        </div>
                        <div className="form_input">
                          <label>
                            <p>IFSC Code</p>
                          </label>
                          <input
                            type="text"
                            id="ifsc" onChange={(e) => setIfsccode(e.target.value)}
                            placeholder="IFSC Code"
                          />
                        </div>

                        <input className="button"  value="Done" onClick={handleSubmit} style={{textAlign:"center"}}/>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 
      <div
        style={{ marginTop: "20px" }}
        className="MuiContainer-root MuiContainer-maxWidthLg css-1jyx3tm"
      >
        <div className="css-1xwmp6c">
          <h4 className="MuiTypography-root MuiTypography-h4 css-1s51pwm">
            Complete your KYC
          </h4>
          <p className="MuiTypography-root MuiTypography-body2 MuiTypography-paragraph css-nlvhco">
            Verify your account in just a few simple steps
          </p>
          <div className="css-ntxdzt">
            <div className="MuiBox-root css-1wu90r0">
              <div className="css-1lgzzji">
                <div className="MuiTabs-root css-xjfrmp">
                  <div
                    className="MuiTabs-scroller MuiTabs-fixed css-1anid1y"
                    style={{ overflow: "hidden", marginBottom: "0px" }}
                  >
                    <div
                      className="MuiTabs-flexContainer css-k008qs"
                      role="tablist"
                    >
                      <button
                        className="MuiButtonBase-root MuiTab-root MuiTab-textColorPrimary css-1va8a9z"
                        tabIndex="-1"
                        type="button"
                        role="tab"
                        aria-selected="false"
                        aria-controls="mui-p-29468-P-verify-email"
                        id="mui-p-29468-T-verify-email"
                      >
                        <div className="css-0">
                          <span className="MuiTypography-root MuiTypography-subtitle css-du1h6">
                            <svg
                              className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-14yq2cq"
                              focusable="false"
                              aria-hidden="true"
                              viewBox="0 0 24 24"
                              data-testid="CheckIcon"
                            >
                              <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                            </svg>
                          </span>
                          <span className="MuiTypography-root MuiTypography-subtitle css-19dq8mx">
                            Email
                          </span>
                        </div>
                        <span className="MuiTouchRipple-root css-w0pj6f"></span>
                      </button>
                      <button
                        className="MuiButtonBase-root MuiTab-root MuiTab-textColorPrimary Mui-selected css-1va8a9z"
                        tabIndex="0"
                        type="button"
                        role="tab"
                        aria-selected="true"
                        aria-controls="mui-p-29468-P-identification"
                        id="mui-p-29468-T-identification"
                      >
                        <div className="css-0">
                          <span className="MuiTypography-root MuiTypography-subtitle css-11de2ni">
                            2
                          </span>
                          <span className="MuiTypography-root MuiTypography-subtitle css-19dq8mx">
                            Identification
                          </span>
                        </div>
                        <span className="MuiTouchRipple-root css-w0pj6f"></span>
                      </button>
                      <button
                        className="MuiButtonBase-root MuiTab-root MuiTab-textColorPrimary css-1va8a9z"
                        tabIndex="-1"
                        type="button"
                        role="tab"
                        aria-selected="false"
                        aria-controls="mui-p-29468-P-bank-details"
                        id="mui-p-29468-T-bank-details"
                      >
                        <div className="css-0">
                          <span className="MuiTypography-root MuiTypography-subtitle css-11de2ni">
                            3
                          </span>
                          <span className="MuiTypography-root MuiTypography-subtitle css-19dq8mx">
                            Bank details
                          </span>
                        </div>
                        <span className="MuiTouchRipple-root css-w0pj6f"></span>
                      </button>
                    </div>
                    <span
                      className="MuiTabs-indicator css-1ozc7yj"
                      style={{ left: "227.281px", width: "121.562px" }}
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <section className="login">
              <div className="">
                <div className="inner_container log_inner">
                  <div
                    className="inner_img backimg"
                    style={{ backgroundImage: `url(${banner})` }}
                  >
                    <div className="form_inner">
                      <div className="page_head">
                        <h4>Varify Your Identity</h4>
                      </div>
                      <div className="login_form">
                        <form onSubmit={handleSubmit}>
                          <label htmlFor="email">
                            <p>PanNumber</p>
                          </label>
                          <input
                            type="text"
                            id="email"
                            name="fname"
                            placeholder="Enter your email or mobile number"
                            value={panNumber}
                            onChange={handlePanNumberChange}
                          />
                          <label htmlFor="password">
                            <p>Password</p>
                          </label>
                          <input
                            type="text"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={dateOfBirth}
                            onChange={handleDateOfBirthChange}
                          />
                          <br />
                          <input
                            className="button"
                            type="submit"
                            value="Login"
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div> */}
    </>
  );
};
