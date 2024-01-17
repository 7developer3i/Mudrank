import mudrank from "../images/Mudrank.svg";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { show_page } from "../feature/navbaraction/navbarSlice";
import { useNavigate } from "react-router-dom";
import RemoveCookie from "../hook/removeCookie";
import axios from "axios";
import { fetchDataSuccess } from "../feature/investor-profile/fetchProfileData";
import { BaseUrl } from "../apis/contant";

export function LoginMenu() {

  const Investor_data = useSelector((state) => state.fetch_investor_data.data);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Open_Investor_form = () => {
    navigate("/investorform");
  };

  const Log_out = async () => {
    if (Investor_data) { 
      try {
        const response = await axios.post(`${BaseUrl.url}investor/logout`, {
          phone_number: Investor_data.phone_number,
          email: ""
        });
        if (response.data.success) {
          RemoveCookie("varify_number_token");
          navigate("/");
        };
      } catch (error) {
        throw error
      };
    } else {
    }
  };

  const fetchInvestorProfileData = async () => {
    if (Investor_data) {
      try {
        const response = await axios.get(`http://localhost:3002/investor/profile/${Investor_data.id}`);
        dispatch(fetchDataSuccess(response.data.profileData));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const profilePageData = () => {
    fetchInvestorProfileData();
    dispatch(show_page("profile"));
  };

  return (
    <>
      <header className="header login_menu">
        <div className="container bcontainer">
          <div className="wrapper inner_container">
            <div className="header-item-left">
              <div className="logo">
                <a href="/">
                  <div
                    className="backimg"
                    style={{ backgroundImage: `url(${mudrank})` }}
                  >
                    <svg
                      className="transparent_svg"
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 175 36"
                    >
                      <rect
                        className="cls-1"
                        x="0.5"
                        y="0.5"
                        width="174"
                        height="35"
                      ></rect>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
            {/* <!-- Section: Navbar Menu --> */}
            <div className="header-item-center">
              <div className="overlay"></div>
              <nav className="menu">
                <div className="menu-mobile-header">
                  <button type="button" className="menu-mobile-arrow">
                    <i className="ion ion-ios-arrow-back"></i>
                  </button>
                  <div className="menu-mobile-title"></div>
                  <button type="button" className="menu-mobile-close">
                    <i className="ion ion-ios-close"></i>
                  </button>
                </div>
                <ul className="menu-section">
                  <li>
                    <a onClick={() => dispatch(show_page("explore"))}>
                      Explore
                    </a>
                  </li>
                  <li>
                    <a onClick={() => dispatch(show_page("subscribe"))}>
                      Subscribe
                    </a>
                  </li>
                  <li>
                    <a onClick={() => dispatch(show_page("portfolio"))}>Portfolio</a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="header-item-right">
              <a onClick={Log_out}>Logout</a>
              {/* <a className="button wbg" onClick={Open_Investor_form} > */}
              <a className="button wbg" onClick={() => profilePageData()}
              >
                AB
              </a>
              <button type="button" className="menu-mobile-trigger">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
