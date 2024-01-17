import axios from "axios";
import React from "react";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchCreateBlogAsync, fetchBlogDetailsAsync } from "../../../feature/website/blogs/blogSlice";

const AddBlogs = () => {

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data) {
      dispatch(fetchCreateBlogAsync(data));
      reset();
      const token = Cookies.get("admin_token")
      setTimeout(() => {
        dispatch(fetchBlogDetailsAsync(token));
      }, 1000);
    }
  };

  return (
    <div className="mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16">
      <div className="md:w-full lg:w-3/5 2xl:w-4/6 flex h-full ltr:md:ml-7 rtl:md:mr-7 flex-col ltr:lg:pl-7 rtl:lg:pr-7">
        <div className="flex pb-7 md:pb-9 mt-7 md:-mt-1.5">
          <h4 className="text-2xl 2xl:text-3xl font-bold text-heading text-black" style={{color:"white"}}>
            Add Your New Blog Details
          </h4>
        </div>
        <form
          className="w-full mx-auto flex flex-col justify-center "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col space-y-5">
            <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 gap-4">
              <div className="w-full md:w-1/2 ">
                <label
                  htmlFor="name"
                  className="block text-white font-semibold text-sm leading-none mb-3 cursor-pointer"
                >
                  Your Type (required)
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                    id="grid-state"
                    {...register("type", {
                      required: "This field is required",
                    })}
                  >
                    <option>Invetment</option>
                    <option>Product</option>
                    <option>Finance</option>
                  </select>
                </div>
                {errors.type && (
                  <label
                    htmlFor="subject"
                    style={{ color:"red", marginTop:"5px"}}
                  >
                    {errors.type.message}
                  </label>
                )}
              </div>
            </div>
            <div className="relative">
              <label
                htmlFor="subject"
                className="block text-white font-semibold text-sm leading-none mb-3 cursor-pointer"
              >
                Image
              </label>
              <input
                id="subject"
                {...register("image", { required: "This field is required" })}
                type="text"
                placeholder="Enter Your Image Url"
                className="py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 transition duration-200 ease-in-out bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12"
                autoComplete="off"
                spellCheck="false"
                aria-invalid="false"
              />
            </div>
            {errors.image && (
              <label
                htmlFor="subject"
                style={{ color:"red", marginTop:"5px"}}
              >
                {errors.image.message}
              </label>
            )}
            <div className="relative mb-4">
              <label
                htmlFor="message"
                className="block text-white font-semibold text-sm leading-none mb-3"
              >
                Title
              </label>
              <textarea
                id="title"
                {...register("title", { required: "This field is required" })}
                className="px-4 py-3 flex items-center w-full appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 bg-white border border-gray-300 focus:shadow focus:outline-none focus:border-heading placeholder-body"
                autoComplete="off"
                spellCheck="false"
                rows={4}
                placeholder="Write your title here"
              ></textarea>
              {errors.title && (
                <label
                  htmlFor="subject"
                  style={{ color:"red", marginTop:"5px"}}
                >
                  {errors.title.message}
                </label>
              )}
            </div>
            <div className="relative">
              <button
                data-variant="flat"
                className="text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none  bg-black text-white px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white bg-gray-600 hover:shadow-cart h-12 lg:h-14 mt-1 text-sm lg:text-base w-full sm:w-auto"
                type="submit"
              >
                Add Blog
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogs;
