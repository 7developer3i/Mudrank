import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SetCookie from "../../../hook/setCookie";
import banner from "../../../images/banner.png";
import Cookies from "js-cookie";
import AuthContext from "../../../context/AuthContext";

const SuperAdmin = () => {
  const detailsfetchURl = "http://localhost:3002/auth/superadmin";

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAdminid, setNameStore ,setSuperadminrole} = useContext(AuthContext);

  const fetch_all_details = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };
    axios
      .post(detailsfetchURl, data)
      .then((res) => {
        if (res.status === 200) {
          console.log("resssss", res.data);
          setAdminid(res.data.AdminId);
          
          setSuperadminrole(res.data.role)
          SetCookie("admin_name",res.data.name)
          // setNameStore(res.data.name);
          SetCookie("admin_token", res.data.token);
          SetCookie("admin_Id", res.data.AdminId);
          navigate("/admin/detail-page");
        } else {
          navigate("/superadmin");
        }
      })
      .catch((err) => alert(err.response.data.message));
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
                <h4>Admin Login</h4>
              </div>
              <div className="login_form">
                <form onSubmit={fetch_all_details}>
                  <label htmlFor="email">
                    <p>Email</p>
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="fname"
                    placeholder="Enter your email or mobile number"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
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
                  <br />
                  <input className="button" type="submit" value="Login" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuperAdmin;
