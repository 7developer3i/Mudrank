import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDeleteBlogAsync,
  selectDeleteDataShow, fetchBlogDetailsAsync
} from "../../../feature/website/blogs/blogSlice";
import Cookies from "js-cookie";
import AuthContext from "../../../context/AuthContext";

const DeleteBlogPage = ({ setOpenDeleteModal, opendeletemodal }) => {
  const deleteData = useSelector(selectDeleteDataShow);
  const dispatch = useDispatch();
  const { adminid } = useContext(AuthContext);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const token = Cookies.get("admin_token")

  return (
    <div
      id="default-modal"
      data-modal-show="true"
      aria-hidden="true"
      class="overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center"
    >
      <div class="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
        <div
          style={{ position: "absolute", zIndex: opendeletemodal ? "1" : "0" }}
          className="items-center w-full mr-auto ml-auto relative max-w-7xl md:px-12 lg:px-24 mt-5"
        >
          {deleteData && (
            <div className="grid grid-cols-1">
              <div className="mt-4 mr-auto mb-4 ml-auto bg-gray-900 max-w-lg">
                <div className="flex flex-col items-center pt-6 pr-6 pb-6 pl-6">
                  <img
                    src={deleteData.image}
                    className="flex-shrink-0 object-cover object-center btn- flex w-16 h-16 mr-auto -mb-8 ml-auto rounded-full shadow-xl"
                  />
                  <p className="mt-8 text-2xl font-semibold leading-none text-white tracking-tighter lg:text-3xl">
                    {capitalizeFirstLetter(deleteData.type)}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-center text-gray-100">
                    {deleteData.title}
                  </p>
                  <p class="mt-3 text-base leading-relaxed text-center text-gray-500">
                    Are you sure you would like to delete of your blog?
                  </p>
                  <div className="mt-6 flex">
                    <a
                      onClick={() => {
                        dispatch(fetchDeleteBlogAsync({ id: deleteData.id, token: token, adminid: adminid }));
                        setOpenDeleteModal(false);
                        setTimeout(() => {
                          dispatch(fetchBlogDetailsAsync(token));
                        }, 1000);
                      }}
                      className="mr-5 flex text-center items-center justify-center pt-4 pr-10 pb-4 pl-10 text-base
                    font-medium text-white bg-indigo-600 rounded-xl transition duration-500 ease-in-out transform
                    hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Delete Blog
                    </a>
                    <a
                      onClick={() => setOpenDeleteModal(false)}
                      className="flex text-center items-center justify-center pt-4 pr-10 pb-4 pl-10 text-base
                    font-medium text-white bg-gray-600 rounded-xl transition duration-500 ease-in-out transform
                    hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white-500"
                    >
                      Cancel
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteBlogPage;
