import axios from "axios";
import { BaseUrl } from "../../../apis/contant";
import { Colors } from "chart.js";
import Cookies from "js-cookie";

const InvestorDeleteModal = ({ modal, setModal, deleteIndex }) => {
  const token = Cookies.get("otp_verify");
  const deleteInvestorApi = async () => {
    try {
      const response = await axios.delete(
        `${BaseUrl.url}auth/investors/${deleteIndex}`,
        {
          params: {
            token: token,
          },
        }
      );
      if (response.status === 200) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="antialiased font-medium text-gray-800 bg-black"
      style={{ position: "absolute", left: "40%" }}
    >
      <div
        className="max-w-sm p-2 mx-auto border-[1px] border-gray-200 shadow rounded-xl hover:shadow-lg transition-all duration-150 ease-linear"
        style={{
          display: modal ? "block" : "none",
          transition: "opacity 300ms ease-in-out, transform 1s ease-in-out",
          opacity: modal ? 1 : 0,
          transform: modal ? "scale(1)" : "scale(0.9)",
        }}
      >
        <div className="relative p-6">
          <a
            onClick={() => setModal(!modal)}
            className="absolute top-1.5 right-1.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 cursor-pointer fill-current text-slate-500 hover:text-slate-900"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </a>
          <h1 className="text-3xl font-bold text-white">Delete investor</h1>
          <p className="text-sm text-white">
            Are you sure you want to delete this investor?
          </p>
          <div className="flex flex-row mt-6 space-x-2 justify-evenly">
            <a
              onClick={() => {
                deleteInvestorApi();
                setModal(!modal);
              }}
              className="w-full py-3 text-sm font-medium text-center text-white transition duration-150 ease-linear bg-red-600 border border-red-600 rounded-lg hover:bg-red-500"
            >
              Delete
            </a>
            <a
              onClick={() => setModal(!modal)}
              className="w-full py-3 text-sm text-center transition duration-150 ease-linear bg-white border border-gray-200 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorDeleteModal;
