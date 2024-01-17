import React, { useContext, useEffect } from "react";
import { PrivacyEditModal } from "./edit";
import PrivacyDeleteModal from "./delete";
import { useState } from "react";
import axios from "axios";
import { BaseUrl } from "../../../apis/contant";
import { WebsiteContext } from "../../../websitecontext/websiteContext";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCreatePrivacyBlogAsync,
  fetchPrivacyDetailsAsync,
  openDeleteModalFunc,
  openEditModalFunc,
} from "../../../feature/website/privacy/privacySlice";
import Cookies from "js-cookie";
import AuthContext from "../../../context/AuthContext";

export const PrivacyTable = () => {
  const [id, setID] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const dispatch = useDispatch();
  const {
    privacyData,
    setPrivacyData,
    paraitem,
    setParaitem,
    content,
    setContent,
  } = useContext(WebsiteContext);

  const { adminid } = useContext(AuthContext);
  const privacyState = useSelector((state) => state.privacy.data);
  const editmodalPrivacy = useSelector((state) => state.privacy.editmodal);
  const deletemodalPrivacy = useSelector((state) => state.privacy.deleteModal);


  const [test, settest] = useState(false);

  useEffect(() => {
    if (!test) {
      const token = Cookies.get("admin_token");
      dispatch(fetchPrivacyDetailsAsync({ token, adminid }));
    }
  }, [test, dispatch, adminid]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    data.adminid = adminid;
    const token = Cookies.get("admin_token");
    data.token = token
    settest(true);
    dispatch(fetchCreatePrivacyBlogAsync(data));
    reset();
    setTimeout(() => {
      dispatch(fetchPrivacyDetailsAsync({ token, adminid }));
    }, 1000);
  };

  const contentconvert = (content) => {
    const words = content.split(" ");
    const startIndex = words.indexOf("limited") + 1;
    const endIndex = startIndex + 10;

    if (startIndex !== -1 && endIndex <= words.length) {
      const nextWords = words.slice(startIndex, endIndex).join(" ");
      return nextWords;
    } else {
      return content;
    }
  };

  return (
    <div>
      {deletemodalPrivacy && (
        <PrivacyDeleteModal
          id={id}
          setDeleteModal={setDeleteModal}
          setPrivacyData={setPrivacyData}
        />
      )}
      {editmodalPrivacy && (
        <PrivacyEditModal
          id={id}
          setOpenEditModal={setOpenEditModal}
          openEditModal={openEditModal}
          paraitem={paraitem}
          setParaitem={setParaitem}
          content={content}
          setContent={setContent}
          setPrivacyData={setPrivacyData}
        />
      )}
      <h3 className="text-white ml-20 mb-10 mt-10 text-left">
        Add Privacy Details
      </h3>

      <form style={{ margin: "0 20px" }} onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-white dark:text-white"
          >
            para_item
          </label>
          <input
            type="text"
            id="password"
            {...register("para_item", { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4	 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          {errors.para_item && (
            <span style={{ color: "red" }}>This field is required</span>
          )}
        </div>

        <div className="mb-6">
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-white dark:text-white"
          >
            content
          </label>
          <input
            type="text"
            id="password"
            {...register("content", { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4	 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          {errors.content && (
            <span style={{ color: "red" }}>This field is required</span>
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-2/4	 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>

      {privacyState && privacyState.length > 0 && (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-16">
          {privacyState &&
            privacyState.map((item, index) => (
              <div key={item.id}>
                <div className="p-7 rounded-xl bg-red-100 dark:bg-neutral-700/70">
                  <h3 className="text-xl font-semibold mb-7">
                    {item.para_item}
                  </h3>
                  <p className="font-medium leading-7 text-gray-500 mb-6 dark:text-gray-400">
                    {contentconvert(item.content)}
                  </p>
                  <td
                    className="px-4 py-2"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span className="text-yellow-500 flex">
                      <button
                        onClick={() => {
                          // setOpenEditModal(!openEditModal);
                          dispatch(openEditModalFunc())
                          setParaitem(item.para_item);
                          setContent(item.content);
                          setID(item.id);
                        }}
                        type="button"
                        className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          dispatch(openDeleteModalFunc())
                          setDeleteModal(true);
                          setID(item.id);
                        }}
                        type="button"
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      >
                        Delete
                      </button>
                    </span>
                  </td>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
