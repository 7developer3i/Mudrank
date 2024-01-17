import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import banner from "../../images/banner.png"
import SetCookie from "../../hook/setCookie";
import AuthContext from "../../context/AuthContext";
import { BaseUrl } from "../../apis/contant";
import AlertPopup from '../../../src/dashboard/investor-login/AlertPopup'

function Startup_Login() {
  const authState = useContext(AuthContext);
  const { setAuth_Startup_Data, setAuth_High_Lights ,popopmessage,setPopopmessage,openpopmodal,setOpenpopmodal} = authState;

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = {
      password: password,
      email: email,
    };
    axios
      .post(`${BaseUrl.url}auth/login`, formdata)
      .then((res) => {
        console.log(res.data.results);
        if (res.data.results) {
          setAuth_Startup_Data(res.data.results[0]);
          setAuth_High_Lights(res.data.highlights);
          navigate("/startupform");
        } else {
          SetCookie("userId", JSON.stringify(res.data.userid));
          navigate("/startupform");
        }
      }).catch((err)=>{
         setPopopmessage(err.response.data.error)
         if (err.response.data.status == 400) {
          setOpenpopmodal(true)
          setTimeout(() => {
            setOpenpopmodal(false)
          }, 2000);
         }
      })
  };

  return (
    <>
    {openpopmodal &&  <AlertPopup popopmessage={popopmessage}/>}
 
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
                <form onSubmit={handleSubmit}>
                  <label htmlFor="email">
                    <p>Email</p>
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="fname"
                    placeholder="Enter your email or mobile number"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="password">
                    <p>Password</p>
                  </label>
                  <input
                    type="text"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                  />
                  <br />
                  <input className="button" type="submit" value="Login" />
                </form>
              </div>
              <div className="signup">
                <p className="sml">
                  Already have an account? &nbsp;
                  <Link to="/startup-register">Signup</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default Startup_Login;
