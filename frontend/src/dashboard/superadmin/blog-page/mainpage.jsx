import React, { useState } from "react";
import AddBlogs from "./addDetails";
import BlogTable from "./details";
import { PrivacyTable } from "../privacy-page/table";
import { CompletedstartupTable } from "../../completedstartup_page/Table";
import { BrowseTable } from "../../browse-topic/table";
import { FaqTable } from "../../faqsection/Table";
import { FrequentlyAskedTable } from "../../frequentlyasked/table";
import { FooterTable } from "../FooterTable/Table.jsx";
import { AboutTable } from "../../aboutpage/Table";
import { Fundraisingtable } from "../../fundraising_page/Table";
// import MudrankAbout from "../../mudrankabout/about.jsx";
// import { Mudrankmission } from "../../mudrankmission/mission.jsx";
import { CuredTable } from "../../curedData/table.jsx";
import HappyCustomerPage from "../happy-customer/addDetails.jsx";
import HappyCustomersTable from "../happy-customer/details.jsx";

export const MainPageBlog = () => {
  const [activeComponent, setActiveComponent] = useState('hcustomer');

  return (
    <>
      <div>
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
              style={{ margin: "0 auto" }}
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <a
                    href="#"
                    className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent whitecolor ${
                    activeComponent === "hcustomer" ? "active-link" : ""
                  }`}
                    onClick={() => setActiveComponent("hcustomer")}
                  >
                    Happy Customer
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`whitecolor block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${
                    activeComponent === "BlogTable" ? "active-link" : ""
                  }`}

                    onClick={() => setActiveComponent("BlogTable")}
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`whitecolor block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${activeComponent ==="PrivacyTable" ? "active-link":""}`}
                    onClick={() => setActiveComponent("PrivacyTable")}
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`whitecolor block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${activeComponent ==="AboutTable" ? "active-link":""}`}
                    onClick={() => setActiveComponent("AboutTable")}
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`whitecolor block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${activeComponent ==="CompletedstartupTable" ? "active-link":""}`}
                    onClick={() => setActiveComponent("CompletedstartupTable")}
                  >
                    Completed Startup
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`whitecolor whitecolor block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${activeComponent === "Fundraisingtable" ? "active-link":""}`}
                    onClick={() => setActiveComponent("Fundraisingtable")}
                  >
                    Fundraising
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`whitecolor block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${activeComponent === "BrowseTable" ? "active-link":""}`}
                    onClick={() => setActiveComponent("BrowseTable")}
                  >
                    Browse
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`whitecolor block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${activeComponent === "FaqTable" ? "active-link":""}`}
                    onClick={() => setActiveComponent("FaqTable")}
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`whitecolor block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${activeComponent === "FrequentlyAskedTable" ? "active-link":""}`}
                    onClick={() => setActiveComponent("FrequentlyAskedTable")}
                  >
                    Frequently Asked
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`whitecolor block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${activeComponent === "FooterTable" ? "active-link":""}`}
                    onClick={() => setActiveComponent("FooterTable")}
                  >
                    Footer
                  </a>
                </li>

                {/* <li>
                  <a
                    href="#"
                    className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${activeComponent === "MudrankAbout" ? "active-link":""}`}
                    onClick={() => setActiveComponent("MudrankAbout")}
                  >
                    MudrankAbout
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${activeComponent === "MudrankMission" ? "active-link":""}`}
                    onClick={() => setActiveComponent("MudrankMission")}
                  >
                    MudrankMission
                  </a>
                </li> */}

                <li>
                  <a
                    href="#"
                    className={`whitecolor block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${activeComponent === "curedData" ? "active-link":""}`}
                    onClick={() => setActiveComponent("curedData")}
                  >
                    curedData
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div classNameName="content">
          {activeComponent === "hcustomer" &&<> <HappyCustomerPage/> <HappyCustomersTable/> </> }
          {activeComponent === "BlogTable" &&<> <AddBlogs /> <BlogTable /></>}
          {activeComponent === "PrivacyTable" && <PrivacyTable />}
          {activeComponent === "AboutTable" && <AboutTable />}
          {activeComponent === "CompletedstartupTable" && (
            <CompletedstartupTable />
          )}
          {activeComponent === "Fundraisingtable" && <Fundraisingtable />}
          {activeComponent === "BrowseTable" && <BrowseTable />}
          {activeComponent === "FaqTable" && <FaqTable />}
          {activeComponent === "FrequentlyAskedTable" && (
            <FrequentlyAskedTable />
          )}
          {activeComponent === "FooterTable" && <FooterTable />}
          {/* {activeComponent === "MudrankAbout" && <MudrankAbout/>}
          {activeComponent ==="MudrankMission" && <Mudrankmission/>} */}
          {activeComponent ==="curedData" && <CuredTable/>}

        </div>
      </div>
    </>
  );
};
