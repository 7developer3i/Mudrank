import React, { useContext, useState } from "react";
import AuthContext from "../../../../context/AuthContext";
import {
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import axios from "axios";
import { BaseUrl } from "../../../../apis/contant.js";
import Cookies from "js-cookie";

export const AddInvestor = () => {
  const authcontext = useContext(AuthContext);
  const {
    openaddadminmodal,
    setOpenaddadminmodal,
    addname,
    setAddname,
    addemail,
    setEmail,
    password,
    setPassword,
    role,
    setRole,
    setOpenpopmodal,
    setPopopmessage,
    setStatus,
    setUsertableData,
    setAdminRecords
  } = authcontext;


  const token = Cookies.get("admin_token");
  const adminid = Cookies.get("admin_Id");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [roleError, setRoleError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addname == '') {
      setNameError(true);
      return ;
    }
    if (addemail == '') {
      setEmailError(true);
      return ;
    }
    if (password == '') {
      setPasswordError(true);
      return ;
    }
    if (role == '') {
      setRoleError(true);
      return ;
    }
    const formData = new FormData();
    formData.append("username", addname);
    formData.append("email", addemail);
    formData.append("password", password);
    formData.append("role", role);

    axios
      .post(`${BaseUrl.url}api/users`, {
        username: addname,
        email: addemail,
        password: password,
        role: role,
      })
      .then((res) => {
        console.log("res", res.data);
        console.log("message investor",res.data.message);
        console.log("status investor",res.data.status);
        setPopopmessage(res.data.message)
        setStatus(res.data.status)
        setOpenaddadminmodal(false);
        setOpenpopmodal(true)
        setTimeout(() => {
          setOpenpopmodal(false)
        }, 2000);
        if (res.status == 200) {
          setAddname("");
          setEmail("");
          setPassword("");
          setRole("");
          axios
          .get(`${BaseUrl.url}Investors?token=${token}&adminid=${adminid}`)
          .then((res) => {
            console.log("investorData res", res.data);
            // setInvestorData(res.data);
            setAdminRecords(res.data);
          })
          .catch((err) => {
            console.log("err", err);
          });
    
        axios
          .get(`${BaseUrl.url}userData`)
          .then((res) => {
            console.log("user res", res.data);
            setUsertableData(res.data.data);
          })
          .catch((err) => {
            console.log("err", err);
          });
        }
      })
      .catch((err) => {
        console.log("err", err.response.data.message);
      });

  };

  return (
    <div>
      <div
        style={{ display: "block" }}
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed top-15 left-50 right-50 z-50 hidden w-full p-32 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div style={{width:"40%",margin:"0 auto"}}>
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={() => setOpenaddadminmodal(false)}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Add Customer Details
              </h3>
              <form className="space-y-6">
                <div>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    onChange={(e) => setAddname(e.target.value)}
                    variant="outlined"
                    value={addname}
                    required
                    error={nameError ? 'This Field is required' : ''}
                  />
                </div>
                <div>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    value={addemail}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    error={emailError ? 'This Field is required' : ''}
                  />
                </div>
                <div>
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    variant="outlined"
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    error={passwordError ? 'This Field is required' : ''}
                  />
                </div>
                <div>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                      labelId="role-label"
                      id="role"
                      name="role"
                      value={role}
                      label="Role"
                      onChange={(e) => setRole(e.target.value)}
                      error={roleError ? 'This Field is required' : ''}
                      required
                    >
                      <MenuItem value="Investor">Investor</MenuItem>
                      <MenuItem value="Customer">Customer</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <Button
                  onClick={(e) => handleSubmit(e)}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="rounded-lg text-sm px-5 py-2.5"
                >
                  Create Customer Details
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
