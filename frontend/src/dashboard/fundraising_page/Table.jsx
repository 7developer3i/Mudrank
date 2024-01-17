import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BaseUrl } from "../../apis/contant";
import { WebsiteContext } from "../../websitecontext/websiteContext";
import { AboutEditMOdal } from "./edit";
import { AboutDelete } from "./delete";
import { fetchFundraisingDetailsAsync, fetchcreateFundraisingDetailsAsync, openDeleteModalFunc, openEditModalFunc } from "../../feature/website/fundraising/fundraisingSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import AuthContext from "../../context/AuthContext";

export const Fundraisingtable = () => {

  // redux 
   const FundraisingState = useSelector((state)=>state.fundraising.data);
   const editState = useSelector((state)=>state.fundraising.editModal)
   const deleteState = useSelector((state)=>state.fundraising.deleteModal)

   const {adminid} = useContext(AuthContext)
   const dispatch = useDispatch();

  const [fieldtitle, setFieldtitle] = useState("");
  const [fieldPara, setFieldPara] = useState("");
  const [imageField, setImageField] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  

  const {
    id,
    setId,
    paragraph,
    setParagraph,
    title,
    setShowTitle,
    showimage,
    setShowimage,
    openEditModal,
    setOpenEditModal,
    fundraisingData,
    setFundraisingData,
    openDeleteMOdal,
    setDeleteModal,
  } = useContext(WebsiteContext);

  const token = Cookies.get("admin_token");

  useEffect(() => {
    // fetchAboutData();
    dispatch(fetchFundraisingDetailsAsync({token,adminid}));
  }, [dispatch]);

  const handleClick = (e) => {
  
    e.preventDefault();
    const formData = new FormData();
    formData.append("fieldtitle", fieldtitle);
    formData.append("fieldPara", fieldPara);
    formData.append("files", imageField);
    formData.append("token",token)
    formData.append("adminid",adminid)
    dispatch(fetchcreateFundraisingDetailsAsync(formData));
    setTimeout(() => {
      dispatch(fetchFundraisingDetailsAsync({token,adminid}));
    }, 1000);
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
    return FundraisingState.slice(startIndex, endIndex);
  };

  return (
    <div>
      {editState && (
        <AboutEditMOdal
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          showimage={showimage}
          title={title}
          paragraph={paragraph}
          id={id}
          setShowimage={setShowimage}
          setShowTitle={setShowTitle}
          setParagraph={setParagraph}
          setId={setId}
        />
      )}
      {deleteState && (
        <AboutDelete
          openDeleteMOdal={openDeleteMOdal}
          setDeleteModal={setDeleteModal}
          id={id}
          setId={setId}
        />
      )}
      <div className="container mt-10">
        <div className="mx-auto max-w-4xl sm:text-center">
          <img
            src="assets/images/landing/index-21.png"
            className="w-40 mx-auto"
            alt=""
          />
          <h2 className="md:text-5xl text-3xl font-semibold tracking-tight" style={{color:"#ffff"}}>
            Fundraising Reimagined Details
          </h2>
          <div className="flex justify-center">
            <p className="md:w-1/2 mt-6 text-xl/8 font-medium text-gray-500 dark:text-gray-400">
              The point of using Lorem Ipsum is that it has a more-or-less
              normal distribution of letters. .
            </p>
          </div>
        </div>
        <h3 className="text-white ml-20 mb-10 mt-10 text-left">
          Add Fundraising Details
        </h3>

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
            onChange={(e) => setImageField(e.target.files[0])}
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
              onChange={(e) => setFieldtitle(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4	 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Paragraph
            </label>
            <input
              type="text"
              id="password"
              onChange={(e) => setFieldPara(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4	 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
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
        <div className="flex justify-center items-center h-full">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grikd-cols-1 gap-6 mt-16">
          {fundraisingData &&
            calculateCardRange().map((item, index) => (
              <div>
                <div className="p-7 rounded-xl bg-red-100 dark:bg-neutral-700/70">
                  <h3 className="text-xl font-semibold mb-7">{item.id}</h3>
                  <img style={{width:"10%"}} src={`${BaseUrl.url}${item.Image}`} />

                  <p className="font-medium leading-7 text-gray-500 mb-6 dark:text-gray-400">
                    {item.title ? truncateText(item.title, 40) : ""}
                  </p>

                  <p className="font-medium leading-7 text-gray-500 mb-6 dark:text-gray-400">
                    {item.paragraph ? truncateText(item.paragraph, 40) : ""}
                  </p>
                  <td className="px-16 py-2">
                    <span className="text-yellow-500 flex">
                      <button
                        type="button"
                        className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        onClick={() => {
                          // setOpenEditModal(!openEditModal);
                          dispatch(openEditModalFunc())
                          setShowimage(item.Image);
                          setShowTitle(item.title);
                          setParagraph(item.paragraph);
                          setId(item.id);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        onClick={() => {
                          // setDeleteModal(true);
                          dispatch(openDeleteModalFunc())
                          setId(item.id);
                        }}
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
        <div className="pagination mt-10 mb-10" style={{ textAlign: "center" }}>
          <button
            className="mr-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button className="mr-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Page {currentPage}
          </button>
          <button
            className="mr-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
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
