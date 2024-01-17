import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  delete_data_show,
  fetchDeleteHCustomerAsync,
  fetchHappyCustomersAsync,
  selectDeleteDataShow,
  selectHCustomers,
  selectViewDataShow,
  view_data_show,
} from "../../../feature/website/happy-customer/customerSlice";

function HappyCustomersTable() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isdeleteModalOpen, setdeleteOpen] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // You can adjust the number of items per page

  const h_customers = useSelector(selectHCustomers);
  const deleteDataShow = useSelector(selectDeleteDataShow);
  const viewDataShow = useSelector(selectViewDataShow);

  const dispatch = useDispatch();

  const view = () => {
    setModalOpen(true);
  };
  const deletemodal = (data) => {
    setdeleteOpen(true);
    dispatch(delete_data_show(data));
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const closedeleteModal = () => {
    setdeleteOpen(false);
  };

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
    // Calculate the indexes for pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Filter the data based on the search text and pagination
    const filtered = h_customers
      .filter((customer) =>
        customer.auth_name.toLowerCase().includes(searchText.toLowerCase())
      )
      .slice(startIndex, endIndex); // Slice the data to get the current page items

    setFilteredData(filtered);
  }, [h_customers, searchText, currentPage]);

  useEffect(() => {
    return () => dispatch(fetchHappyCustomersAsync());
  }, []);

  return (
    <div className="bg-white  container mx-auto px-4 sm:px-8">
      {isdeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-red">
          <div className="bg-white px-16 py-14 rounded-md text-center">
            <h1 className="text-xl mb-4 font-bold text-slate-500">
              Do you Want Delete
            </h1>
            <button
              onClick={() => {
                if (deleteDataShow) {
                  dispatch(fetchDeleteHCustomerAsync(deleteDataShow.id));
                  closedeleteModal();
                  setTimeout(() => {
                    dispatch(fetchHappyCustomersAsync())
                  }, 1000);
                }
              }}
              className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
            >
              Ok
            </button>
            <button
              className="bg-red-500 px-4 ml-5 py-2 rounded-md text-md text-white"
              onClick={closedeleteModal}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-red">
          <div className="modal w-1/2 py-4 px-8 bg-white shadow-lg rounded-lg my-20">
            {viewDataShow && (
              <div className="modal-content">
                <div className="modal-header">
                  <div className="flex items-start justify-between p-5 border-b rounded-t">
                    <h3 className="text-gray-400 text-xl lg:text-2xl font-semibold">
                      Customer Details
                    </h3>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-toggle="default-modal"
                    >
                      <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-500 text-base leading-relaxed dark:text-gray-400 mb-2">
                    <h3 className="text-gray-900  text-1rem bt-2 font-semibold dark:text-white flex">
                      Name
                    </h3>
                    {viewDataShow.auth_name}
                  </p>
                  <p className="text-gray-500 text-base leading-relaxed dark:text-gray-400 mb-2">
                    <h3 className="text-gray-900  text-1rem bt-2 font-semibold dark:text-white flex">
                      Post
                    </h3>
                    {viewDataShow.auth_post}
                  </p>
                  <p className="text-gray-500 text-base leading-relaxed dark:text-gray-400 mb-2">
                    <h3 className="text-gray-900  text-1rem bt-2 font-semibold dark:text-white flex">
                      Description
                    </h3>
                    {viewDataShow.describe}
                  </p>
                  <p className="text-gray-500 text-base leading-relaxed dark:text-gray-400 mb-2">
                    <h3 className="text-gray-900  text-1rem bt-2 font-semibold dark:text-white flex">
                      Status
                    </h3>
                    {viewDataShow.is_deleted === 1 ? "InActive" : "Active"}
                  </p>
                </div>
                <div className="modal-body"></div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
            <h3 className="font-semibold text-lg text-black">
              Customers Table
            </h3>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center justify-between mt-5">
          <div className="flex bg-gray-200 items-center p-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="bg-gray-200 outline-none  ml-1 block"
              type="text"
              name="search-name"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search Customer..."
            />
          </div>
        </div>
      </div>
      <div>
        <div className="-mx-4 sm:-mx-8 mb-1 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Post
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Description
                  </th>

                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-3 px-5 text-center border-b-2 bg-gray-100 text-gray-600 text-xs font-semibold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {h_customers &&
                  filteredData.map((data, index) => (
                    <tr key={index}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              className="w-full h-full rounded-full"
                              src={data.auth_img}
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {data.auth_name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {data.auth_post}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {truncateString(data.describe, 8)}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden
                            className={`absolute inset-0 ${
                              data.is_deleted === 1
                                ? "bg-orange-200"
                                : "bg-green-200"
                            } opacity-50 rounded-full`}
                          ></span>
                          <span className="relative">
                            {data.is_deleted === 1 ? "inActive" : "Active"}
                          </span>
                        </span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex item-center justify-center">
                          <a
                            onClick={() => {
                              view();
                              dispatch(view_data_show(data));
                            }}
                            className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </a>
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </div>
                          <div className="w-4 mr-2 cursor-pointer transform hover:text-purple-500 hover:scale-110">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              onClick={() => deletemodal(data)}
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
              {/* Pagination Component */}
              <nav aria-label="Page navigation">
                <ul className="inline-flex space-x-2">
                  <li>
                    <button
                      className="flex items-center cursor-pointer justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </li>
                  {/* Render Page Numbers */}
                  {Array.from({
                    length: Math.ceil(h_customers.length / itemsPerPage),
                  }).map((_, index) => (
                    <li key={index}>
                      <button
                        className={`w-10 h-10 transition-colors duration-150 rounded-full focus:shadow-outline ${
                          index + 1 === currentPage
                            ? "bg-indigo-600 text-white"
                            : ""
                        }`}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      className="flex items-center cursor-pointer justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={
                        currentPage ===
                        Math.ceil(h_customers.length / itemsPerPage)
                      }
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HappyCustomersTable;
