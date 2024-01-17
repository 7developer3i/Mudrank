import { useDispatch, useSelector } from "react-redux";
import { EditTable } from "./editModal";
import {
  enable_edit_modal,
  fetchInvestorDataStart,
  fetchInvestorSuccess,
} from "../../../feature/dashboard/investors/investorDataSlice";
import InvestorDeleteModal from "./deleteModal";
import { useEffect, useState } from "react";
import { fetchInvetsorData } from "../../../feature/investor/api";
import axios from "axios";

export const InvestorTable = ({ setLoader, loader }) => {
  const [modal, setModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const investors = useSelector(
    (state) => state.dashboardUserData.inevstorData
  );
  const editModal = useSelector((state) => state.dashboardUserData.editModal);

  const filteredInvestors =
    investors &&
    investors.filter((data) =>
      data.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:3002/auth/investor-profile`)
            dispatch(fetchInvestorSuccess(response.data.result));
            setLoader(false);
        } catch (error) {
            throw error
        }
    };
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      {modal && (
        <InvestorDeleteModal
          setModal={setModal}
          modal={modal}
          deleteIndex={deleteIndex}
        />
      )}
      <main className="container mx-auto p-4">
        {editModal && <EditTable />}
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <div className="mt-8 bg-white p-4 shadow rounded-lg">
            <h2 className="text-gray-500 text-lg font-semibold pb-4">
              Investor Details
            </h2>
            <div className="my-1"></div>
            <div
              className="p-4 flex"
              style={{ justifyContent: "space-between" }}
            >
              <label for="table-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1">
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="text"
                  id="table-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for items"
                />
              </div>
              <button
                onClick={() => {setLoader(true); fetchUserData()}}
                className="mx-5 middle none center rounded-lg bg-orange-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
              >
                <svg
                  style={{ display: loader ? "" : "none" }}
                  role="status"
                  class="inline h-8 w-8 animate-spin mr-2 text-gray-200 dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                Refresh
              </button>
            </div>
            <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    KYC verified
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {filteredInvestors &&
                  filteredInvestors.map((data, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div className="relative h-10 w-10">
                          <img
                            className="h-full w-full rounded-full object-cover object-center"
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                          <span
                            className={`absolute right-0 bottom-0 h-2 w-2 rounded-full bg-${
                              data.is_logged_out === 1 ? "red" : "green"
                            }-400 ring ring-white`}
                          ></span>
                        </div>
                        <div className="text-sm">
                          <div className="font-medium text-gray-700">
                            {data.full_name}
                          </div>
                          <div className="text-gray-400">{data.email}</div>
                        </div>
                      </th>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold ${
                            data.is_deleted === 1
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              data.is_deleted === 1
                                ? "bg-red-600"
                                : "bg-green-600"
                            }`}
                          ></span>
                          {data.is_deleted === 1 ? "inActive" : "Active"}
                        </span>
                      </td>
                      <td className="px-6 py-4">{data.phone_number}</td>
                      {/* <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                            {data.role}
                          </span>
                        </div>
                      </td> */}
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <span
                            style={{
                              color:
                                data.kyc_verified === 1 ? "green" : "orange",
                            }}
                            className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-green-600"
                          >
                            {data.kyc_verified === 1 ? "Valid" : "pending"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-4">
                          <a
                            x-data="{ tooltip: 'Delete' }"
                            onClick={() => {
                              setModal(!modal);
                              setDeleteIndex(data.id);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#FF0000 "
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
                              dispatch(enable_edit_modal());
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#00FF00"
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
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};
