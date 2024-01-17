import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchDataFailure, fetchDataStart, fetchDataSuccess } from "../../../feature/dashboard/investments/investmenstSlice";
import axios from "axios";
import { BaseUrl } from "../../../apis/contant";
import Cookies from "js-cookie";
import AuthContext from "../../../context/AuthContext";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const renderPageNumbers = () => {
        const pageNumbers = [];
        
        // Calculate the range of page numbers to display
        const pageRange = 3; // Number of page numbers to show on each side of the current page
        
        let startPage = Math.max(1, currentPage - pageRange);
        let endPage = Math.min(totalPages, currentPage + pageRange);
        
        if (startPage > 1) {
          pageNumbers.push(
            <a
              key={1}
              href="#"
              className={`px-2 py-1 text-sm rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800`}
              onClick={() => onPageChange(1)}
            >
              {1}
            </a>
          );
          if (startPage > 2) {
            pageNumbers.push(
              <a
                key="ellipsis-start"
                href="#"
                className={`px-2 py-1 text-sm rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800`}
              >
                ...
              </a>
            );
          }
        }
        
        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(
            <a
              key={i}
              href="#"
              className={`px-2 py-1 text-sm rounded-md ${
                currentPage === i
                  ? 'text-blue-500 bg-blue-100/60'
                  : 'text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
              onClick={() => onPageChange(i)}
            >
              {i}
            </a>
          );
        }
        
        if (endPage < totalPages) {
          if (endPage < totalPages - 1) {
            pageNumbers.push(
              <a
                key="ellipsis-end"
                href="#"
                className={`px-2 py-1 text-sm rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800`}
              >
                ...
              </a>
            );
          }
          pageNumbers.push(
            <a
              key={totalPages}
              href="#"
              className={`px-2 py-1 text-sm rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800`}
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </a>
          );
        }
        
        return pageNumbers;
      };
    return (
        <div className="flex items-center justify-between mt-6">
            {/* Previous Page */}
            <a
                href="#"
                className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                </svg>
                <span>Previous</span>
            </a>

            {/* Page Numbers */}
            <div className="items-center hidden md:flex gap-x-3">{renderPageNumbers()}</div>

            {/* Next Page */}
            <a
                href="#"
                className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <span>Next</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
            </a>
        </div>
    );
};

export const InvestorInvestments = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 13;

    const dispatch = useDispatch();
    const { adminid } = useContext(AuthContext);
    const InvestmentDetails = useSelector((state) => state.dashboardInvestments.data);

    useEffect(() => {
        const fetchInvestmentDetails = async () => {
            const token = Cookies.get("admin_token");
            try {
                dispatch(fetchDataStart());
                const response = await axios.get(`${BaseUrl.url}auth/investments/details?token=${token}&adminid=${adminid}`);
                if (response.data.success === true) {
                    dispatch(fetchDataSuccess(response.data.result));
                }
            } catch (error) {
                console.log(error);
                dispatch(fetchDataFailure(error.response.data.message));
            }
        }
        return () => fetchInvestmentDetails();
    }, []);

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };

    const handlePageChange = async (pageNumber) => {
        const token = Cookies.get("otp_verify")
        setCurrentPage(pageNumber);
        try {
            const response = await axios.get(`${BaseUrl.url}auth/investments?token=${token}&page=${pageNumber}`);
            if (response.data.success === true) {
                dispatch(fetchDataSuccess(response.data.data));
            } else {
                dispatch(fetchDataSuccess(response.data.data));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="container px-4 mx-auto my-10">
            <div className="flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-x-3">
                                                <button className="flex items-center gap-x-2">
                                                    <span>Index</span>
                                                </button>
                                            </div>
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Date
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Status
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Investor
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Company
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Amount
                                        </th>

                                        <th scope="col" className="relative py-3.5 px-4">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    {InvestmentDetails && InvestmentDetails.map((datas, index) =>
                                        <tr key={index}>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                <div className="inline-flex items-center gap-x-3">
                                                    <span>#{datas.id}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{formatDate(datas.investment_date)}</td>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <div className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${datas.status === 'Booked' ? 'text-emerald-500' : 'text-red-500'} ${datas.status === 'Booked' ? 'bg-emerald-100/60' : 'bg-red-100/60'} dark:bg-gray-800`}>
                                                    {datas.status === 'Booked' ? <> <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                        <h2 className="text-sm text-black font-normal">Paid</h2></> : <>
                                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                        <h2 class="text-sm font-normal text-black">Cancelled</h2>
                                                    </>}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                <div className="flex items-center gap-x-2">
                                                    <img className="object-cover w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
                                                    <div>
                                                        <h2 className="text-sm font-medium text-gray-800 dark:text-white ">{datas.full_name}</h2>
                                                        <p className="text-xs font-normal text-gray-600 dark:text-gray-400">{datas.phone_number}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                <div className="flex items-center gap-x-2">
                                                    <img className="object-cover w-8 h-8 rounded-full" src={datas.img_url} alt="" />
                                                    <div>
                                                        <h2 className="text-sm font-medium text-gray-800 dark:text-white ">{datas.company_name}</h2>
                                                        <p className="text-xs font-normal text-gray-600 dark:text-gray-400">{datas.company_email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{datas.amount}</td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div className="flex items-center gap-x-6">
                                                    <button className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
                                                        Archive
                                                    </button>

                                                    <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                                        Download
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pagination */}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </section>
    )
}