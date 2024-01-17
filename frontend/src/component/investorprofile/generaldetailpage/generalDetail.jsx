import axios from "axios";
import React, { useState, useRef, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currenctSteps } from "../../../feature/kycsteps/action";
import AuthContext from "../../../context/AuthContext";
import { BaseUrl } from "../../../apis/contant";
import { useEffect } from "react";
import Cookies from "js-cookie";
import toast, { Toaster } from 'react-hot-toast';

const GeneralDetail = () => {
  const profile_details = useSelector((state) => state.profile_details);
  const Investor_data = useSelector((state) => state.fetch_investor_data.data);
  const investor_profile_data = useSelector(
    (state) => state.investor_profile_datails
  );

  const authcontext = useContext(AuthContext);
  const { loggedInUserId, generaldetails, setGeneraldetails, generalemail, setGeneralemail } = authcontext;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showNumberInput, setShowNumberInput] = useState(false);
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [showLinkedinUrlInput, setShowLinkedInUrlInput] = useState(false);
  const [showOTPPage, setShowOtpPage] = useState(false);

  // update email value state
  const [newEmail, setNewEmail] = useState("");
  const [newOTP, setNewOTP] = useState('');

  const [number, setNumber] = useState(
    Investor_data === [] ? "" : Investor_data.phone_number
  );
  const [address, setAddress] = useState(
    Investor_data === [] ? "" : Investor_data.address
  );

  //when varification complete
  const [show_hide, setShow_Hide] = useState(false);
  const [newNumber, setNewNumber] = useState();
  const [generaladdress, setGeneraladdress] = useState("")
  const [generalmobile, setGeneralmobile] = useState("")
  const [showMobilefield, setShowmobilefield] = useState(false)
  const [otpvalue, setOtpvalue] = useState("");

  const fetchgeneraldetails = () => {
    const id = Cookies.get("user_id")
    axios.get(`${BaseUrl.url}Generaldetails/${id}`).then((res) => {
      console.log(res.data, "fffffeee");
      setGeneraldetails(res.data.data)
      // console.log(res.data.data[0].email);
      setGeneralemail(res.data.data[0].email)
      setGeneralmobile(res.data.data[0].phone_number)
    }).catch((err) => {
      console.log("err", err);
    })
  };

  useEffect(() => {
    fetchgeneraldetails()
  }, [])

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    const id = Cookies.get("user_id")
    axios.post(`${BaseUrl.url}investor/verify-otp-email/${id}`, { email: newEmail, otp: newOTP }).then((res) => {
      console.log(res.data, "otp email");
      if (res.status == 200) {
        setShowEmailInput(false);
        setShowOtpPage(false);
        setNewEmail("");
        setNewOTP("");
        toast.success(res.data.message, {
          duration: 2000, position: "top-center"
        });
        fetchgeneraldetails();
      }
    }).catch((err) => {
      console.log(err, "errr");
      toast.error(err.response.data.message, {
        duration: 2000, position: "top-center"
      });
    });
  };

  const emailfunction = (e) => {
    e.preventDefault()
    const id = Cookies.get("user_id")
    axios.post(`${BaseUrl.url}investor/send-otp-email/${id}`, { email: generalemail }).then((res) => {
      console.log(res.data, "otp send email");
      if (res.status == 200) {
        setShowEmailInput(true);
        setShowOtpPage(true);
      }
    }).catch((err) => {
      console.log("err", err);
    })
  };

  const handleClose = (event) => {
    switch (event.target.id) {
      case "close-linkedin":
        setShowLinkedInUrlInput(false);
        break;
      case "close-number":
        setShowNumberInput(false);
        break;
      case "close-email":
        setShowEmailInput(false);
        break;

      default:
        break;
    }
  };

  const AddLinkinInput = (event) => {
    switch (event.target.id) {
      case "linkedin":
        setShowLinkedInUrlInput(true);
        break;
      case "number":
        setShowNumberInput(true);
        // change_number();
        break;
      case "email":
        setShowEmailInput(true);
        setShowOtpPage(true)
        break;
      case "address":
        setShowAddressInput(true);
        break;

      default:
        break;
    }
    console.log("gggg", generalmobile);
    const id = Cookies.get("user_id")
    axios.post(`${BaseUrl.url}investor/send-otp-mobile/${id}`, { mobileNumber: generalmobile }).then((res) => {
      console.log(res.data, "mobile res");
    }).catch((err) => {
      console.log("err", err);
    })

  };

  //Otp
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpInputsRef = useRef([]);

  const handleInputChange = (event, index) => {
    const value = event.target.value;
    setOtpvalue(event.target.value)

    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < otpInputsRef.current.length - 1 && value) {
        otpInputsRef.current[index + 1].focus();
      }
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData("Text").trim();

    if (/^\d+$/.test(pastedData) && pastedData.length <= 4) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length; i++) {
        if (i < otpInputsRef.current.length) {
          newOtp[i] = pastedData[i];
        }
      }
      setOtp(newOtp);
    }
  };

  const handleAdrressEdit = (e) => {
    e.preventDefault()
    const id = Cookies.get("user_id")
    axios.put(`${BaseUrl.url}update-address/${id}`, { address: generaladdress }).then((res) => {
      console.log(res.data, "resss");
      if (res.data.status == 200) {
        toast.success(res.data.message, {
          duration: 2000, position: "top-center"
        });
        setShowAddressInput(false);
        setShow_Hide(false);
        fetchgeneraldetails()
      }
    }).catch((err) => {
      console.log("err", err);
    })
  };

  const otpArray = otp;
  const combinedOtp = otpArray.join("");

  const varifyOtp = (e) => {
    console.log("show mobile field called");
    e.preventDefault();
    setShowNumberInput(true)
    setShow_Hide(true)
    setShowmobilefield(true)
    // const id = Cookies.get("user_id")
    // axios.put(`${BaseUrl.url}verify-otp-mobile/${id}`).then((res) => {
    //   console.log(res.data);
    // }).catch((err) => {
    //   console.log(err, err);
    // })
    // const data = {
    //   phoneNumber: number,
    //   otp: combinedOtp,
    // };
    // axios
    //   .post(`${BaseUrl.url}otp/verify-otp`, data)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       setShow_Hide(true);
    //     }
    //   })
    //   .catch((err) => console.log(err));
  };

  const numberfunction = (e) => {
    e.preventDefault()
    const id = Cookies.get("user_id")
    axios.put(`${BaseUrl.url}investor/verify-otp-mobile/${id}`, { phone_number: newNumber, otp: combinedOtp }).then((res) => {
      console.log(res.data);
      if (res.status == 200) {
        setShowNumberInput(false);
        setShow_Hide(false);
        fetchgeneraldetails()
      }
    }).catch((err) => {
      console.log(err, err);
    })
  };

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div
        className={`live_tab_inn${profile_details.general_details ? " active" : ""
          }`}
      >
        <div className="mypro_inner">
          {investor_profile_data.loading && (
            <p
              style={{
                color: "blue",
                fontWeight: "bold",
              }}
            >
              Loading....
            </p>
          )}

          {generaldetails && generaldetails.map((item, index) =>
            <div className="mypro_cnt">
              <div className="mypro_item">
                <p className="mypro_tt">Personal Details</p>
                <div className="mypro_data">
                  <div className="mypro_data_item">
                    <p className="sml">Full Name</p>
                    <div className="ot_data">
                      <p className="sml">
                        {item.full_name}
                      </p>
                      <button
                        className="button"
                        tabIndex="0"
                        type="button"
                        colour="primary"
                      ></button>
                    </div>
                  </div>

                  {!showEmailInput && (
                    <div className="mypro_data_item">
                      <p className="sml">Email</p>
                      <div className="ot_data">
                        <p className="sml">{item.email}</p>
                        <button
                          className=""
                          tabIndex="0"
                          type="button"
                          colour="primary"
                          id="email"
                          onClick={(e) => { emailfunction(e); }}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  )}
                  {showEmailInput && (
                    <div>
                      <form>
                        <div className="form_input">
                          {showOTPPage ? <>
                            <label for="otp">
                              <p className="sml">Enter OTP </p>
                            </label>
                            <input
                              id="otp"
                              placeholder="Enter Your OTP"
                              value={newOTP}
                              onChange={(e) => setNewOTP(e.target.value)}
                            />
                            <br /><br />
                            <label for="email">
                              <p className="sml">New Email</p>
                            </label>
                            <input
                              id="email"
                              placeholder=""
                              value={newEmail}
                              onChange={(e) => setNewEmail(e.target.value)}
                            />
                          </> :
                            <>
                              <label for="email">
                                <p className="sml">Email</p>
                              </label>
                              <input
                                id="email"
                                placeholder=""
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                              />
                            </>
                          }
                        </div>
                        <div className="save_can">
                          <button
                            className="button wclr bbg"
                            tabIndex="0"
                            type="submit"
                            colour="primary"
                            onClick={handleUpdateEmail}
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
                            onClick={handleClose}
                          >
                            Cancel
                            <span className="load_data"></span>
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {!showNumberInput && (
                    <div className="mypro_data_item">
                      <p className="sml">Contact Number</p>
                      <div className="ot_data">
                        <p className="sml">
                          +91-{item.phone_number}
                        </p>
                        <button
                          tabIndex="0"
                          type="button"
                          colour="primary"
                          id="number"
                          onClick={AddLinkinInput}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  )}
                  {showNumberInput && (
                    <div>
                      <div
                        style={{
                          display: show_hide === true ? "" : "none",
                        }}
                      >
                        <form>
                          <div className="form_input">
                            <label for="number">
                              <p className="sml">Phone Number</p>
                            </label>
                            <input
                              id="number"
                              placeholder="Enter your new number"
                              value={newNumber}
                              onChange={(e) => setNewNumber(e.target.value)}
                            />
                          </div>
                          <div className="save_can">
                            <button
                              className="button wclr bbg"
                              tabIndex="0"
                              type="submit"
                              colour="primary"
                              onClick={(e) => numberfunction(e)}
                            >
                              Save Changes
                              <span className="load_data"></span>
                            </button>
                            <button
                              className="button wclr bblk"
                              tabIndex="0"
                              type="button"
                              colour="primary"
                              id="close-number"
                              onClick={handleClose}
                            >
                              Cancel
                              <span className="load_data"></span>
                            </button>
                          </div>
                        </form>
                      </div>

                      <div
                        className="inner_container log_inner otp_inner"
                        style={{
                          display: show_hide === true ? "none" : "",
                        }}
                      >
                        <div className="inner_img backimg">
                          <div className="form_inner">
                            <div className="page_head">
                              <h6>Enter OTP</h6>
                            </div>
                            <div className="login_form verify_otp">
                              <form>
                                <div className="input_line">
                                  {otp.map((digit, index) => (
                                    <input
                                      key={index}
                                      ref={(ref) =>
                                        (otpInputsRef.current[index] = ref)
                                      }
                                      type="tel"
                                      maxLength="1"
                                      aria-label={`Character ${index + 1}.`}
                                      value={digit}
                                      onChange={(event) =>
                                        handleInputChange(event, index)
                                      }
                                      onPaste={handlePaste}
                                    />
                                  ))}
                                </div>

                                <p class="sml cond">
                                  Expect OTP in{" "}
                                  <span className="prm">59 seconds</span>
                                </p>

                                <input
                                  onClick={varifyOtp}
                                  className="button"
                                  type="submit"
                                  value="Continue"
                                />
                                {showMobilefield && (
                                  <div>
                                    <form>
                                      <div className="form_input">
                                        <label for="number">
                                          <p className="sml">Number</p>
                                        </label>
                                        <input
                                          id="number"
                                          value={generalmobile}
                                          onChange={(e) => setGeneralmobile(e.target.value)}
                                        />
                                      </div>
                                      <div className="save_can">
                                        {/* <button
                          className="button wclr bbg"
                          tabIndex="0"
                          type="submit"
                          colour="primary"
                          onClick={(e) => handleAdrressEdit(e)}
                        >
                          Save Changes
                          <span className="load_data"></span>
                        </button>
                        <button
                          className="button wclr bblk"
                          tabIndex="0"
                          type="button"
                          colour="primary"
                          id="close-address"
                          onClick={handleClose}
                        >
                          Cancel
                          <span className="load_data"></span>
                        </button> */}
                                      </div>
                                    </form>
                                  </div>
                                )}
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="mypro_item kyc_item">
                <p className="mypro_tt">KYC Status</p>
                <div className="mypro_data">
                  {investor_profile_data.data.kyc_verified === 0 && (
                    <div className="kyc_pan_tag">
                      <svg
                        className="svg"
                        focusable="false"
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        width="20"
                        height="20"
                      >
                        <circle cx="10" cy="10" r="10" fill="white"></circle>
                        <rect
                          x="9"
                          y="5"
                          width="2"
                          height="7"
                          rx="1"
                          fill="#EE9500"
                        ></rect>
                        <circle
                          cx="10"
                          cy="13.5776"
                          r="1"
                          fill="#EE9500"
                        ></circle>
                      </svg>
                      <p className="ssl">KYC Pending</p>
                    </div>
                  )}
                  <button
                    className="button wclr bbg"
                    tabIndex="0"
                    type="button"
                    colour="secondary"
                    style={{ backgroundColor: investor_profile_data.data.kyc_verified === 1 ? "green" : "", border: investor_profile_data.data.kyc_verified === 1 ? "none" : "" }}

                  >
                    {investor_profile_data.data.kyc_verified === 1
                      ? "KYC Completed"
                      : "Complete KYC"}
                    {investor_profile_data.data.kyc_verified === 1 ? (
                      <svg
                        style={{ transform: "rotate(360deg)" }}
                        class="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1cw4hi4"
                        focusable="false"
                        aria-hidden="true"
                        viewBox="0 0 12 14"
                        width="12"
                        height="14"
                        fill="none"
                      >
                        <path
                          d="M11.8405 2.01875C11.8169 1.84932 11.695 1.70996 11.5302 1.66416L6.24883 0.195404C6.17353 0.174449 6.094 0.174449 6.01865 0.195404L0.737287 1.66416C0.572502 1.70996 0.450603 1.84927 0.427013 2.01875C0.396381 2.23901 -0.302438 7.44343 1.48999 10.0325C3.28029 12.6184 5.92137 13.2811 6.03291 13.3081C6.06606 13.3161 6.09984 13.32 6.13374 13.32C6.16764 13.32 6.20142 13.316 6.23457 13.3081C6.34616 13.2811 8.98725 12.6184 10.7775 10.0325C12.5699 7.44348 11.8711 2.23907 11.8405 2.01875ZM9.53954 5.05714L5.93712 8.65956C5.8533 8.74338 5.74336 8.78535 5.63349 8.78535C5.52361 8.78535 5.41368 8.74344 5.32985 8.65956L3.10251 6.43221C3.02195 6.35171 2.97671 6.24247 2.97671 6.12858C2.97671 6.0147 3.022 5.90545 3.10251 5.82495L3.54476 5.3827C3.71246 5.21505 3.98438 5.21499 4.15202 5.3827L5.63349 6.86416L8.49003 4.00756C8.57053 3.927 8.67978 3.88177 8.79366 3.88177C8.90754 3.88177 9.01679 3.927 9.09729 4.00756L9.53954 4.44981C9.70725 4.61752 9.70725 4.88943 9.53954 5.05714Z"
                          fill="white"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="svg"
                        focusable="false"
                        aria-hidden="true"
                        viewBox="0 0 11 5"
                      >
                        <path
                          d="M1.75 1.375L5 4.625L8.25 1.375"
                          stroke="currentcolor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        ></path>
                      </svg>
                    )}
                    <span className="load_data"></span>
                  </button>
                </div>
              </div>
              {/* <div className="mypro_item">
              <p className="mypro_tt">Linkedin Profile</p>
              <div className="mypro_data">
                {!showLinkedinUrlInput && (
                  <div className="mypro_data_item">
                    <p className="sml">LinkedIn Profile </p>
                    <div className="ot_data">
                      <p className="sml"></p>
                      <button
                        className=""
                        tabIndex="0"
                        type="button"
                        id="linkedin"
                        colour="primary"
                        onClick={AddLinkinInput}
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                )}
                {showLinkedinUrlInput && (
                  <div>
                    <form>
                      <div className="form_input">
                        <label for="profile_link">
                          <p className="sml">LinkedIn Profile </p>
                        </label>
                        <input id="profile_link" placeholder=" " value="" />
                      </div>
                      <div className="save_can">
                        <button
                          className="button wclr bbg"
                          tabIndex="0"
                          type="submit"
                          colour="primary"
                          onClick={''}
                        >
                          Save Changes
                          <span className="load_data"></span>
                        </button>
                        <button
                          className="button wclr bblk"
                          tabIndex="0"
                          type="button"
                          colour="primary"
                          id="close-linkedin"
                          onClick={handleClose}
                        >
                          Cancel
                          <span className="load_data"></span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div> */}
              <div className="mypro_item">
                <p className="mypro_tt">Address Details</p>
                {!showAddressInput && (
                  <div className="mypro_data">
                    <div className="mypro_data_item">
                      <p className="sml">Full Address </p>
                      <div className="ot_data">
                        <p className="sml">
                          {item.address}
                        </p>
                        <button
                          className=""
                          tabIndex="-1"
                          type="button"
                          disabled=""
                          colour="primary"
                          id="address"
                          onClick={(e) => { AddLinkinInput(e); setGeneraladdress(item.address) }}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {showAddressInput && (
                  <div>
                    <form>
                      <div className="form_input">
                        <label for="number">
                          <p className="sml">Address</p>
                        </label>
                        <input type="text"
                          value={generaladdress}
                          onChange={(e) => setGeneraladdress(e.target.value)}
                        />
                      </div>
                      <div className="save_can">
                        <button
                          className="button wclr bbg"
                          tabIndex="0"
                          type="submit"
                          colour="primary"
                          onClick={(e) => handleAdrressEdit(e)}
                        >
                          Save Changes
                          <span className="load_data"></span>
                        </button>
                        <button
                          className="button wclr bblk"
                          tabIndex="0"
                          type="button"
                          colour="primary"
                          id="close-address"
                          onClick={() => setShowAddressInput(false)}
                        >
                          Cancel
                          <span className="load_data"></span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          )}


          {investor_profile_data.error && <p>Some error....</p>}
        </div>
      </div>
    </>
  );
};

export default GeneralDetail;
