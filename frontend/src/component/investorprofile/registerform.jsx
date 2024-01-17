import axios from "axios";
import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import banner from "../../images/banner.png";
import { useDispatch } from "react-redux";
import { BaseUrl } from "../../apis/contant";
import Cookies from "js-cookie";

const Registerform = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authcontext = useContext(AuthContext);
  const { Signin, setSignIn, newInvestor_user_id } = authcontext;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [code, setCode] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (e) => {
    console.log("called handlesubmit");
    e.preventDefault();
   const token = Cookies.get("otp_verify");
   const userid = Cookies.get("newuserid");
   console.log(token);
    axios
      .post(`${BaseUrl.url}auth/investors?token=${token}&id=${userid}`, {
          full_name: name,
          address:address,
          city: city,
          state: state,
          postal_code: code,
          country: country,
          phone_number: `${Signin}`,
          user_id:userid,
      })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          alert(res.data.message)
          navigate("/loginpage");
          setSignIn({ phoneNumber: "" });
          setName("");
          setCity("");
          setCode("");
          setCountry("");
          setState("");
        }
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
              <div className="login_form reg_form">
                <div className="page_head">
                  <h4>Personal Details</h4>
                </div>
                <form>
                  <div className="form_input">
                    <label for="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      aria-describedby="nameHelp"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form_input">
                    <label for="address">Your Address</label>
                    <input
                      type="text"
                      id="address"
                      aria-describedby="addressHelp"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="form_input">
                    <label for="city">Your City</label>
                    <input
                      type="text"
                      id="city"
                      aria-describedby="cityHelp"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="form_input">
                    <label for="state">Your state</label>
                    <input
                      type="text"
                      id="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      aria-describedby="stateHelp"
                    />
                  </div>
                  <div className="form_input">
                    <label for="code">Postal Code</label>
                    <input
                      type="text"
                      id="code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      aria-describedby="codeHelp"
                    />
                  </div>
                  <div className="form_input">
                    <label for="country">Country</label>
                    <input
                      type="text"
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                  <input
                    onClick={handleSubmit}
                    className="button"
                    type="submit"
                    value="Submit Details"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registerform;
