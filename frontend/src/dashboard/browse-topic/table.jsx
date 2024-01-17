import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BaseUrl } from "../../apis/contant";
import { BrowseDelete } from "./delete";
import { BrowseEditMOdal } from "./edit";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrowseDetailsAsync, fetchCreateBrowseBlogAsync } from "../../feature/website/browse/browseSlice";
import { fetchFreqDetailsAsync } from "../../feature/website/frequentlyasked/frequentlySlice";
import Cookies from "js-cookie";
import AuthContext from "../../context/AuthContext";

export const BrowseTable = () => {
  const [browseData, setBrowseData] = useState([]);
  const [openbrowseEditModal, setOpenbrowseEditModal] = useState(false);
  const [openbrowseDeleteModal, setOpenbrowseDeleteModal] = useState(false);
  const [describeItem, setDescribeItem] = useState("");
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [id, setId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [queData, setQueData] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const { adminid } = useContext(AuthContext)


  const itemsPerPage = 6;

  const browseState = useSelector((state) => state.browse.data);
  const isLoading = useSelector((state) => state.browse.isloading);
  const dispatch = useDispatch();

  const freqState = useSelector((state) => state.freq.data);


  const handleToggle = (index) => {
    if (index === openIndex) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  // react hook form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    const token = Cookies.get("admin_token");
    dispatch(fetchBrowseDetailsAsync({ token, adminid }));
    dispatch(fetchFreqDetailsAsync({ token, adminid }));
  }, [dispatch]);

  // fetchbrowseData();
  function mergeData() {
    return browseState.map((browseItem) => {
      const matchingCardItems = freqState.filter(
        (cardItem) => cardItem.browse_id === browseItem.id
      );

      if (matchingCardItems.length > 0) {
        // If there are matching card items, map them to an array of questions and answers
        const questions = matchingCardItems.map((item) => item.question);
        const answers = matchingCardItems.map((item) => item.answer);

        return {
          ...browseItem,
          questions,
          answers,
        };
      } else {
        // If no matching card items, keep the browseItem as is
        return browseItem;
      }
    });
  };

  const mergedData = mergeData(browseState, freqState);

  const onSubmit = (data) => {
    const token = Cookies.get("admin_token")
    data.token = token;
    data.adminid = adminid
    dispatch(fetchCreateBrowseBlogAsync(data));
    reset();
    setTimeout(() => {
      dispatch(fetchBrowseDetailsAsync({ token, adminid }));
      dispatch(fetchFreqDetailsAsync({ token, adminid }));
    }, 1200);
  };

  const DeleteQuestion = (id) => {
    axios
      .delete(`${BaseUrl.url}question/${id}`)
      .then((res) => {
        if (res.status == 200) {
          axios
            .get(`${BaseUrl.url}freq`)
            .then((res) => {
              setQueData(res.data);
            })
            .catch((err) => {
              console.log("err", err);
            });
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };


  // convert 80 character only
  function truncateText(text, maxCharacters) {
    if (text.length > maxCharacters) {
      return text.slice(0, maxCharacters) + "...";
    }
    return text;
  };

  const calculateCardRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return browseState.slice(startIndex, endIndex);
  };

  return (
    <div>
      {openbrowseEditModal && (
        <BrowseEditMOdal
          openbrowseEditModal={openbrowseEditModal}
          setOpenbrowseEditModal={setOpenbrowseEditModal}
          describeItem={describeItem}
          title={title}
          setBrowseData={setBrowseData}
          id={id}
          setId={setId}
          setDescribeItem={setDescribeItem}
          setTitle={setTitle}
          question={question}
          setQuestion={setQuestion}
          answer={answer}
          setAnswer={setAnswer}
          queData={queData}
          setQueData={setQueData}
        />
      )}
      {openbrowseDeleteModal && (
        <BrowseDelete
          setBrowseData={setBrowseData}
          openbrowseDeleteModal={openbrowseDeleteModal}
          setOpenbrowseDeleteModal={setOpenbrowseDeleteModal}
          id={id}
          setId={setId}
        />
      )}

      <div class="py-20 px-20">
        <div class="container">
          <div class="mx-auto max-w-4xl sm:text-center">
            <img
              src="assets/images/landing/index-21.png"
              class="w-40 mx-auto"
              alt=""
            />
            <h2 class="md:text-5xl text-3xl font-semibold tracking-tight" style={{color:"#ffff"}}>
              Browse by Topics
            </h2>
          </div>
          <h4 className="mx-5 my-2" style={{color:"#ffff"}}>Add Browse Details</h4>

          <form style={{ margin: "0 20px" }} onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label
                for="title"
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                title
              </label>
              <input
                {...register("title", { required: "this field is required" })}
                type="text"
                id="text"
                className="dark:text-black border border-gray-300 dark:text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4	 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
              />
              {errors.title && (
                <span className="text-white">This field is required</span>
              )}
            </div>
            <div className="mb-6">
              <label
                for="describe"
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                Describe
              </label>
              <input
                {...register("describe_item", {
                  required: "this field is required",
                })}
                type="text"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4	 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.describe && (
                <span className="text-white">This field is required</span>
              )}
            </div>

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
                {...register("question", { required: true })}
                className="dark:text-black border border-gray-300 dark:text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4	 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
              />
              {errors.question && (
                <span className="text-white">This field is required</span>
              )}
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
                {...register("answer", { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4	 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.answer && (
                <span className="text-white">This field is required</span>
              )}
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-2/4	 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
          <div className="grid mb-10 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-16">
            {mergedData &&
              mergedData.map((item, index) => (
                <div className="flex items-center justify-center bg-gradient">
                  <div className="w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl">
                    <div className="max-w-md mx-auto space-y-6">
                      <h5>{item.title}</h5>

                      <p className="text-gray-600">
                        {" "}
                        {item.describe_item
                          ? truncateText(item.describe_item, 80)
                          : ""}
                      </p>

                      <div
                        onClick={() => handleToggle(index)}
                        className="flex items-center text-gray-600 w-full border-b overflow-hidden mt-32 md:mt-0 mb-5 mx-auto"
                      >
                        <div className="w-10 border-r px-2 transform transition duration-300 ease-in-out"></div>
                        <div className="flex items-center px-2 py-3">
                          <div className="mx-3">
                            <button className="hover-underline">
                              {item.questions && item.questions.length > 0 && (
                                <button
                                  onClick={() => {
                                    DeleteQuestion(item.id);
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-red-700"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                </button>
                              )}
                              {/* <button onClick={()=>DeleteQuestion(item.id)}>Delete Question</button> */}
                              {item.questions &&
                                item.questions.map((datas) => (
                                  <h3 className="text-xl font-semibold mb-7">
                                    {datas}
                                  </h3>
                                ))}{" "}
                              {isDropdownOpen ? "" : ""}
                            </button>
                          </div>
                        </div>
                      </div>

                      {openIndex === index && (
                        <div className="flex p-5 md:p-0 w-full transform transition duration-300 ease-in-out border-b pb-10">
                          {item.answers &&
                            item.answers.map((datas) => (
                              <h3 class="text-xl font-semibold mb-7">
                                {datas}
                              </h3>
                            ))}
                        </div>
                      )}
                      <td
                        class="px-4 py-2"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span class="text-yellow-500 flex">
                          <button
                            onClick={() => {
                              setDescribeItem(item.describe_item);
                              setTitle(item.title);
                              setId(item.id);
                              setQuestion(item.questions[0]);
                              setAnswer(item.answers[0]);
                              setOpenbrowseEditModal(!openbrowseEditModal);
                            }}
                            type="button"
                            class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => {
                              setOpenbrowseDeleteModal(!openbrowseDeleteModal);
                              setId(item.id);
                            }}
                            type="button"
                            class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                          >
                            Delete
                          </button>
                        </span>
                      </td>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="pagination" style={{ textAlign: "center" }}>
          <button
            className="mr-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button className="mr-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Page {currentPage}
          </button>
          <button
            className="mr-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
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
