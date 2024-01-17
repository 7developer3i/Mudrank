import React, { useEffect, useState } from "react";
import EditBlogs from "./editDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  delete_data_show,
  edit_data_show,
  fetchBlogDetailsAsync,
  selectBlogs,
  selectStatus,
} from "../../../feature/website/blogs/blogSlice";
import DeleteBlogPage from "./deleteDetail";
import Cookies from "js-cookie";

const BlogTable = () => {
  const blogs = useSelector(selectBlogs);
  const status = useSelector(selectStatus);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [opendeletemodal, setOpenDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]); // Initialize with your original data
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleOpenModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    const token = Cookies.get("admin_token")
    return () => 
    dispatch(fetchBlogDetailsAsync(token));
  }, []);

  function truncateString(str, numWords) {
    // Split the string into words
    const words = str.split(" ");
    // Check if the string has more words than the specified limit
    if (words.length > numWords) {
      // Slice the array to get only the first numWords elements
      const truncatedWords = words.slice(0, numWords);
      // Join the truncated words back into a string
      return `${truncatedWords.join(" ")}...`;
    }
    return str;
  }

  useEffect(() => {
    // Filter the data based on the search text
    const filtered = blogs.filter((blog) =>
      blog.type.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filtered);
  }, [blogs, searchText]);

  const pageNumbers = Math.ceil(filteredData.length / itemsPerPage);

  const renderPageNumbers = () => {
    const pageLinks = [];
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Define the number of pages to show in the pagination
    const numPagesToShow = 3; // You can adjust this number as needed

    // Calculate the starting page number
    let startPage = currentPage - Math.floor(numPagesToShow / 2);
    startPage = Math.max(1, startPage); // Ensure it's not less than 1

    // Calculate the ending page number
    let endPage = startPage + numPagesToShow - 1;
    endPage = Math.min(totalPages, endPage); // Ensure it's not greater than the total pages

    // Generate page links within the defined range
    for (let i = startPage; i <= endPage; i++) {
      pageLinks.push(
        <li key={i} className="px-[6px]">
          <a
            href="javascript:void(0)"
            className={`w-9 h-9 flex items-center justify-center rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-white ${
              i === currentPage ? "bg-primary text-white" : ""
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </a>
        </li>
      );
    }
    return pageLinks;
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      {open && <EditBlogs setOpen={setOpen} open={open} />}
      {opendeletemodal && (
        <DeleteBlogPage
          setOpenDeleteModal={setOpenDeleteModal}
          opendeletemodal={opendeletemodal}
        />
      )}
      <section
        className="relative py-6 mt-2 bg-blueGray-50"
        style={{ zIndex: open ? "-1" : "" }}
      >
        <div className="w-full mb-12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded  bg-pink-900 text-white">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
                  <h3 className="font-semibold text-lg text-white">
                    Blog Tables
                  </h3>
                </div>
              </div>
            </div>
            <div className="relative mt-1 mb-1 ml-5">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="bg-pink-900 border border-pink-400 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
              />
            </div>
            <div className="block w-full overflow-x-auto ">
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                      Image
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                      type
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                      Status
                    </th>
                    <th className="px-6 align-center border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                      Title
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {blogs &&
                    status === "idle" &&
                    currentItems.map((data, index) => (
                      <>
                        <tr key={index}>
                          <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                            <img
                              src={data.image}
                              className="h-12 w-12 bg-white rounded-full border"
                              alt="..."
                            />
                            <span className="ml-3 font-bold text-white">
                              Argon Design System
                            </span>
                          </th>
                          <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {data.type}
                          </td>
                          <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {data.is_deleted === 1 ? (
                              <i className="fas fa-circle text-orange-500 mr-2"></i>
                            ) : (
                              <i className="fas fa-circle text-green-500 mr-2"></i>
                            )}
                            {data.is_deleted === 1 ? "inActive" : "Active"}
                          </td>
                          <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div className="flex items-center">
                              <span className="mr-2">
                                {truncateString(data.title, 10)}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 ml-4 py-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div className="flex justify-start gap-4">
                              <a
                                x-data="{ tooltip: 'Delete' }"
                                onClick={() => {
                                  dispatch(delete_data_show(data));
                                  setOpenDeleteModal(true);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="h-6 w-6"
                                  x-tooltip="tooltip"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </a>
                              <a
                                x-data="{ tooltip: 'Edite' }"
                                onClick={() => {
                                  handleOpenModal();
                                  dispatch(edit_data_show(data));
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="h-6 w-6"
                                  x-tooltip="tooltip"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                  />
                                </svg>
                              </a>
                            </div>
                          </td>
                        </tr>
                      </>
                    ))}
                </tbody>
              </table>
              <div className=" inline-flex border border-[#e4e4e4 p-4 rounded-xl">
                <ul className="flex items-center -mx-[6px]">
                  <li className="px-[6px]">
                    <a
                      className="w-9 h-9 flex items-center justify-center rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-white"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      {/* Previous Button */}
                      <span>
                        <svg
                          width="8"
                          height="15"
                          viewBox="0 0 8 15"
                          class="fill-current stroke-current"
                        >
                          <path
                            d="M7.12979 1.91389L7.1299 1.914L7.1344 1.90875C7.31476 1.69833 7.31528 1.36878 7.1047 1.15819C7.01062 1.06412 6.86296 1.00488 6.73613 1.00488C6.57736 1.00488 6.4537 1.07206 6.34569 1.18007L6.34564 1.18001L6.34229 1.18358L0.830207 7.06752C0.830152 7.06757 0.830098 7.06763 0.830043 7.06769C0.402311 7.52078 0.406126 8.26524 0.827473 8.73615L0.827439 8.73618L0.829982 8.73889L6.34248 14.6014L6.34243 14.6014L6.34569 14.6047C6.546 14.805 6.88221 14.8491 7.1047 14.6266C7.30447 14.4268 7.34883 14.0918 7.12833 13.8693L1.62078 8.01209C1.55579 7.93114 1.56859 7.82519 1.61408 7.7797L1.61413 7.77975L1.61729 7.77639L7.12979 1.91389Z"
                            stroke-width="0.3"
                          ></path>
                        </svg>
                      </span>
                    </a>
                  </li>
                  {renderPageNumbers()}
                  <li className="px-[6px]">
                    <a
                      href="javascript:void(0)"
                      className="w-9 h-9 flex items-center justify-center rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-white"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === pageNumbers}
                    >
                      {/* Next Button */}
                      <span>
                        <svg
                          width="8"
                          height="15"
                          viewBox="0 0 8 15"
                          class="fill-current stroke-current"
                        >
                          <path
                            d="M0.870212 13.0861L0.870097 13.086L0.865602 13.0912C0.685237 13.3017 0.684716 13.6312 0.895299 13.8418C0.989374 13.9359 1.13704 13.9951 1.26387 13.9951C1.42264 13.9951 1.5463 13.9279 1.65431 13.8199L1.65436 13.82L1.65771 13.8164L7.16979 7.93248C7.16985 7.93243 7.1699 7.93237 7.16996 7.93231C7.59769 7.47923 7.59387 6.73477 7.17253 6.26385L7.17256 6.26382L7.17002 6.26111L1.65752 0.398611L1.65757 0.398563L1.65431 0.395299C1.454 0.194997 1.11779 0.150934 0.895299 0.373424C0.695526 0.573197 0.651169 0.908167 0.871667 1.13067L6.37922 6.98791C6.4442 7.06886 6.43141 7.17481 6.38592 7.2203L6.38587 7.22025L6.38271 7.22361L0.870212 13.0861Z"
                            stroke-width="0.3"
                          ></path>
                        </svg>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogTable;
