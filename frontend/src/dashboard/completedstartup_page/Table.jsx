import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BaseUrl } from "../../apis/contant";
import { AboutEditMOdal } from "./edit";
import { AboutDelete } from "./delete";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCreateCompletedstartupDetailsAsync,
  fetchcompletedstartupDetailsAsync,
  openDeleteModalFunc,
  openEditModalFunc,
} from "../../feature/website/completedstartup/startupSlice";
import Cookies from "js-cookie";
import AuthContext from "../../context/AuthContext";

export const CompletedstartupTable = () => {
  const [AboutData, setAboutData] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteMOdal, setDeleteModal] = useState(false);
  const [showimage, setShowimage] = useState([]);
  const [title, setTitle] = useState("");
  const [id, setId] = useState(null);

  const [inputImage, setInputImage] = useState([]);
  const [inputtitle, setInputTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const completedstartupState = useSelector(
    (state) => state.completedstartup.data
  );
  const editState = useSelector((state)=>state.completedstartup.editModal)
  const deleteState = useSelector((state)=>state.completedstartup.deleteModal)


  const dispatch = useDispatch();
  const { adminid } = useContext(AuthContext);

  const token = Cookies.get("admin_token");

  useEffect(() => {
    dispatch(fetchcompletedstartupDetailsAsync({token,adminid}));
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("inputtitle", inputtitle);
    formData.append("files", inputImage);
    formData.append("token",token)
    formData.append("adminid",adminid)

    dispatch(fetchCreateCompletedstartupDetailsAsync(formData));
    setInputTitle("");
    setInputImage([]);
    setTimeout(() => {
      dispatch(fetchcompletedstartupDetailsAsync({token,adminid}))
    }, 1000);
  };

  const calculateCardRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return completedstartupState.slice(startIndex, endIndex);
  };

  return (
    <div>
      {editState && (
        <AboutEditMOdal
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          showimage={showimage}
          setShowimage={setShowimage}
          title={title}
          setTitle={setTitle}
          id={id}
          setId={setId}
          setAboutData={setAboutData}
        />
      )}
      {deleteState && (
        <AboutDelete
          openDeleteMOdal={openDeleteMOdal}
          setDeleteModal={setDeleteModal}
          id={id}
          setId={setId}
          setAboutData={setAboutData}
        />
      )}
      <div className="mb-10   h-[100vh] pt-4 mt-10">
        <div className="mx-auto max-w-4xl sm:text-center">
          <h2 className="md:text-5xl text-3xl font-semibold tracking-tight" style={{color:"#ffff"}}>
            Startup Campaigns Details
          </h2>
        </div>
        <h4 className="mx-5 my-2 mt-10"  style={{color:"#ffff"}}>Add Completed Startups</h4>

        <form style={{ margin: "0 20px" }}>
          <label
            className="block mb-2 text-sm font-medium text-white dark:text-white"
            for="file_input"
          >
            Upload file
          </label>
          <input
            className="block w-2/4 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer text-black dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            onChange={(e) => setInputImage(e.target.files[0])}
          />
          <p
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            SVG, PNG, JPG or GIF (MAX. 800x400px).
          </p>

          <div className="mb-6">
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4	 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={(e) => setInputTitle(e.target.value)}
            />
          </div>

          <button
            type="submit"
            onClick={(e) => handleClick(e)}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-2/4	 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
        <div
          className="min-w-[375px] mt-10 md:min-w-[700px] xl:min-w-[800px] mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6"
          style={{margin:"10px 10px"}}
        >
          {AboutData &&
            calculateCardRange().map((item, index) => (
              <div key={index}
                style={{ zIndex: "1" }}
                className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none"
              >
                <div className="ml-[18px] flex w-auto flex-row items-center">
                  <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                    <img
                      className="backimg"
                      src={`${BaseUrl.url}${item.Image}`}
                    />
                  </div>
                </div>
                <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                  {/* <p className="font-dm text-sm font-medium text-gray-600">Earnings</p> */}
                  <h4
                    className="text-xl font-bold text-navy-700 dark:text-black"
                    style={{ color: "black" }}
                  >
                    {item.title}
                  </h4>
                </div>
                <td className="px-16 py-2">
                  <span className="text-yellow-500 flex">
                    <button
                      onClick={() => {
                        // setOpenEditModal(!openEditModal);
                        dispatch(openEditModalFunc())
                        setShowimage(item.Image);
                        setTitle(item.title);
                        setId(item.id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-700 mx-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path
                          fill-rule="evenodd"
                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => {
                        // setDeleteModal(true);
                        dispatch(openDeleteModalFunc())
                        setId(item.id);
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
                  </span>
                </td>
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
  );
};
