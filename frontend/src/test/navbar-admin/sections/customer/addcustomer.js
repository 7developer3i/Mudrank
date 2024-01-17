import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { BaseUrl } from "../../../../apis/contant";
import Cookies from "js-cookie";
import AuthContext from "../../../../context/AuthContext";
import Popop from "./popop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const AddCustomer = ({ openAddmodal, setOpenAddmodal }) => {
  const {
    adminid,
    setRecords,
    openpopmodal,
    setOpenpopmodal,
    popopmessage,
    setPopopmessage,
    status,
    setStatus,
  } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // console.log("errors",errors);
  const onSubmit = (data) => {
    const token = Cookies.get("admin_token");

    axios
      .post(`${BaseUrl.url}addInvestor?token=${token}&adminid=${adminid}`, data)
      .then((res) => {
        // console.log(data, "vvv");
        // console.log("res", res.data.message,res.data.status);
        setPopopmessage(res.data.message);
        console.log("setttt",res.data.message);
        setStatus(res.data.status);
        setOpenpopmodal(true)
        setTimeout(() => {
          setOpenpopmodal(false)
        }, 2000);
        reset();
        setOpenAddmodal(false);

        axios
          .get(`${BaseUrl.url}Customers?token=${token}&adminid=${adminid}`)
          .then((res) => {
            // console.log("Customer res", res.data);
            // setCustomerData(res.data)
            setRecords(res.data);
          })
          .catch((err) => {
            console.log("err", err);
          });
      })
      .catch((err) => {
        console.log("errr", err);
      });
  };

  return (
    <>
      <div>
        {openpopmodal && <Popop  popopmessage={popopmessage}/>}
        <Modal
          open={openAddmodal}
          onClose={() => setOpenAddmodal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <button
              onClick={() => setOpenAddmodal(false)}
              type="button"
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <Typography>
              <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Add Investor Form
              </h3>
            </Typography>
            <Typography>
              <form
                class="space-y-6"
                action="#"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns:"repeat(2, 2fr)",
                    gap:"10px"
                  }}
                >
                  <Typography>
                    <div>
                      <label
                        for="full name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        full_name
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        id="full_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder=""
                        {...register("full_name", { required: "Name Field is required" })}
                      />
                      {errors.full_name && <span style={{color:"red"}}>This field is required</span>}
                    </div>
                  </Typography>
                  <Typography>
                    <div>
                      <label
                        for="password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        phone_number
                      </label>
                      <input
                        type="text"
                        name="phone_number"
                        id="content"
                        {...register("phone_number", { required: "This field is required" })}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      />
                      {errors.phone_number && (
                        <span style={{color:"red"}}>This field is required</span>
                      )}
                    </div>
                  </Typography>
                  <Typography>
                    <div>
                      <label
                        for="password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        address
                      </label>
                      <input
                        type="text"
                        id="content"
                        {...register("address", { required: true })}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      />
                      {errors.address && <span style={{color:"red"}}>This field is required</span>}
                    </div>
                  </Typography>
                  <Typography>
                    <div>
                      <label
                        for="password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        city
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="content"
                        {...register("city", { required: true })}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        // required
                      />
                      {errors.city && <span style={{color:"red"}}>This field is required</span>}
                    </div>
                  </Typography>
                  <Typography>
                    <div>
                      <label
                        for="password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        state
                      </label>
                      <input
                        type="text"
                        name="state"
                        id="content"
                        {...register("state", { required: true })}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        // required
                      />
                      {errors.state && <span style={{color:"red"}}>This field is required</span>}
                    </div>
                  </Typography>
                  <Typography>
                    <div>
                      <label
                        for="password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        country
                      </label>
                      <input
                        type="text"
                        name="country"
                        {...register("country", { required: true })}
                        id="content"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        // required
                      />
                      {errors.country && <span style={{color:"red"}}>This field is required</span>}
                    </div>
                  </Typography>
                  <Typography>
                    <div>
                      <label
                        for="password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        postal_code
                      </label>
                      <input
                        type="text"
                        name="postal_code"
                        id="content"
                        {...register("postal_code", { required: true })}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        // required
                      />
                      {errors.postal_code && (
                        <span style={{color:"red"}}>This field is required</span>
                      )}
                    </div>
                  </Typography>
                  <Typography>
                    <div>
                      <label
                        for="password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        email
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="content"
                        {...register("email", { required: true })}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        // required
                      />
                      {errors.email && <span style={{color:"red"}}>This field is required</span>}
                    </div>
                  </Typography>
                </Box>
                <Button variant="contained" type="submit">Add Investor</Button>
              </form>
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
};
