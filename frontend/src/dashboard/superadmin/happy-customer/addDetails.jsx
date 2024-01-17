import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchCreateHCustomerAsync, fetchHappyCustomersAsync } from "../../../feature/website/happy-customer/customerSlice";

function HappyCustomerPage() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data) {
      const newImage = URL.createObjectURL(data.auth_img[0]);
      data.auth_img = newImage;
      dispatch(fetchCreateHCustomerAsync(data));
      reset();
      setTimeout(() => {
        dispatch(fetchHappyCustomersAsync());
      }, 1000);
    }
  };
  return (
    <div className="flex p-12">
      <div className="w-full max-w-[550px]">
        <h2 className="text-3xl font-semibold mb-6 text-transparent bg-gradient-to-r from-[#808080] to-[#6A64F1] bg-clip-text">
          Customer Form
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label
              for="name"
              className="mb-3 block text-base font-medium text-[#FFFFFF]"
            >
              Name
            </label>
            <input
              type="text"
              {...register("auth_name", { required: "This Field is Required" })}
              id="name"
              placeholder="Full Name"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label
              for="name"
              className="mb-3 block text-base font-medium text-[#FFFFFF]"
            >
              Post
            </label>
            <input
              type="text"
              {...register("auth_post", { required: "This Field is Required" })}
              id="name"
              placeholder="Post"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="mb-5">
            <label
              for="image"
              className="mb-3 block text-base font-medium text-[#FFFFFF]"
            >
              Select an image:
            </label>
            <input
              type="file"
              id="image"
              {...register("auth_img", { required: "This Field is Required" })}
              accept="image/*"
              className="border text-white rounded p-2 w-full"
            />
          </div>
          <div className="mb-5">
            <label
              for="message"
              className="mb-3 block text-base font-medium text-[#FFFFFF]"
            >
              Describe
            </label>
            <textarea
              rows="4"
              {...register("describe", { required: "This Field is Required" })}
              id="message"
              placeholder="Type your message"
              className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HappyCustomerPage;
