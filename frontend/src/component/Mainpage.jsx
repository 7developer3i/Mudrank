import React, { useEffect } from "react";
import Dashboard from "../dashboard/Dashboard";
import { useSelector } from "react-redux";
import { LoginMenu } from "../dashboard/LoginMenu";
import { ExplorePage } from "./homepage/Explore";
import { Portfolio } from "../dashboard/compaigns/Portfolio";
import InvestorProfilePage from "./investorprofile/investorProfile";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Mainpage = () => {
  const show = useSelector((state) => state.navbar_page);
  const navigate = useNavigate();

  const token = Cookies.get("varify_number_token");
  useEffect(() => {
    document.body.style.backgroundColor = "black";
    if (!token) {
      return navigate("/loginpage");
    }
  }, [token]);
  return (
    <div className="app">
      <LoginMenu />
      <div style={{ display: show.subscribe_page ? "" : "none" }}>
        <div className="center" style={{ display: "flex" }}>
          <Dashboard />
        </div>
      </div>
      <div style={{ display: show.explore_page ? "" : "none" }}>
        <ExplorePage />
      </div>
      <div style={{ display: show.portfolio_page ? "" : "none" }}>
        <Portfolio />
      </div>
      <div style={{ display: show.profile_page ? "" : "none" }}>
        <InvestorProfilePage />
      </div>
    </div>
  );
};

export default Mainpage;
