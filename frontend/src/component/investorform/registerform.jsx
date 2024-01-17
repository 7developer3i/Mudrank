import axios from "axios";
import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../../apis/contant";
import Cookies from "js-cookie";

const Registerform = () => {
  const navigate = useNavigate();
  const authcontext = useContext(AuthContext);
  const { Signin, setSignIn } = authcontext;

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [code, setCode] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
const token = Cookies.get("otp_verify")
    const data = {
      full_name: name,
      city: city,
      state: state,
      postal_code: code,
      country: country,
      phone_number: Signin,
    
    };

    axios
      .post(`${BaseUrl.url}auth/investors?token=${token}`, data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setSignIn({ phoneNumber: "" });
          setName("");
          setCity("");
          setCode("");
          setCountry("");
          setState("");
          navigate("/mainpage")
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form>
        <div className="mb-3">
          <label for="name" className="form-label">
            Your Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="nameHelp"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label for="city" className="form-label">
            Your City
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            aria-describedby="cityHelp"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label for="state" className="form-label">
            Your state
          </label>
          <input
            type="text"
            className="form-control"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            aria-describedby="stateHelp"
          />
        </div>
        <div className="mb-3">
          <label for="code" className="form-label">
            Postal Code
          </label>
          <input
            type="text"
            className="form-control"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            aria-describedby="codeHelp"
          />
        </div>
        <div className="mb-3">
          <label for="country" className="form-label">
            Country
          </label>
          <input
            type="text"
            className="form-control"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Registerform;
