import axios from "axios";
import React, { useContext } from "react";
import { BaseUrl } from "../../apis/contant";
import { useDispatch } from "react-redux";
import { fetchFaqDetailsAsync, fetchFaqEditAsync, openDeleteModalFunc, openEditModalFunc } from "../../feature/website/faq/faqSlice";
import Cookies from "js-cookie";
import AuthContext from "../../context/AuthContext";

export const FaqEditMOdal = ({
  setOpenEditModal,
  OpenEditModal,
  question,
  setQuestion,
  answer,
  setAnswer,
  id,
  setId,
  setFaqData,
}) => {
  const dispatch = useDispatch();
  const {adminid} = useContext(AuthContext);

  const handleEdit = (e) => {
    e.preventDefault();

    const token = Cookies.get("admin_token");
    dispatch(
      fetchFaqEditAsync({
        question: question,
        answer: answer,
        id: id,
        token: token,
        adminid:adminid
      })
    );
    dispatch(openEditModalFunc());
    dispatch(fetchFaqDetailsAsync());
    setTimeout(() => {
      dispatch(fetchFaqDetailsAsync({token,adminid}));      
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
              onClick={() => {dispatch(openDeleteModalFunc())}}
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
                Update FAQ Details
              </h3>
              <form class="space-y-6" action="#">
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    question
                  </label>
                  <input
                    type="paraitem"
                    name="paraitem"
                    value={question}
                    id="paraitem"
                    onChange={(e) => setQuestion(e.target.value)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder=""
                    required
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    answer
                  </label>
                  <input
                    type="text"
                    name="content"
                    value={answer}
                    id="content"
                    onChange={(e) => setAnswer(e.target.value)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  onClick={(e) => handleEdit(e)}
                  class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
