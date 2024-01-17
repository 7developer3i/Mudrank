import React, { useContext, useEffect } from "react";
import { FaqEditMOdal } from "./edit";
import { FaqDelete } from "./delete";
import { useState } from "react";
import axios from "axios";
import { BaseUrl } from "../../apis/contant";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCreateFaqBlogAsync,
  fetchFaqDetailsAsync,
  openDeleteModalFunc,
  openEditModalFunc,
} from "../../feature/website/faq/faqSlice";
import Cookies from "js-cookie";
import AuthContext from "../../context/AuthContext";

export const FaqTable = () => {
  const [OpenEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [faqData, setFaqData] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [id, setId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const faqState = useSelector((state) => state.faq.data);
  const editState = useSelector((state)=>state.faq.editModal)
  const deleteState = useSelector((state)=>state.faq.deleteModal)
  const dispatch = useDispatch();
  const {adminid} = useContext(AuthContext);
  const token = Cookies.get("admin_token")

  useEffect(() => {
    dispatch(fetchFaqDetailsAsync({token,adminid}));
  }, [dispatch]);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const contentconvert = (answer) => {
    const words = answer.split(" ");
    const startIndex = words.indexOf("limited") + 1; // Find the index of 'limited' and add 1 to get the start index.
    const endIndex = startIndex + 10; // Calculate the end index for the 10 words.

    if (startIndex !== -1 && endIndex <= words.length) {
      const nextWords = words.slice(startIndex, endIndex).join(" ");
      return nextWords;
    } else {
      return answer;
    }
  };

  const onSubmit = (data) => {
    data.adminid = adminid
    data.token = token
    dispatch(fetchCreateFaqBlogAsync(data));
    reset()
    dispatch(fetchFaqDetailsAsync({token,adminid}));
  };

  const calculateCardRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return faqState.slice(startIndex, endIndex);
  };

  return (
    <div>
      {editState && (
        <FaqEditMOdal
          setOpenEditModal={setOpenEditModal}
          OpenEditModal={OpenEditModal}
          question={question}
          setQuestion={setQuestion}
          answer={answer}
          setAnswer={setAnswer}
          id={id}
          setId={setId}
          setFaqData={setFaqData}
        />
      )}
      {deleteState && (
        <FaqDelete
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          id={id}
          setId={setId}
          setFaqData={setFaqData}
        />
      )}
      <div class="py-20">
        <div class="container">
          <div class="mx-auto max-w-4xl sm:text-center">
            <img
              src="assets/images/landing/index-21.png"
              class="w-40 mx-auto"
              alt=""
            />
            <h2 class="md:text-5xl text-3xl font-semibold tracking-tight" style={{color:"#ffff"}}>
              Getting started | FAQ
            </h2>
          </div>
          <h4 className="mx-5 my-2" style={{color:"#ffff"}}>Add Faq Details</h4>

          <form style={{ margin: "0 20px" }} onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label
                for="title"
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                question
              </label>
              <input
                type="text"
                id="text"
                {...register("question", {
                  required: "this field is required",
                })}
                className="dark:text-black border border-gray-300 dark:text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4	 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
              />
              {errors.question && <span>This field is required</span>}
            </div>
            <div className="mb-6">
              <label
                for="describe"
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                answer
              </label>
              <input
                type="text"
                id="password"
                {...register("answer", { required: "this field is required" })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4	 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.answer && <span>This field is required</span>}
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-2/4	 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>

          <div class="grid mb-10 lg:grid-cols-3 md:grid-cols-2 grikd-cols-1 gap-6 mt-16">
            {faqState &&
              calculateCardRange().map((item, index) => (
                <div>
                  <div class="p-7 rounded-xl bg-red-100 dark:bg-neutral-700/70">
                    <h3 class="text-xl font-semibold mb-7">{item.question}</h3>
                    <p class="font-medium leading-7 text-gray-500 mb-6 dark:text-gray-400">
                      {contentconvert(item.answer)}
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
                            // setOpenEditModal(!OpenEditModal);
                            dispatch(openEditModalFunc())
                            setQuestion(item.question);
                            setAnswer(item.answer);
                            setId(item.id);
                          }}
                          type="button"
                          className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => {
                            // setOpenDeleteModal(!openDeleteModal);
                            dispatch(openDeleteModalFunc())
                            setId(item.id);
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
        </div>
        <div className="pagination" style={{ textAlign: "center" }}>
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Page {currentPage}
          </button>
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={calculateCardRange().length < itemsPerPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
