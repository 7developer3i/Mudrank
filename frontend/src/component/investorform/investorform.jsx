import axios from "axios";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../../apis/contant";
import portfolio from "../../images/no_invest.png"
import Cookies from "js-cookie";

const InvestorForm = () => {
  const Investor_data = useSelector((state) => state.fetch_investor_data.data);
  const Investor_error = useSelector(
    (state) => state.fetch_investor_data.error
  );
  const Investor_loading = useSelector(
    (state) => state.fetch_investor_data.loading
  );

  const navigate = useNavigate();

  const [showUsernameInput, setShowUsernameInput] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showNumberInput, setShowNumberInput] = useState(false);
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [showLinkedinUrlInput, setShowLinkedInUrlInput] = useState(false);

  const [number, setNumber] = useState(
    Investor_data === [] ? "" : Investor_data.phone_number
  );
  const [address, setAddress] = useState(
    Investor_data === [] ? "" : Investor_data.address
  );

  //when varification complete
  const [show_hide, setShow_Hide] = useState(false);
  const [newNumber, setNewNumber] = useState();

  const AddLinkinInput = (event) => {
    switch (event.target.id) {
      case "linkedin":
        setShowLinkedInUrlInput(true);
        break;
      case "number":
        setShowNumberInput(true);
        change_number();
        break;
      case "email":
        setShowEmailInput(true);
        break;
      case "address":
        setShowAddressInput(true);
        break;

      default:
        break;
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const id = Investor_data.id;
    const token = Cookies.get("otp_verify")
    const data = {
      phone_number: newNumber,
      address: address,
    };

    await axios
      .put(`${BaseUrl.url}auth/investors/${id}`, data, {
        params:{
          token:token
        }
      })
      .then((res) => {
        if (res.status === 200) {
          setShowAddressInput(false);
          setShowNumberInput(false);
          setShowEmailInput(false);
          setShowLinkedInUrlInput(false);
          navigate("/mainpage");
        }
      })
      .catch((err) => {
        console.log(err)
        alert("user aleady exist")
      });
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

  //Otp
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpInputsRef = useRef([]);

  const handleInputChange = (event, index) => {
    const value = event.target.value;

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

  const otpArray = otp;
  const combinedOtp = otpArray.join("");

  const varifyOtp = (e) => {
    e.preventDefault()
    const data = {
      phoneNumber: number,
      otp: combinedOtp
    }
    axios.post(`${BaseUrl.url}otp/verify-otp`, data)
      .then((res) => {
        //  console.log("check otp:", res);
        if (res.status === 200) {
          setShow_Hide(true)
        }
      }).catch((err) => console.log(err))
  };

  //Change Number by otp varification
  const change_number = () => {
    const data = { phoneNumber: number };
    axios
      .post(`${BaseUrl.url}otp/sendsms`, data)
      .then((res) => {
        // console.log("varification:",res)
      })
      .catch((err) => console.log(err));
  };



  const [activeTab, setActiveTab] = useState('#tab1');

  const handleTabClick = (e) => {
    e.preventDefault();
    const tabId = e.target.getAttribute('href');
    setActiveTab(tabId);
  };

  const handleTabSelection = (tabid) => {
    document.querySelectorAll('.live_tab_lists li').forEach((li) => {
      li.classList.remove('active');
    });
    document.querySelectorAll('.live_tab_data .live_tab_inn').forEach((tab) => {
      tab.classList.remove('active');
    });
    document.querySelector('.live_tab_data ' + tabid).classList.add('active');
    document.querySelector(tabid).parentElement.classList.add('active');
  };



  return (
    <>

      <section className="explore_container subscribe_container">
        <div className="bcontainer">
          <div className="explore_inner">
            <div className="explore_cnt">
              <div className="inner_container">
                <section className="myprofile">
                  <div className="bcontainer">
                    <div className="sec_container">

                      {/* <div className="inner_img backimg" style={{ backgroundImage: `url(${banner})` }}> */}
                      <div className="inner_img backimg">
                        <div className="sec_inner">
                          <div className="sec_tt">
                            <h4 className="blk">
                              My Profile
                            </h4>
                          </div>

                          <div className="live_tab_lists">
                            <li className={`live_items${activeTab === '#tab1' ? ' active' : ''}`}>
                              <a href="#tab1" onClick={handleTabClick}>General Details</a>
                            </li>
                            <li className={`live_items${activeTab === '#tab2' ? ' active' : ''}`}>
                              <a href="#tab2" onClick={handleTabClick}>Bank Details</a>
                            </li>
                            <li className={`live_items${activeTab === '#tab3' ? ' active' : ''}`}>
                              <a href="#tab3" onClick={handleTabClick}>Nominee Details</a>
                            </li>
                          </div>


                          <div className="live_tab_data">

                            <div className={`live_tab_inn${activeTab === '#tab1' ? ' active' : ''}`} id="tab1">

                              <div className="mypro_inner">
                                {Investor_loading && (
                                  <p style={{ color: "blue", fontWeight: "bold" }}>Loading....</p>
                                )}

                                {Investor_data && (
                                  <div className="mypro_cnt">
                                    <div className="mypro_item">
                                      <p className="mypro_tt">
                                        Personal Details
                                      </p>
                                      <div className="mypro_data">

                                        <div className="mypro_data_item">
                                          <p className="sml">
                                            Full Name
                                          </p>
                                          <div className="ot_data">
                                            <p className="sml">
                                              {Investor_data.full_name}
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
                                            <p className="sml">
                                              Email
                                            </p>
                                            <div className="ot_data">
                                              <p className="sml">
                                                {Investor_data.email}
                                              </p>
                                              <button
                                                className=""
                                                tabIndex="0"
                                                type="button"
                                                colour="primary"
                                                id="email"
                                                onClick={AddLinkinInput}
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
                                                <label for="email">
                                                  <p className="sml">Email</p>
                                                </label>
                                                <input
                                                  id="email"
                                                  placeholder=" "
                                                  value={Investor_data.email}
                                                />
                                              </div>
                                              <div className="save_can">
                                                <button
                                                  className="button wclr bbg"
                                                  tabIndex="0"
                                                  type="submit"
                                                  colour="primary"
                                                  onClick={handleSave}
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
                                            <p className="sml">
                                              Contact Number
                                            </p>
                                            <div className="ot_data">
                                              <p className="sml">
                                                +91-{Investor_data.phone_number}
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
                                            <div style={{ display: show_hide === true ? "" : "none" }}>
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
                                                    onClick={handleSave}
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

                                            <div className="inner_container log_inner otp_inner" style={{ display: show_hide === true ? "none" : '' }}>
                                              <div
                                                className="inner_img backimg">
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
                                                        Expect OTP in <span className="prm">59 seconds</span>
                                                      </p>

                                                      <input onClick={varifyOtp} className="button" type="submit" value="Continue" />
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
                                      <p className="mypro_tt">
                                        KYC Status
                                      </p>
                                      <div className="mypro_data">
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
                                          <p className="ssl">
                                            KYC Pending
                                          </p>
                                        </div>
                                        <button
                                          className="button wclr bbg"
                                          tabIndex="0"
                                          type="button"
                                          colour="secondary"
                                          onClick={() => navigate("/kyc-form")}
                                        >
                                          Complete KYC{" "}
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
                                          <span className="load_data"></span>
                                        </button>
                                      </div>
                                    </div>
                                    <div className="mypro_item">
                                      <p className="mypro_tt">
                                        Linkedin Profile
                                      </p>
                                      <div className="mypro_data">
                                        {!showLinkedinUrlInput && (
                                          <div className="mypro_data_item">
                                            <p className="sml">
                                              LinkedIn Profile{" "}
                                            </p>
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
                                                  <p className="sml">LinkedIn Profile{" "}</p>
                                                </label>
                                                <input
                                                  id="profile_link"
                                                  placeholder=" "
                                                  value=""
                                                />
                                              </div>
                                              <div className="save_can">
                                                <button
                                                  className="button wclr bbg"
                                                  tabIndex="0"
                                                  type="submit"
                                                  colour="primary"
                                                  onClick={handleSave}
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
                                    </div>
                                    <div className="mypro_item">
                                      <p className="mypro_tt">
                                        Address Details
                                      </p>
                                      {!showAddressInput && (
                                        <div className="mypro_data">
                                          <div className="mypro_data_item">
                                            <p className="sml">
                                              Full Address{" "}
                                            </p>
                                            <div className="ot_data">
                                              <p className="sml">
                                                {Investor_data.address}
                                              </p>
                                              <button
                                                className=""
                                                tabIndex="-1"
                                                type="button"
                                                disabled=""
                                                colour="primary"
                                                id="address"
                                                onClick={AddLinkinInput}
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
                                              <input
                                                id="number"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                              />
                                            </div>
                                            <div className="save_can">
                                              <button
                                                className="button wclr bbg"
                                                tabIndex="0"
                                                type="submit"
                                                colour="primary"
                                                onClick={handleSave}
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
                                              </button>
                                            </div>
                                          </form>
                                        </div>
                                      )}
                                    </div>

                                  </div>
                                )}

                                {Investor_error && <p>Some error....</p>}
                              </div>

                            </div>

                            <div className={`live_tab_inn${activeTab === '#tab2' ? ' active' : ''}`} id="tab2">
                              <div className="mypro_inner">

                                <div className="no_item">
                                  <div className="no_img">
                                    <div
                                      className="backimg"
                                      style={{ backgroundImage: `url(${portfolio})` }}
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
                                    <h5>
                                      No Bank Details
                                    </h5>
                                    <p> You have not add Bank details on Mudrank
                                    </p>
                                  </div>
                                  <div className="inner_btn"><a href="#" className="button wclr bblk">Add Bank Details</a></div>
                                </div>

                                <div className="bank_details">
                                  <div className="ot_data">
                                    <button
                                      className=""
                                      tabIndex="0"
                                      type="button"
                                      colour="primary"
                                      id="email"
                                      onClick={AddLinkinInput}
                                    >
                                      Edit
                                    </button>
                                  </div>
                                  <div className="mypro_cnt">
                                    <div className="mypro_item">
                                      <p className="mypro_tt">Bank Details</p>
                                      <div className="mypro_data">
                                        <div className="bank_edit_form">
                                          <form>
                                            <div className="form_input">
                                              <label for="">
                                                <p className="sml">
                                                  Bank Name</p>
                                              </label>
                                              <input
                                                id=""
                                                placeholder=" "
                                                value=""
                                              />
                                            </div>

                                            <div className="form_input">
                                              <label for="">
                                                <p className="sml">
                                                  Account Number</p>
                                              </label>
                                              <input
                                                id=""
                                                placeholder=" "
                                                value=""
                                              />
                                            </div>

                                            <div className="form_input">
                                              <label for="">
                                                <p className="sml">
                                                  IFSC Code</p>
                                              </label>
                                              <input
                                                id=""
                                                placeholder=" "
                                                value=""
                                              />
                                            </div>

                                            <div className="form_input">
                                              <label for="">
                                                <p className="sml">
                                                  Please select your acoount type</p>
                                              </label>
                                              <div className="radio_options">
                                                <div className="radio">
                                                  <input id="radio-1" name="radio" type="radio" defaultChecked="" />
                                                  <label htmlFor="radio-1" className="radio-label">
                                                    Savings Account
                                                  </label>
                                                </div>
                                                <div className="radio">
                                                  <input id="radio-2" name="radio" type="radio" />
                                                  <label htmlFor="radio-2" className="radio-label">
                                                    Current Account
                                                  </label>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="save_can">
                                              <button
                                                className="button wclr bbg"
                                                tabIndex="0"
                                                type="submit"
                                                colour="primary"
                                                onClick={handleSave}
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
                                        <div className="bank_data">
                                          <div className="mypro_data_item">
                                            <p className="sml">Bank Name</p>
                                            <div className="ot_data">
                                              <p className="sml">Bank of Baroda</p>

                                            </div>
                                          </div>
                                          <div className="mypro_data_item">
                                            <p className="sml">Account Number</p>
                                            <div className="ot_data">
                                              <p className="sml">123 456 7890</p>
                                            </div>
                                          </div>
                                          <div className="mypro_data_item">
                                            <p className="sml">IFSC Code</p>
                                            <div className="ot_data">
                                              <p className="sml">1230456ABCD</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className={`live_tab_inn${activeTab === '#tab3' ? ' active' : ''}`} id="tab3">
                              <div className="no_item">
                                <div className="no_img">
                                  <div
                                    className="backimg"
                                    style={{ backgroundImage: `url(${portfolio})` }}
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
                                  <h5>
                                    No Nominee Details
                                  </h5>
                                  <p> You have not add Nominee details on Mudrank
                                  </p>
                                </div>
                                <div className="inner_btn"><a href="#" className="button wclr bblk">Add Nominee Details</a></div>
                              </div>
                              <div className="mypro_inner">
                                <div className="bank_details">
                                  <div className="ot_data">
                                    <button
                                      className=""
                                      tabIndex="0"
                                      type="button"
                                      colour="primary"
                                      id="email"
                                      onClick={AddLinkinInput}
                                    >
                                      Edit
                                    </button>
                                  </div>
                                  <div className="mypro_cnt">
                                    <div className="mypro_item">
                                      <p className="mypro_tt">Nominee Details</p>
                                      <div className="mypro_data">
                                        <div className="bank_edit_form">

                                          <form>
                                            <div className="form_input">
                                              <label for="">
                                                <p className="sml">Nominee Name</p>
                                              </label>
                                              <input
                                                id=""
                                                placeholder=" "
                                                value=""
                                              />
                                            </div>

                                            <div className="form_input">
                                              <label for="">
                                                <p className="sml">
                                                  Nominee Date of Birth</p>
                                              </label>
                                              <input
                                                id=""
                                                placeholder=" "
                                                value=""
                                              />
                                            </div>

                                            <div className="form_input">
                                              <label for="">
                                                <p className="sml">
                                                  Name of Parent</p>
                                              </label>
                                              <input
                                                id=""
                                                placeholder=" "
                                                value=""
                                              />
                                            </div>

                                            <div className="form_input">
                                              <label for="">
                                                <p className="sml">
                                                  Relationship with nominee</p>
                                              </label>
                                              <input
                                                id=""
                                                placeholder=" "
                                                value=""
                                              />
                                            </div>

                                            <div className="form_input">
                                              <label for="">
                                                <p className="sml">
                                                  Contact Number</p>
                                              </label>
                                              <input
                                                id=""
                                                placeholder=" "
                                                value=""
                                              />
                                            </div>



                                            <div className="save_can">
                                              <button
                                                className="button wclr bbg"
                                                tabIndex="0"
                                                type="submit"
                                                colour="primary"
                                                onClick={handleSave}
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
                                        <div className="bank_data">
                                          <div className="mypro_data_item">
                                            <p className="sml">Nominee Name</p>
                                            <div className="ot_data">
                                              <p className="sml">Loreum Ipsum</p>

                                            </div>
                                          </div>
                                          <div className="mypro_data_item">
                                            <p className="sml">Nominee Date of Birth</p>
                                            <div className="ot_data">
                                              <p className="sml">26-7-2000</p>
                                            </div>
                                          </div>
                                          <div className="mypro_data_item">
                                            <p className="sml">Name of Parent</p>
                                            <div className="ot_data">
                                              <p className="sml">Loreum ipsum dolor</p>
                                            </div>
                                          </div>
                                          <div className="mypro_data_item">
                                            <p className="sml">Relationship with nominee</p>
                                            <div className="ot_data">
                                              <p className="sml">Loreum ipsum dolor</p>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="mypro_data_item">
                                          <p className="sml">
                                            Contact Number
                                          </p>
                                          <div className="ot_data">
                                            <p className="sml">
                                              +91-{Investor_data.phone_number}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* <div style={{ display: "flex", justifyContent: "center" }}>
        {Investor_loading && (
          <p style={{ color: "blue", fontWeight: "bold" }}>Loading....</p>
        )}

        {Investor_data && (
          <div className="css-9clilk" style={{ width: "1000px" }}>
            <div className="css-1bcp6ex">
              <div className="MuiContainer-root MuiContainer-maxWidthLg css-1jyx3tm">
                <div className="css-103pp5s">
                  <div className="css-qugrdx">
                    <h6 className="MuiTypography-root MuiTypography-h6 css-na0ki2">
                      My Profile
                    </h6>
                  </div>
                  <div className="css-1o9a808">
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
                                className="MuiButtonBase-root MuiTab-root MuiTab-textColorPrimary Mui-selected css-1va8a9z"
                                tabIndex="0"
                                type="button"
                                role="tab"
                                aria-selected="true"
                                aria-controls="mui-p-23709-P-general-details"
                                id="mui-p-23709-T-general-details"
                              >
                                General Details
                                <span className="MuiTouchRipple-root css-w0pj6f"></span>
                              </button>
                              <button
                                className="MuiButtonBase-root MuiTab-root MuiTab-textColorPrimary css-1va8a9z"
                                tabIndex="-1"
                                type="button"
                                role="tab"
                                aria-selected="false"
                                aria-controls="mui-p-23709-P-bank-details"
                                id="mui-p-23709-T-bank-details"
                              >
                                Bank Details
                                <span className="MuiTouchRipple-root css-w0pj6f"></span>
                              </button>
                            </div>
                            <span
                              className="MuiTabs-indicator css-1ozc7yj"
                              style={{ left: "0px", width: "105.016px" }}
                            ></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="MuiContainer-root MuiContainer-maxWidthLg css-1jyx3tm">
                <div className="css-1ilw1ug">
                  <p className="MuiTypography-root MuiTypography-body2 css-1hdy6d7">
                    Personal Details
                  </p>
                  <div className="css-v4z29n">
                    <div className="css-f3jfgf">
                      <div className="css-1l236ck">
                        <span className="MuiTypography-root MuiTypography-caption css-odp2x9">
                          Full Name
                        </span>
                        <div className="css-otddup">
                          <p className="MuiTypography-root MuiTypography-body2 css-n0ic7a">
                            {Investor_data.full_name}
                          </p>
                          <button
                            className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-157kvwd"
                            tabIndex="0"
                            type="button"
                            colour="primary"
                          ></button>
                        </div>
                      </div>
                    </div>
                    {!showEmailInput && (
                      <div className="css-1l236ck">
                        <span className="MuiTypography-root MuiTypography-caption css-odp2x9">
                          Email
                        </span>
                        <div className="css-otddup">
                          <p className="MuiTypography-root MuiTypography-body2 css-n0ic7a">
                            {Investor_data.email}
                          </p>
                          <button
                            className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-157kvwd"
                            tabIndex="0"
                            type="button"
                            colour="primary"
                            id="email"
                            onClick={AddLinkinInput}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    )}
                    {showEmailInput && (
                      <div>
                        <form>
                          <div className="css-djswmo">
                            <label
                              className="MuiFormLabel-root MuiFormLabel-colorPrimary css-1q93iy9"
                              for="email"
                            >
                              Email
                            </label>
                            <input
                              id="email"
                              placeholder=" "
                              className="css-1e4zdh5"
                              value={Investor_data.email}
                            />
                          </div>
                          <div className="css-16mboe">
                            <button
                              className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation css-1ke2ig0"
                              tabIndex="0"
                              type="submit"
                              colour="primary"
                              onClick={handleSave}
                            >
                              Save Changes
                              <span className="MuiTouchRipple-root css-w0pj6f"></span>
                            </button>
                            <button
                              className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-1xtytu2"
                              tabIndex="0"
                              type="button"
                              colour="primary"
                              id="close-email"
                              onClick={handleClose}
                            >
                              Cancel
                              <span className="MuiTouchRipple-root css-w0pj6f"></span>
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                    <br />
                    {!showNumberInput && (
                      <div className="css-1l236ck">
                        <span className="MuiTypography-root MuiTypography-caption css-odp2x9">
                          Contact Number
                        </span>
                        <div className="css-otddup">
                          <p className="MuiTypography-root MuiTypography-body2 css-n0ic7a">
                            +91-{Investor_data.phone_number}
                          </p>
                          <button
                            className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-157kvwd"
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
                        <div style={{ display: show_hide === true ? "" : "none" }}>
                          <form>
                            <div className="css-djswmo">
                              <label
                                className="MuiFormLabel-root MuiFormLabel-colorPrimary css-1q93iy9"
                                for="number"
                              >
                                Phone Number
                              </label>
                              <input
                                id="number"
                                placeholder="Enter your new number"
                                className="css-1e4zdh5"
                                value={newNumber}
                                onChange={(e) => setNewNumber(e.target.value)}
                              />
                            </div>
                            <div className="css-16mboe">
                              <button
                                className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation css-1ke2ig0"
                                tabIndex="0"
                                type="submit"
                                colour="primary"
                                onClick={handleSave}
                              >
                                Save Changes
                                <span className="MuiTouchRipple-root css-w0pj6f"></span>
                              </button>
                              <button
                                className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-1xtytu2"
                                tabIndex="0"
                                type="button"
                                colour="primary"
                                id="close-number"
                                onClick={handleClose}
                              >
                                Cancel
                                <span className="MuiTouchRipple-root css-w0pj6f"></span>
                              </button>
                            </div>
                          </form>
                        </div>
                        <div style={{ display: show_hide === true ? "none" : '' }} className="container-otp">
                          <h2>Enter OTP</h2>
                          <form>
                            <div className="otp-input">
                              {otp.map((digit, index) => (
                                <input
                                  key={index}
                                  ref={(ref) =>
                                    (otpInputsRef.current[index] = ref)
                                  }
                                  type="text"
                                  maxLength="1"
                                  value={digit}
                                  onChange={(event) =>
                                    handleInputChange(event, index)
                                  }
                                  onPaste={handlePaste}
                                />
                              ))}
                            </div>
                            <div className="otp-submit">
                              <input onClick={varifyOtp} type="submit" value="Submit" />
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="css-ywe5xr">
                  <p className="MuiTypography-root MuiTypography-body2 css-a9ksnh">
                    KYC Status
                  </p>
                  <div className="css-v4z29n">
                    <div className="MuiChip-root MuiChip-filled MuiChip-sizeMedium MuiChip-colorWarning MuiChip-filledWarning css-1snscsb">
                      <svg
                        className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1cw4hi4"
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
                      <span className="MuiChip-label MuiChip-labelMedium css-9iedg7">
                        KYC Pending
                      </span>
                    </div>
                    <button
                      className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-y46nqu"
                      tabIndex="0"
                      type="button"
                      colour="secondary"
                      onClick={() => navigate("/kyc-form")}
                    >
                      Complete KYC{" "}
                      <svg
                        className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1cw4hi4"
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
                      <span className="MuiTouchRipple-root css-w0pj6f"></span>
                    </button>
                  </div>
                </div>
                <div className="css-1ilw1ug">
                  <p className="MuiTypography-root MuiTypography-body2 css-1hdy6d7">
                    Linkedin Profile
                  </p>
                  <div className="css-v4z29n">
                    {!showLinkedinUrlInput && (
                      <div className="css-1l236ck">
                        <span className="MuiTypography-root MuiTypography-caption css-odp2x9">
                          LinkedIn Profile{" "}
                        </span>
                        <div className="css-otddup">
                          <p className="MuiTypography-root MuiTypography-body2 css-n0ic7a"></p>
                          <button
                            className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-157kvwd"
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
                          <div className="css-djswmo">
                            <label
                              className="MuiFormLabel-root MuiFormLabel-colorPrimary css-1q93iy9"
                              for="profile_link"
                            >
                              LinkedIn Profile{" "}
                            </label>
                            <input
                              id="profile_link"
                              placeholder=" "
                              className="css-1e4zdh5"
                              value=""
                            />
                          </div>
                          <div className="css-16mboe">
                            <button
                              className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation css-1ke2ig0"
                              tabIndex="0"
                              type="submit"
                              colour="primary"
                              onClick={handleSave}
                            >
                              Save Changes
                              <span className="MuiTouchRipple-root css-w0pj6f"></span>
                            </button>
                            <button
                              className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-1xtytu2"
                              tabIndex="0"
                              type="button"
                              colour="primary"
                              id="close-linkedin"
                              onClick={handleClose}
                            >
                              Cancel
                              <span className="MuiTouchRipple-root css-w0pj6f"></span>
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
                <div className="css-1ilw1ug">
                  <p className="MuiTypography-root MuiTypography-body2 css-1hdy6d7">
                    Address Details
                  </p>
                  {!showAddressInput && (
                    <div className="css-v4z29n">
                      <div className="css-1l236ck">
                        <span className="MuiTypography-root MuiTypography-caption css-odp2x9">
                          Full Address{" "}
                        </span>
                        <div className="css-otddup">
                          <p className="MuiTypography-root MuiTypography-body2 css-n0ic7a">
                            {Investor_data.address}
                          </p>
                          <button
                            className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation Mui-disabled MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-157kvwd"
                            tabIndex="-1"
                            type="button"
                            disabled=""
                            colour="primary"
                            id="address"
                            onClick={AddLinkinInput}
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
                        <div className="css-djswmo">
                          <label
                            className="MuiFormLabel-root MuiFormLabel-colorPrimary css-1q93iy9"
                            for="number"
                          >
                            Address
                          </label>
                          <input
                            id="number"
                            className="css-1e4zdh5"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                        <div className="css-16mboe">
                          <button
                            className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation css-1ke2ig0"
                            tabIndex="0"
                            type="submit"
                            colour="primary"
                            onClick={handleSave}
                          >
                            Save Changes
                            <span className="MuiTouchRipple-root css-w0pj6f"></span>
                          </button>
                          <button
                            className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-1xtytu2"
                            tabIndex="0"
                            type="button"
                            colour="primary"
                            id="close-address"
                            onClick={handleClose}
                          >
                            Cancel
                            <span className="MuiTouchRipple-root css-w0pj6f"></span>
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {Investor_error && <p>Some error....</p>}
      </div> */}
    </>
  );
};

export default InvestorForm;
