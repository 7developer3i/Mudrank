import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BaseUrl } from "../../apis/contant";
import { AboutEditMOdal } from "./edit";
import { AboutDelete } from "./delete";
import { WebsiteContext } from "../../websitecontext/websiteContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchAboutDetailsAsync, fetchCreateAboutAsync, openDeletemodalfunc, openEditmodalfunc } from "../../feature/website/about/aboutSlice";
import Cookies from "js-cookie";
import AuthContext from "../../context/AuthContext";
import { fetchAboutDetails } from "../../feature/website/about/aboutApi";


export const AboutTable = () => {
  const [files, setFiles] = useState({});
  const [fieldone, setFieldOne] = useState("");
  const [fieldtwo, setFieldTwo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { adminid } = useContext(AuthContext)
  const {
    id,
    setId,
    textone,
    setTextone,
    heading,
    setHeading,
    paratext,
    setParatext,
    openEditModal,
    setOpenEditModal,
    AboutData,
    setAboutData,
    openDeleteMOdal,
    setDeleteModal,
  } = useContext(WebsiteContext);

  const aboutState = useSelector((state) => state.about.data)
  const editState = useSelector((state) => state.about.editmodal)
  const deleteState = useSelector((state) => state.about.deletemodal)

  const dispatch = useDispatch()


  const [showImage1, setShowImage1] = useState('');

  useEffect(() => {
    const token = Cookies.get("admin_token");
    dispatch(fetchAboutDetailsAsync({ token, adminid }))
  }, [dispatch, adminid]);

  const contentconvert = (paratext) => {
    if (paratext && typeof paratext === "string") {
      const words = paratext.split(" ");
      const startIndex = words.indexOf("limited") + 1; // Find the index of 'limited' and add 1 to get the start index.
      const endIndex = startIndex + 10; // Calculate the end index for the 10 words.

      if (startIndex !== -1 && endIndex <= words.length) {
        const nextWords = words.slice(startIndex, endIndex).join(" ");
        return nextWords;
      } else {
        return paratext;
      }
    }
  };

  function truncateText(text, maxCharacters) {
    if (text.length, maxCharacters) {
      return text.slice(0, maxCharacters) + '...';
    } else {
      return text
    }

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get("admin_token");
    const formData = new FormData();
    formData.append("fieldone", fieldone);
    formData.append("fieldtwo", fieldtwo);
    formData.append("files", files);
    formData.append("token", token);
    formData.append("adminid", adminid)

    dispatch(fetchCreateAboutAsync(formData));
    setFieldOne("");
    setFieldTwo("");
    setFiles({});
    setTimeout(() => {
      dispatch(fetchAboutDetailsAsync({ token, adminid }))
    }, 1000);
  }
  const calculateCardRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return aboutState && aboutState.slice(startIndex, endIndex);
  };

  return (
    <div>
      {editState && (
        <AboutEditMOdal
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          textone={textone}
          heading={heading}
          paratext={paratext}
          setTextone={setTextone}
          setHeading={setHeading}
          setParatext={setParatext}
          setId={setId}
          id={id}
          showimage={showImage1}
          setShowImage1={setShowImage1}
        />
      )}
      {deleteState && (
        <AboutDelete
          openDeleteMOdal={openDeleteMOdal}
          setDeleteModal={setDeleteModal}
          setId={setId}
          id={id}
        />
      )}
      <div className="mx-auto max-w-4xl sm:text-center mt-10">
        <img
          src="assets/images/landing/index-21.png"
          className="w-40 mx-auto"
          alt=""
        />
        <h2 className="md:text-5xl text-3xl font-semibold tracking-tight" style={{color:"white"}}>
          Meet The Founder Details
        </h2>
        <div className="flex justify-center">
          <p className="md:w-1/2 mt-6 text-xl/8 font-medium text-gray-500 dark:text-gray-400">
            The point of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters. .
          </p>
        </div>
      </div>
      <h4 className="mx-5 my-2">Add Founder Details</h4>

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
          onChange={(e) => setFiles(e.target.files[0])}
        />
        <p
          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="file_input_help"
        >
          SVG, PNG, JPG or GIF (MAX. 800x400px).
        </p>

        <div className="mb-6">
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-white dark:text-white"
          >
            textone
          </label>
          <input
            type="text"
            id="text"
            className="dark:text-black border border-gray-300 dark:text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4	 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={fieldone}
            required
            onChange={(e) => setFieldOne(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-white dark:text-white"
          >
            paratext
          </label>
          <input
            type="text"
            id="password"
            value={fieldtwo}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4	 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={(e) => setFieldTwo(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-2/4	 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </button>
      </form>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grikd-cols-1 gap-6 mt-16">
          {aboutState &&
            calculateCardRange().map((item, index) => (
              <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5">
                <div className="md:flex">
                  <div className="md:flex-shrink-0">
                    <img
                      className="h-48 w-full object-cover md:w-48"
                      src={`${BaseUrl.url}${item.image}`}
                      alt="Event image"
                    />
                  </div>
                  <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                      {item.textone}
                    </div>
                    <p className="block mt-1 text-lg leading-tight font-medium text-black">
                      {item.heading}
                    </p>
                    <p className="mt-2 text-gray-500">
                      {item.paratext ? truncateText(item.paratext, 20) : ""}

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
                          type="button"
                          className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                          onClick={() => {
                            dispatch(openEditmodalfunc())
                            setTextone(item.textone);
                            setHeading(item.heading);
                            setParatext(item.paratext);
                            setId(item.id);
                            setShowImage1(item.image)
                          }}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                          onClick={() => {
                            dispatch(openDeletemodalfunc())
                            setId(item.id);
                          }}
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
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Page {currentPage}</button>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => setCurrentPage(currentPage + 1)} disabled={calculateCardRange().length < itemsPerPage}>
          Next
        </button>
      </div>

    </div>
  );
};

