import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogDetailsAsync, fetchEditBlogsAsync, selectEditDataShow, selectMessage } from "../../../feature/website/blogs/blogSlice";
import Cookies from "js-cookie";

function EditBlogs({ setOpen, open }) {

  const editDataShow = useSelector(selectEditDataShow);
  const dispatch = useDispatch();
  
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      type: capitalizeFirstLetter(editDataShow && editDataShow.type),
      title: editDataShow && editDataShow.title,
      image:editDataShow && editDataShow.image
    },
  });

  const handleCloseModal = () => {
    setOpen(false);
  };
  const onSubmit =  async (blogData) => {
    if (blogData) {
      blogData.id = editDataShow.id;
      const token = Cookies.get("admin_token")
      const data = await dispatch(fetchEditBlogsAsync(blogData));
      if (data.payload.success) {
        handleCloseModal();
        dispatch(fetchBlogDetailsAsync(token))
      }
    }
  }

  return (
    <div className="min-w-screen relative flex flex-col items-center justify-center pt-1">
      {open && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div
              className="relativ transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
              style={{position:"absolute"}}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
              <div className="p-4 sm:p-10 text-center overflow-y-auto">
                <div className="flex pb-7 md:pb-9 mt-7 md:-mt-1.5">
                  <h4 className="text-2xl 2xl:text-3xl font-bold text-heading text-black">
                    Update Blog Details
                  </h4>
                </div>
                <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label
                        className="flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                      >
                        Type
                      </label>
                      <div className="relative">
                        <select
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          {...register("type")}
                        >
                          <option>Investment</option>
                          <option>Product</option>
                          <option>Finance</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label
                        className="flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                      >
                        Image
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        {...register("image")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label
                        className="flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                      >
                        Title
                      </label>
                      <textarea
                        className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                        id="message"
                        {...register("title")}
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="">
                      <button
                        className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                        type="submit"
                      >
                        Update Blog
                      </button>
                    </div>
                    <div className="">
                      <button
                        className="shadow bg-red-400 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 mx-5 px-5 rounded"
                        type="button"
                        onClick={() => handleCloseModal()}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditBlogs;
