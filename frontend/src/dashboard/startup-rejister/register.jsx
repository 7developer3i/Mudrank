import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import banner from "../../images/banner.png";
import { BaseUrl } from "../../apis/contant";

function Startup_RegistrationForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = {
      username: username,
      password: password,
      email: email,
      role: role,
    };
    axios
      .post(`${BaseUrl.url}auth/register`, formdata)
      .then((res) => {
        navigate("/startup-login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="login">
      <div className="bcontainer">
        <div className="inner_container log_inner">
          <div
            className="inner_img backimg"
            style={{ backgroundImage: `url(${banner})` }}
          >
            <div className="form_inner">
              <div className="page_head">
                <h4>Register</h4>
              </div>
              <div className="login_form reg_form">
                <form onSubmit={handleSubmit}>
                  <div className="form_input">
                    <label htmlFor="username">
                      <p>Username</p>
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="form_input">
                    <label htmlFor="email">
                      <p>Email</p>
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="fname"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form_input">
                    <label htmlFor="password">
                      <p>Password</p>
                    </label>
                    <input
                      type="text"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="sec_fil">
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="select_input"
                    >
                      <option value="Selected one" selected>
                        {role ? role : "Choose a role"}
                      </option>
                      <option value="customer">Customer</option>
                      <option value="investor">Investor</option>
                    </select>
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      role="presentation"
                      className="icon icon-caret"
                      viewBox="0 0 10 6"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>

                  <input className="button" type="submit" value="Sign up" />
                </form>
              </div>
              <div className="signup">
                <p className="sml">
                  Already have an account? &nbsp;
                  <Link to="/startup-login">Log in instead</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Startup_RegistrationForm;
