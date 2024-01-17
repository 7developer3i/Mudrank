import banner from "../../images/banner.png";
import flag from "../../images/flag.jpg";
import axios from "axios";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { BaseUrl } from "../../apis/contant";
import Cookies from "js-cookie";

export const RegisterPage = () => {
  const authcontext = useContext(AuthContext);
  const { Signin, setSignIn, setCurrentVarifyPage } = authcontext;

  let navigate = useNavigate();

  const OtpGenrateURL = `${BaseUrl.url}investor/signup`;

  const Send_otp = (e) => {
    e.preventDefault();

    axios
      .post(OtpGenrateURL, {
        phone_number:`${Signin}`,
        email:""
      })
      .then((res) => {
        if (res.data.success === true) {
          setCurrentVarifyPage(true);
          Cookies.set('newuserid', res.data.userid);
          navigate("/otpvarifypage");
        } else {
          alert(`${res.data.message}`);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <section className="login register">
        <div className="bcontainer">
          <div className="inner_container log_inner">
            <div
              className="inner_img backimg"
              style={{ backgroundImage: `url(${banner})` }}
            >
              <div className="form_inner">
                <div className="page_head">
                  <h4>Get started</h4>
                  <p className="sml">
                    Please enter your Mobile number to create your account
                  </p>
                </div>
                <div className="login_form">
                  <form>
                    <label htmlFor="email">
                      <p>Mobile number</p>
                    </label>
                    <div className="input_line">
                      <div className="countrycode">
                        <div className="flag_num">
                          <img src={flag} alt="ind" />
                          <p>+91</p>
                        </div>
                      </div>
                      <input
                        type="text"
                        id="email"
                        name="fname"
                        placeholder="Mobile number"
                        value={Signin}
                        onChange={(e) => setSignIn(e.target.value)}
                      />
                    </div>
                    <div className="wt_chk">
                      <input
                        className="styled-checkbox"
                        id="styled-checkbox-1"
                        type="checkbox"
                        defaultValue="value1"
                        defaultChecked
                      />
                      <label htmlFor="styled-checkbox-1">
                        <svg
                          class="wt_svg"
                          focusable="false"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          data-testid="WhatsAppIcon"
                        >
                          <path d="M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.55.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.12.26.62 1.09 1.32 1.78.91.88 1.71 1.17 1.95 1.3.24.14.39.12.54-.04l.81-.94c.19-.25.35-.19.58-.11l1.67.88M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-1.97 0-3.8-.57-5.35-1.55L2 22l1.55-4.65A9.969 9.969 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8c0 1.72.54 3.31 1.46 4.61L4.5 19.5l2.89-.96A7.95 7.95 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z"></path>
                        </svg>
                        <p className="sml">
                          Receive updates & offers on WhatsApp
                        </p>
                      </label>
                    </div>
                    <p class="sml cond">
                      By signing up, you agree to our{" "}
                      <a href="#">Terms &amp; Conditions </a>and{" "}
                      <a href="#">Privacy Policy</a>
                    </p>
                    <input onClick={Send_otp} className="button" type="submit" value="Get OTP" />
                  </form>
                </div>

                <div className="signup">
                  <p className="sml">
                    Already have an account? &nbsp;
                    <Link to="/loginpage">Log in instead</Link>
                  </p>
                </div>

                <div className="signup">
                  <p className="sml">
                    Are you a founder looking to raise funds? &nbsp;
                    <Link to="/startup-register">Apply here</Link>
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
