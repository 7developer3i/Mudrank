import axios from "axios";
import React, { useContext } from "react";
import { BaseUrl } from "../../../apis/contant";
import { useDispatch } from "react-redux";
import {
  fetchPrivacyDeleteAsync,
  fetchPrivacyDetailsAsync,
  openDeleteModalFunc,
} from "../../../feature/website/privacy/privacySlice";
import Cookies from "js-cookie";
import AuthContext from "../../../context/AuthContext";

const PrivacyDeleteModal = ({ id, setDeleteModal, setPrivacyData }) => {
  const { adminid } = useContext(AuthContext);

  const dispatch = useDispatch();
  const handleDelete = () => {
    const token = Cookies.get("admin_token");
    dispatch(fetchPrivacyDeleteAsync({ id, adminid }));
    dispatch(openDeleteModalFunc());
    setTimeout(() => {
      dispatch(fetchPrivacyDetailsAsync({ token, adminid }));
    }, 1000);
  };
  return (
    <div>
      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            class="w-full inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    class="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    {" "}
                    Are You Sure Delete ?
                  </h3>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              {/* <!-- Subscribe button --> */}
              <button
                onClick={() => handleDelete()}
                type="button"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                {" "}
                Delete
              </button>
              {/* <!-- Cancel button --> */}
              <button
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                {" "}
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyDeleteModal;
