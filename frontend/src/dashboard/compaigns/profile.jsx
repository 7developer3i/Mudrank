import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import RemoveCookie from "../../hook/removeCookie";

const InvestorProfile = () => {
  const authState = useContext(AuthContext);
  const { profile_card } = authState;

  const navigate = useNavigate();

  const Open_Investor_form = () => {
    navigate("/investorform");
  };

  const Log_out = () => {
    RemoveCookie("varify_number_token");
    navigate("/")
  }

  return (
    <>
      <div
        className="MuiPaper-root MuiMenu-paper MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 MuiPopover-paper css-199bktf"
        tabIndex="-1"
        style={{
          opacity: 1,

          transform: "none",
          transition:
            " opacity 252ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 168ms cubicBezier(0.4, 0, 0.2, 1) 0m",
          top: "75px",
          right: "0",
          position: "fixed",
          transformOrigin: "160px 0px",
          display: profile_card === true ? "" : "none",
          zIndex: "11",
        }}
      >
        <ul
          className="MuiList-root MuiList-padding MuiMenu-list css-r8u8y9"
          role="menu"
          tabIndex="-1"
        >
          <span
            className="MuiTypography-root MuiTypography-subtitle css-z6o6bh"
            tabIndex="0"
          >
            Deep Patel
          </span>
          <hr className="MuiDivider-root MuiDivider-fullWidth css-39bbo6" />
          <span
            onClick={Open_Investor_form}
            className="MuiTypography-root MuiTypography-subtitle css-1ax0m52"
          >
            Profile
          </span>
          <span onClick={Log_out} className="MuiTypography-root MuiTypography-subtitle css-vt5osi">
            Sign Out
          </span>
        </ul>
      </div>
    </>
  );
};

export default InvestorProfile;
