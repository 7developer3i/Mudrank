import { useContext, useEffect, useState } from "react";

import { InvestorTable } from "../investor-table/table";
import NavbarDashboard from "../navbar/navbar";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  fetchInvestorDataStart,
  fetchInvestorFailure,
  fetchInvestorSuccess,
} from "../../../feature/dashboard/investors/investorDataSlice";
import { BaseUrl } from "../../../apis/contant";
import { StartupDetails } from "../startup-page/details";
import { InvestorInvestments } from "../investment-table/table";
import { MainPageBlog } from "../blog-page/mainpage";
import { ChartPage } from "../charts/chart";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import Layout from "../../../test/navbar-admin/layout";
import AdminBody from "../../../test/navbar-admin/AdminBody";
import Customers from "../../../test/navbar-admin/Customers.js";
import Payment from "../../../test/navbar-admin/Payment.js";

import Companies from "../../../test/navbar-admin/utils/Companies.js";
import Account from "../../../test/navbar-admin/utils/sections/companies/Account.js";
import TopNav from "../../../test/navbar-admin/top-nav.js";
import SettingPage from "../../../test/navbar-admin/setting.js";
import kycDocument from "../../../test/navbar-admin/KycDocument.js";
import KycDocument from "../../../test/navbar-admin/KycDocument.js";
// import Bankdetails from "../../../test/navbar-admin/Bankdetails.js";
import BankDetails from "../../../test/navbar-admin/Bankdetails.js";
import Investor from "../../../test/navbar-admin/Investor.js";
import { Startupaddform } from "../../../test/navbar-admin/startup-addform.js";
import '../../../test/navbar-admin/admin.css'

export function Detailspage() {
  const { superadminrole } = useContext(AuthContext);
  console.log(superadminrole, "llkkkpppp");

  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const Authcontext = useContext(AuthContext);
  const { data } = Authcontext;
  console.log(data, "skhb.");

  const fetchInvestors = async () => {
    const token = Cookies.get("otp_verify");

    try {
      dispatch(fetchInvestorDataStart());
      const response = await axios.get(`${BaseUrl.url}auth/investor-profile`, {
        params: {
          token: token,
        },
      });
      if (response.status === 200) {
        setLoader(false);
        dispatch(fetchInvestorSuccess(response.data.result));
      }
    } catch (error) {
      setLoader(false);
      dispatch(fetchInvestorFailure(error.response.data.message));
    }
  };
  useEffect(() => {
    if (Cookies.get("admin_token")) {
      return;
    } else {
      navigate("/superadmin/login");
    }
    if (loader) {
      fetchInvestors();
    }
    return () => {
      fetchInvestors();
    };
  }, [loader]);
  useEffect(() => {
    if (window.location.pathname === "/admin/detail-page") {
      document.body.style.backgroundColor = "black";
    }
  }, []);
  return (
    <>
      <div style={{ display: "flex" }}>
        <Layout />
        {/* <div> */}
        {/* <TopNav /> */}
        {data == "Overview" && <AdminBody />}
        {data == "Website" && <MainPageBlog />}
        {data == "Customers" && <Customers />}
        {data == "Companies" && <Companies />}
        {/* {data == "Account" && <Account />} */}
        {data == "Settings" && <SettingPage />}
        {data == "Payment" && <Payment />}
        {data == "KycDocument" && <KycDocument />}
        {data === "Bankdetails" && <BankDetails />}
        {/* {superadminrole === "superadmin" && data === "Admin" && <Investor />} */}
        {data === "Admin" && <Investor />}
        {data === "Startupaddform" && <Startupaddform />}
        {/* </div> */}
      </div>
      {/* <NavbarDashboard setCurrentPage={setCurrentPage} />
            {currentPage === 1 && <InvestorTable setLoader={setLoader} loader={loader}/>}
            {currentPage === 2 && <StartupDetails/>}
            {currentPage === 3 && <ChartPage/>}
            {currentPage === 5 && <InvestorInvestments/>}
            {currentPage === 6 && <MainPageBlog/>} */}
    </>
  );
}
export default Detailspage;
