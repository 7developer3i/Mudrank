import banner from "../../images/banner.png";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import SetCookie from "../../hook/setCookie";
import AuthContext from "../../context/AuthContext";
import { BaseUrl, GOOGLE_CREDENTIAL } from "../../apis/contant";
import { fetchDataSuccess } from "../../feature/investor/formDataFetch";
import { useDispatch } from "react-redux";
import AlertPopup from './AlertPopup.js'

export const LoginPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authcontext = useContext(AuthContext);
  const { setSignInPhoneNumber, setSignIn, setLoggedInUserId, setAccessToken,openpopmodal,setOpenpopmodal,popopmessage,setPopopmessage } = authcontext;

  const [formData, setFormData] = useState("");
  const [isSignedIn, setIsSignin] = useState(false);
  const [error, setError] = useState("none");
  const [errorMessage, setErrorMessage] = useState("");
  const [googleError, setGoogleError] = useState("");

  const Login_Page = async (e) => {
    e.preventDefault();
    console.log("called continue");

    // Check if input value is a phone number
    const isPhoneNumber = /^\d{10}$/.test(formData);

    // Check if input value is an email address
    const isEmailAddress = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData);

    // Update state with the input value as either a phone number or an email address
    if (isPhoneNumber === true) {
      const data = {
        phone_number: formData,
      };
      setSignIn(formData);
      await axios
        .post(`${BaseUrl.url}investor/resend-otp`, data)
        .then((res) => {
          if (res.data.success === true) {
            navigate("/otpvarifypage");
          }
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage(err.response.data.error)
          setError("");
        });
    } else if (isEmailAddress === true) {
      const data = { email: formData };
      setSignInPhoneNumber(formData);
      axios
        .post(`${BaseUrl.url}investor/resendtwo-otp`, data)
        .then((res) => {
          console.log(res.data);
          if (res.data.success === true) {
            navigate("/otpvarifypage");
          } else {
            setError("");
          }
        }).catch((err)=>{
          console.log(err.response.status);
          console.log(err.response.data.error);
          setPopopmessage(err.response.data.error)
          if (err.response.status == 400) {
            setOpenpopmodal(true)
            setTimeout(() => {
              setOpenpopmodal(false)
            }, 3000);
          }
        })
        
  } else {
    setError("none");
}
  };

const clientId = GOOGLE_CREDENTIAL.CLIENT_ID;

const onSuccess = async (res) => {
  if (res.profileObj) {
    try {
      const response = await axios.post(`${BaseUrl.url}auth-google`, {
        phone_number: "",
        email: res.profileObj.email,
      });
      if (response.data.success === true) {
        setLoggedInUserId(response.data.result.id);
        dispatch(fetchDataSuccess(response.data.result));
        setAccessToken(response.data.token);
        SetCookie("varify_number_token", JSON.stringify(response.data.token));
        navigate("/mainpage");
      }
    } catch (error) {
      setGoogleError(error.response.data.message);
      setTimeout(() => {
        setGoogleError("");
      }, 1500);
    }
  }
};

const onFailure = (err) => {
  console.log("LOGGIN FAILED!", err);
};

const handleGoogleLogin = () => {
  const googleElementId = document.getElementById("target-google-login");
  if (googleElementId) {
    const dynamicButton = document.querySelector("button");
    if (dynamicButton) {
      dynamicButton.click();
    }
  } else {
    alert("server error");
  }
};

return (
  <>
  {openpopmodal && <AlertPopup popopmessage={popopmessage}/>}
    <section className="login">
      <div className="bcontainer">
        <div className="inner_container log_inner">
          <div
            className="inner_img backimg"
            style={{ backgroundImage: `url(${banner})` }}
          >
            <div className="form_inner">
              <div className="page_head">
                <h4>Login</h4>
              </div>
              <div className="login_form">
                <form id="resend-func" onSubmit={Login_Page}>
                  <label htmlFor="email">
                    <p>Email or Mobile number</p>
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="fname"
                    placeholder="Enter your email or mobile number"
                    value={formData}
                    onChange={(e) => setFormData(e.target.value)}
                  />
                  <p style={{ color: "red", display: error }}>
                  {errorMessage == '' ? "Investor Not Found" : errorMessage}
                  </p>
                  <p className="sml cond">
                    By clicking Continue, you agree to our{" "}
                    <a href="#">Terms &amp; Conditions </a>
                    and <a href="#">Privacy Policy</a>
                  </p>
                  <input className="button" type="submit" value="Continue" />
                </form>
              </div>
              <div className="orlogin">
                <div className="line" />
                <p className="sml">OR</p>
                <div className="line" />
              </div>
              <div className="glogin">
                <a className="button" onClick={handleGoogleLogin}>
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-14yq2cq"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#4285F4"
                      d="M23.7 12.3l-.1-2.3H12.3v4.5h6.4a5.6 5.6 0 01-2.4 3.6v3h3.9c2.2-2.1 3.5-5.2 3.5-8.8z"
                    ></path>
                    <path
                      fill="#34A853"
                      d="M12.3 24c3.2 0 6-1 7.9-3l-3.9-3a7.2 7.2 0 01-10.8-3.7h-4v3c2 4 6 6.7 10.8 6.7z"
                    ></path>
                    <path
                      fill="#FBBC05"
                      d="M5.5 14.3a7 7 0 010-4.6v-3h-4a11.9 11.9 0 000 10.7l4-3.1z"
                    ></path>
                    <path
                      fill="#EA4335"
                      d="M12.3 4.8c1.7 0 3.3.6 4.6 1.8L20.3 3A12 12 0 001.6 6.6l4 3.1c.9-2.8 3.5-5 6.7-5z"
                    ></path>
                  </svg>
                  <div>
                    <p className="sml">continue with google</p>
                  </div>
                </a>
                <div id="target-google-login" style={{ display: "none" }}>
                  <GoogleLogin
                    clientId={clientId}
                    buttonText="Loggin google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={"single_host_origin"}
                    isSignedIn={isSignedIn}
                  />
                </div>
              </div>
              {googleError && <p className="sml" style={{ color: "red" }}>User Not Found!</p>}
              <div className="signup">
                <p className="sml">
                  Don’t have an account? &nbsp;
                  <Link to="/registerpage">Sign up instead</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);
};
