import banner from "../../images/banner.png";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { fetchDataSuccess } from "../../feature/investor/formDataFetch";
import SetCookie from "../../hook/setCookie";
import { useDispatch } from "react-redux";
import { BaseUrl } from "../../apis/contant";
import { Cookie } from "@mui/icons-material";

export const OtpVarifyPage = () => {
  const authcontext = useContext(AuthContext);
  const { Signin, currentVarifyPage, setCurrentVarifyPage, setNewInvestor_User_Id, setLoggedInUserId, Signinphonenumber, setAccessToken, setResendDisabled } = authcontext;
  const OtpVarifyURL = `${BaseUrl.url}investor/verify-otp`;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otpInvalid, setOTPInvalid] = useState(null);
  const [countdown, setCountdown] = useState(59); // Initial countdown time
  const [otp_number, setOtp_Number] = useState();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
 
  const Verify_otp = (e) => {
    e.preventDefault();

    const otpString = otp.join("");
    setOtp_Number(otpString);

    axios
      .post(OtpVarifyURL, {
        phone_number: `${Signin}`,
        email: Signinphonenumber,
        otp: `${otpString}`,
      })
      .then((res) => {
        // console.log(res.data,"ooopppppp");
        // console.log(res.data.data.id,"resid")
        
        if (res.data.success === true) {
          setOTPInvalid(null);
          if (currentVarifyPage) {
            setNewInvestor_User_Id(res.data.data.id);
            dispatch(fetchDataSuccess(res.data.data));
            setAccessToken(res.data.data.token)
            SetCookie(
              "varify_number_token",
              JSON.stringify(res.data.data.token)
              );
              SetCookie("otp_verify",res.data.token);
              SetCookie("user_id",res.data.data.id);
            navigate("/registerform");
            setOtp_Number("");
            setCurrentVarifyPage(false);
          } else {
            setLoggedInUserId(res.data.data.id);
            dispatch(fetchDataSuccess(res.data.data));
            setAccessToken(res.data.data.token)
            SetCookie(
              "varify_number_token",
              JSON.stringify(res.data.data.token)
            );
            SetCookie("user_id",res.data.data.id);
            SetCookie("otp_verify",res.data.data.token);
            navigate("/mainpage");
            setOtp_Number("");
          }
        } else {
          alert("Otp Invalid!");
        }
      })
      .catch((err) => {
        console.log(err)
        setOTPInvalid(err.response.data.message)
      });
  };

  const handleOtpInputChange = (index, event) => {
    const newOtp = [...otp];
    newOtp[index] = event.target.value;
    setOtp(newOtp);
    // Move focus to the next input field
    if (event.target.value !== "" && index < 5) {
      event.target.nextElementSibling.focus();
    }

    // Reset current input field if backspace is clicked
    if (event.target.value === "" && index > 0) {
      event.target.previousElementSibling.focus();
    }
  };

  useEffect(() => {
    // Decrement countdown every second
    const timer = setInterval(() => {
      setCountdown(prevCountdown => (prevCountdown > 0 ? prevCountdown - 1 : 0));
    }, 1000);

    // Clear the timer when the countdown reaches 0
    if (countdown === 0) {
      clearInterval(timer);
      setResendDisabled(false); // Enable the resend button
    }

    return () => {
      clearInterval(timer); // Clear the timer on component unmount
    };
  }, [countdown]);

  const handleResendOTP = (e) => {
    setResendDisabled(true);
    setCountdown(59);
  };


  return (
    <>
      <section className="login register">
        <div className="bcontainer">
          <div className="inner_container log_inner otp_inner">
            <div
              className="inner_img backimg"
              style={{ backgroundImage: `url(${banner})` }}
            >
              <div className="form_inner">
                <div className="page_head">
                  <h6>Verify your Mobile Number</h6>
                  <p className="sml">
                    Enter the OTP sent {Signin}{Signinphonenumber}
                    <a href="#">
                      <svg
                        class="pen_svg"
                        focusable="false"
                        aria-hidden="true"
                        viewBox="0 0 13 13"
                        width="13"
                        height="13"
                        fill="none"
                      >
                        <path
                          d="M9.78746 6.32245L4.21491 11.8949C3.97485 12.135 3.64929 12.2698 3.3098 12.2698H0.64C0.286541 12.2698 0 11.9833 0 11.6298V8.96002C0 8.62057 0.134855 8.295 0.374906 8.05493L5.94746 2.48242L9.78746 6.32245Z"
                          fill="#2EC6E4"
                        ></path>
                        <path
                          d="M10.6935 5.41726L6.85352 1.57728L8.05588 0.374904C8.55572 -0.124968 9.36622 -0.124968 9.86606 0.374904L11.8959 2.40471C12.3957 2.90458 12.3957 3.71503 11.8959 4.2149L10.6935 5.41726Z"
                          fill="#2EC6E4"
                        ></path>
                      </svg>
                    </a>
                  </p>
                </div>
                <div className="login_form verify_otp">
                  <form>
                    <div className="input_line">
                      {otp.map((char, index) => (
                        <input
                          key={index}
                          type="tel"
                          inputMode="numeric"
                          maxLength="1"
                          aria-label={`Character ${index + 1}.`}
                          value={char}
                          onChange={(event) =>
                            handleOtpInputChange(index, event)
                          }
                        />
                      ))}
                    </div>
                    <p class="sml cond">
                      Expect OTP in <span className="prm">{countdown} seconds</span>
                    </p>
                    <p class="sml cond">
                      Didn't receive the code? <a onClick={handleResendOTP}>Resend OTP</a>
                    </p>
                    <input
                      onClick={Verify_otp}
                      className="button"
                      type="submit"
                      value="Continue"
                    />
                  </form>
                </div>
                {otpInvalid && <p style={{ color: "Red" }}>{otpInvalid}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
