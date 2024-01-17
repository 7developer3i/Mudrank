import axios from "axios";
import React, { useContext } from "react";
import { BaseUrl } from "../../../apis/contant";
import { useDispatch } from "react-redux";
import {
  fetchPrivacyDetailsAsync,
  fetchPrivacyEditAsync,
  openEditModalFunc,
} from "../../../feature/website/privacy/privacySlice";
import Cookies from "js-cookie";
import AuthContext from "../../../context/AuthContext";

export const PrivacyEditModal = ({
  setOpenEditModal,
  openEditModal,
  setParaitem,
  paraitem,
  content,
  setContent,
  id,
  setPrivacyData,
}) => {
  const dispatch = useDispatch();
  const { adminid } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get("admin_token");

    dispatch(
      fetchPrivacyEditAsync({
        para_item: paraitem,
        content: content,
        id: id,
        token: token,
        adminid: adminid,
      })
    );
    dispatch(openEditModalFunc());
    setTimeout(() => {
      dispatch(fetchPrivacyDetailsAsync({ token, adminid }));
    }, 1000);
  };
  return (
    <div>
      <div
        style={{ display: "block" }}
        id="authentication-modal"
        tabindex="-1"
        aria-hidden="true"
        class="fixed top-15 left-50 right-50 z-50 hidden w-full p-32 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div class="relative w-full max-w-md max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={() => {dispatch(openEditModalFunc());}}
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
            <div class="px-6 py-6 lg:px-8">
              <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Update Privacy Details
              </h3>
              <form class="space-y-6" action="#">
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Paraitem
                  </label>
                  <input
                    type="paraitem"
                    name="paraitem"
                    id="paraitem"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder=""
                    value={paraitem}
                    onChange={(e) => setParaitem(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Content
                  </label>
                  <input
                    type="text"
                    name="content"
                    id="content"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </div>

                <button
                  class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={(e) => handleSubmit(e)}
                >
                  Update details
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
