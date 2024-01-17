import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import what_banner from "../../images/what_banner.png";


const DealTerms = () => {
  const Startup_data = useSelector((state) => state.apiData.data);
  const view_index = useSelector((state) => state.viewPageData.view_index);

  const [convert_end_date, setConvert_End_date] = useState();
  const [convert_valuation_cap, setConvert_Valuation_Cap] = useState();
  const [convert_target, setConvert_Target] = useState();
  const [discount, setDiscount] = useState();

  //Convert end date into 1 may 2023

  useEffect(() => {
    if (Startup_data && view_index !== null) {
      const endDateStr = Startup_data.result[view_index].end_date;
      const date = new Date(endDateStr);

      // Adjust date to local time zone by adding time zone offset in minutes
      const timezoneOffset = date.getTimezoneOffset();
      date.setMinutes(date.getMinutes() - timezoneOffset);

      const day = date.getDate();
      const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
        date
      );
      const year = date.getFullYear();

      const formattedEndDate = `${day} ${month} ${year}`;
      setConvert_End_date(formattedEndDate);

      // Convert Valuetion_cap number
      const valuationCap = Startup_data.result[view_index].valuation_cap;
      const formattedValuationCap = valuationCap.toLocaleString("en-IN");
      setConvert_Valuation_Cap(formattedValuationCap);

      //Convert target number
      const target = Startup_data.result[view_index].target;
      const formattedTarget = target.toLocaleString("en-IN");
      setConvert_Target(formattedTarget);
      setDiscount(Startup_data.result[view_index].discount);
    }
  }, [Startup_data, view_index]);

  return (
    <>
      <section className="dealterms_sec mrg60">
        <div className="bcontainer">
          <div className="inner_container">
            <div className="inner_img backimg" style={{ backgroundImage: `url(${what_banner})` }} >
              <div className="sec_inner">

                <h5 className="sec_tt">Deal Terms</h5>

                <div className="terms_datas">

                  <div className="terms_item">
                    <div className="term_head">
                      <div className="term_head_inner">
                        <p className="term_sub_head ssl">
                          Type
                        </p>
                        <p className="term_main_head">
                          CSOP
                        </p>
                      </div>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_149_603)">
                          <path
                            d="M9 0C4.0374 0 0 4.03745 0 9.00005C0 13.9627 4.0374 18 9 18C13.9626 18 18 13.9627 18 9.00005C18 4.03745 13.9626 0 9 0ZM9 16.3636C4.93964 16.3636 1.63636 13.0604 1.63636 9.00005C1.63636 4.93975 4.93964 1.63636 9 1.63636C13.0604 1.63636 16.3636 4.93975 16.3636 9.00005C16.3636 13.0604 13.0603 16.3636 9 16.3636Z"
                            fill="#CECECE"
                          ></path>
                          <path
                            d="M8.9999 3.81812C8.39848 3.81812 7.90921 4.30772 7.90921 4.90952C7.90921 5.51077 8.39848 5.99993 8.9999 5.99993C9.60132 5.99993 10.0906 5.51077 10.0906 4.90952C10.0906 4.30772 9.60132 3.81812 8.9999 3.81812Z"
                            fill="#CECECE"
                          ></path>
                          <path
                            d="M9.00001 7.63647C8.54815 7.63647 8.18182 8.0028 8.18182 8.45466V13.3637C8.18182 13.8156 8.54815 14.1819 9.00001 14.1819C9.45186 14.1819 9.81819 13.8156 9.81819 13.3637V8.45466C9.81819 8.0028 9.45186 7.63647 9.00001 7.63647Z"
                            fill="#CECECE"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_149_603">
                            <rect width="18" height="18" fill="white"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div
                      className="term_desc"
                      style={{
                        minHeight: "0px",
                        height: "0px",
                        transitionDuration: "300ms",
                      }}
                    >
                      <div className="term_desc_inner">
                        <div className="">
                          <div className="">
                            <p className="">
                              CSOP is a contractual agreement executed between a
                              subscriber and the startup that entitles the subscriber to
                              community benefits and grant of SAR in exchange
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="terms_item">
                    <div className="term_head">
                      <div className="term_head_inner">
                        <p className="term_sub_head ssl">
                          Discount %
                        </p>
                        <p className="term_main_head">
                        {discount} %
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="terms_item">
                    <div className="term_head">
                      <div className="term_head_inner">
                        <p className="term_sub_head ssl">
                          Valuation Cap
                        </p>
                        <p className="term_main_head">
                        ₹{convert_valuation_cap}
                        </p>
                      </div>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_149_603)">
                          <path
                            d="M9 0C4.0374 0 0 4.03745 0 9.00005C0 13.9627 4.0374 18 9 18C13.9626 18 18 13.9627 18 9.00005C18 4.03745 13.9626 0 9 0ZM9 16.3636C4.93964 16.3636 1.63636 13.0604 1.63636 9.00005C1.63636 4.93975 4.93964 1.63636 9 1.63636C13.0604 1.63636 16.3636 4.93975 16.3636 9.00005C16.3636 13.0604 13.0603 16.3636 9 16.3636Z"
                            fill="#CECECE"
                          ></path>
                          <path
                            d="M8.9999 3.81812C8.39848 3.81812 7.90921 4.30772 7.90921 4.90952C7.90921 5.51077 8.39848 5.99993 8.9999 5.99993C9.60132 5.99993 10.0906 5.51077 10.0906 4.90952C10.0906 4.30772 9.60132 3.81812 8.9999 3.81812Z"
                            fill="#CECECE"
                          ></path>
                          <path
                            d="M9.00001 7.63647C8.54815 7.63647 8.18182 8.0028 8.18182 8.45466V13.3637C8.18182 13.8156 8.54815 14.1819 9.00001 14.1819C9.45186 14.1819 9.81819 13.8156 9.81819 13.3637V8.45466C9.81819 8.0028 9.45186 7.63647 9.00001 7.63647Z"
                            fill="#CECECE"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_149_603">
                            <rect width="18" height="18" fill="white"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div
                      className="term_desc"
                      style={{
                        minHeight: "0px",
                        height: "0px",
                        transitionDuration: "300ms",
                      }}
                    >
                      <div className="term_desc_inner">
                        <div className="">
                          <div className="">
                            <p className="">
                              A valuation cap is a maximum value that a company is
                              willing to accept for a round of financing or investment.
                              It is the highest price at which a company is willing to sell its equity to investors.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="terms_item">
                    <div className="term_head">
                      <div className="term_head_inner">
                        <p className="term_sub_head ssl">
                          Min Subscription
                        </p>
                        <p className="term_main_head">
                          ₹5,000
                        </p>
                      </div>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_149_603)">
                          <path
                            d="M9 0C4.0374 0 0 4.03745 0 9.00005C0 13.9627 4.0374 18 9 18C13.9626 18 18 13.9627 18 9.00005C18 4.03745 13.9626 0 9 0ZM9 16.3636C4.93964 16.3636 1.63636 13.0604 1.63636 9.00005C1.63636 4.93975 4.93964 1.63636 9 1.63636C13.0604 1.63636 16.3636 4.93975 16.3636 9.00005C16.3636 13.0604 13.0603 16.3636 9 16.3636Z"
                            fill="#CECECE"
                          ></path>
                          <path
                            d="M8.9999 3.81812C8.39848 3.81812 7.90921 4.30772 7.90921 4.90952C7.90921 5.51077 8.39848 5.99993 8.9999 5.99993C9.60132 5.99993 10.0906 5.51077 10.0906 4.90952C10.0906 4.30772 9.60132 3.81812 8.9999 3.81812Z"
                            fill="#CECECE"
                          ></path>
                          <path
                            d="M9.00001 7.63647C8.54815 7.63647 8.18182 8.0028 8.18182 8.45466V13.3637C8.18182 13.8156 8.54815 14.1819 9.00001 14.1819C9.45186 14.1819 9.81819 13.8156 9.81819 13.3637V8.45466C9.81819 8.0028 9.45186 7.63647 9.00001 7.63647Z"
                            fill="#CECECE"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_149_603">
                            <rect width="18" height="18" fill="white"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div
                      className="term_desc"
                      style={{
                        minHeight: "0px",
                        height: "0px",
                        transitionDuration: "300ms",
                      }}
                    >
                      <div className="term_desc_inner">
                        <div className="">
                          <div className="">
                            <div className="">
                              This is the minimum amount that can be subscribe in the current deal. 
                              Only amounts equal to or greater than this will be accepted
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="terms_item">
                    <div className="term_head">
                      <div className="term_head_inner">
                        <p className="term_sub_head ssl">
                        Target
                        </p>
                        <p className="term_main_head">
                        ₹{convert_target}
                        </p>
                      </div>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_149_603)">
                          <path
                            d="M9 0C4.0374 0 0 4.03745 0 9.00005C0 13.9627 4.0374 18 9 18C13.9626 18 18 13.9627 18 9.00005C18 4.03745 13.9626 0 9 0ZM9 16.3636C4.93964 16.3636 1.63636 13.0604 1.63636 9.00005C1.63636 4.93975 4.93964 1.63636 9 1.63636C13.0604 1.63636 16.3636 4.93975 16.3636 9.00005C16.3636 13.0604 13.0603 16.3636 9 16.3636Z"
                            fill="#CECECE"
                          ></path>
                          <path
                            d="M8.9999 3.81812C8.39848 3.81812 7.90921 4.30772 7.90921 4.90952C7.90921 5.51077 8.39848 5.99993 8.9999 5.99993C9.60132 5.99993 10.0906 5.51077 10.0906 4.90952C10.0906 4.30772 9.60132 3.81812 8.9999 3.81812Z"
                            fill="#CECECE"
                          ></path>
                          <path
                            d="M9.00001 7.63647C8.54815 7.63647 8.18182 8.0028 8.18182 8.45466V13.3637C8.18182 13.8156 8.54815 14.1819 9.00001 14.1819C9.45186 14.1819 9.81819 13.8156 9.81819 13.3637V8.45466C9.81819 8.0028 9.45186 7.63647 9.00001 7.63647Z"
                            fill="#CECECE"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_149_603">
                            <rect width="18" height="18" fill="white"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div
                      className="term_desc"
                      style={{
                        minHeight: "0px",
                        height: "0px",
                        transitionDuration: "300ms",
                      }}
                    >
                      <div className="term_desc_inner">
                        <div className="">
                          <div className="">
                            <p className="">
                            This is the amount a startup is looking to raise
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="terms_item">
                    <div className="term_head">
                      <div className="term_head_inner">
                        <p className="term_sub_head ssl">
                        End Date
                        </p>
                        <p className="term_main_head">
                        {convert_end_date}
                        </p>
                      </div>                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* <div className="MuiContainer-root MuiContainer-maxWidthLg css-1sot28n">
        <div className="css-5yufm6">
          <p className="MuiTypography-root MuiTypography-body2 css-1c9cja6">
            Deal terms
          </p>
          <div className="css-x9supo">
            <div className="css-69i1ev">
              <div className="css-1gicw9m">
                <span className="MuiTypography-root MuiTypography-caption css-1lqn0d2">
                  Type
                </span>
                <p className="MuiTypography-root MuiTypography-body2 css-37nqt7">
                  CSOP
                </p>
              </div>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_149_603)">
                  <path
                    d="M9 0C4.0374 0 0 4.03745 0 9.00005C0 13.9627 4.0374 18 9 18C13.9626 18 18 13.9627 18 9.00005C18 4.03745 13.9626 0 9 0ZM9 16.3636C4.93964 16.3636 1.63636 13.0604 1.63636 9.00005C1.63636 4.93975 4.93964 1.63636 9 1.63636C13.0604 1.63636 16.3636 4.93975 16.3636 9.00005C16.3636 13.0604 13.0603 16.3636 9 16.3636Z"
                    fill="#CECECE"
                  ></path>
                  <path
                    d="M8.9999 3.81812C8.39848 3.81812 7.90921 4.30772 7.90921 4.90952C7.90921 5.51077 8.39848 5.99993 8.9999 5.99993C9.60132 5.99993 10.0906 5.51077 10.0906 4.90952C10.0906 4.30772 9.60132 3.81812 8.9999 3.81812Z"
                    fill="#CECECE"
                  ></path>
                  <path
                    d="M9.00001 7.63647C8.54815 7.63647 8.18182 8.0028 8.18182 8.45466V13.3637C8.18182 13.8156 8.54815 14.1819 9.00001 14.1819C9.45186 14.1819 9.81819 13.8156 9.81819 13.3637V8.45466C9.81819 8.0028 9.45186 7.63647 9.00001 7.63647Z"
                    fill="#CECECE"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_149_603">
                    <rect width="18" height="18" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div
              className="MuiCollapse-root MuiCollapse-vertical MuiCollapse-hidden css-a0y2e3"
              style={{
                minHeight: "0px",
                height: "0px",
                transitionDuration: "300ms",
              }}
            >
              <div className="MuiCollapse-wrapper MuiCollapse-vertical css-hboir5">
                <div className="MuiCollapse-wrapperInner MuiCollapse-vertical css-8atqhb">
                  <div className="css-0">
                    <div className="MuiTypography-root MuiTypography-caption-sm css-1c98fmz">
                      CSOP is a contractual agreement executed between a
                      subscriber and the startup that entitles the subscriber to
                      community benefits and grant of SAR in exchange
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="css-x9supo">
            <div className="css-69i1ev">
              <div className="css-1gicw9m">
                <span className="MuiTypography-root MuiTypography-caption css-1lqn0d2">
                  Discount %
                </span>
                <p className="MuiTypography-root MuiTypography-body2 css-37nqt7">
                  {discount} %
                </p>
              </div>
            </div>
          </div>
          <div className="css-x9supo">
            <div className="css-69i1ev">
              <div className="css-1gicw9m">
                <span className="MuiTypography-root MuiTypography-caption css-1lqn0d2">
                  Valuation Cap
                </span>
                <p className="MuiTypography-root MuiTypography-body2 css-37nqt7">
                  ₹{convert_valuation_cap}
                </p>
              </div>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_149_603)">
                  <path
                    d="M9 0C4.0374 0 0 4.03745 0 9.00005C0 13.9627 4.0374 18 9 18C13.9626 18 18 13.9627 18 9.00005C18 4.03745 13.9626 0 9 0ZM9 16.3636C4.93964 16.3636 1.63636 13.0604 1.63636 9.00005C1.63636 4.93975 4.93964 1.63636 9 1.63636C13.0604 1.63636 16.3636 4.93975 16.3636 9.00005C16.3636 13.0604 13.0603 16.3636 9 16.3636Z"
                    fill="#CECECE"
                  ></path>
                  <path
                    d="M8.9999 3.81812C8.39848 3.81812 7.90921 4.30772 7.90921 4.90952C7.90921 5.51077 8.39848 5.99993 8.9999 5.99993C9.60132 5.99993 10.0906 5.51077 10.0906 4.90952C10.0906 4.30772 9.60132 3.81812 8.9999 3.81812Z"
                    fill="#CECECE"
                  ></path>
                  <path
                    d="M9.00001 7.63647C8.54815 7.63647 8.18182 8.0028 8.18182 8.45466V13.3637C8.18182 13.8156 8.54815 14.1819 9.00001 14.1819C9.45186 14.1819 9.81819 13.8156 9.81819 13.3637V8.45466C9.81819 8.0028 9.45186 7.63647 9.00001 7.63647Z"
                    fill="#CECECE"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_149_603">
                    <rect width="18" height="18" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div
              className="MuiCollapse-root MuiCollapse-vertical MuiCollapse-hidden css-a0y2e3"
              style={{ minHeight: "0px" }}
            >
              <div className="MuiCollapse-wrapper MuiCollapse-vertical css-hboir5">
                <div className="MuiCollapse-wrapperInner MuiCollapse-vertical css-8atqhb">
                  <div className="css-0">
                    <div className="MuiTypography-root MuiTypography-caption-sm css-1c98fmz">
                      A valuation cap is a maximum value that a company is
                      willing to accept for a round of financing or investment.
                      It is the highest price at which a company is willing to
                      sell its equity to investors.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="css-x9supo">
            <div className="css-69i1ev">
              <div className="css-1gicw9m">
                <span className="MuiTypography-root MuiTypography-caption css-1lqn0d2">
                  Min Subscription
                </span>
                <p className="MuiTypography-root MuiTypography-body2 css-37nqt7">
                  ₹5,000
                </p>
              </div>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_149_603)">
                  <path
                    d="M9 0C4.0374 0 0 4.03745 0 9.00005C0 13.9627 4.0374 18 9 18C13.9626 18 18 13.9627 18 9.00005C18 4.03745 13.9626 0 9 0ZM9 16.3636C4.93964 16.3636 1.63636 13.0604 1.63636 9.00005C1.63636 4.93975 4.93964 1.63636 9 1.63636C13.0604 1.63636 16.3636 4.93975 16.3636 9.00005C16.3636 13.0604 13.0603 16.3636 9 16.3636Z"
                    fill="#CECECE"
                  ></path>
                  <path
                    d="M8.9999 3.81812C8.39848 3.81812 7.90921 4.30772 7.90921 4.90952C7.90921 5.51077 8.39848 5.99993 8.9999 5.99993C9.60132 5.99993 10.0906 5.51077 10.0906 4.90952C10.0906 4.30772 9.60132 3.81812 8.9999 3.81812Z"
                    fill="#CECECE"
                  ></path>
                  <path
                    d="M9.00001 7.63647C8.54815 7.63647 8.18182 8.0028 8.18182 8.45466V13.3637C8.18182 13.8156 8.54815 14.1819 9.00001 14.1819C9.45186 14.1819 9.81819 13.8156 9.81819 13.3637V8.45466C9.81819 8.0028 9.45186 7.63647 9.00001 7.63647Z"
                    fill="#CECECE"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_149_603">
                    <rect width="18" height="18" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div
              className="MuiCollapse-root MuiCollapse-vertical MuiCollapse-hidden css-a0y2e3"
              style={{ minHeight: "0px" }}
            >
              <div className="MuiCollapse-wrapper MuiCollapse-vertical css-hboir5">
                <div className="MuiCollapse-wrapperInner MuiCollapse-vertical css-8atqhb">
                  <div className="css-0">
                    <div className="MuiTypography-root MuiTypography-caption-sm css-1c98fmz">
                      This is the minimum amount that can be subscribe in the
                      current deal. Only amounts equal to or greater than this
                      will be accepted
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="css-x9supo">
            <div className="css-69i1ev">
              <div className="css-1gicw9m">
                <span className="MuiTypography-root MuiTypography-caption css-1lqn0d2">
                  Target
                </span>
                <p className="MuiTypography-root MuiTypography-body2 css-37nqt7">
                  ₹{convert_target}
                </p>
              </div>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_149_603)">
                  <path
                    d="M9 0C4.0374 0 0 4.03745 0 9.00005C0 13.9627 4.0374 18 9 18C13.9626 18 18 13.9627 18 9.00005C18 4.03745 13.9626 0 9 0ZM9 16.3636C4.93964 16.3636 1.63636 13.0604 1.63636 9.00005C1.63636 4.93975 4.93964 1.63636 9 1.63636C13.0604 1.63636 16.3636 4.93975 16.3636 9.00005C16.3636 13.0604 13.0603 16.3636 9 16.3636Z"
                    fill="#CECECE"
                  ></path>
                  <path
                    d="M8.9999 3.81812C8.39848 3.81812 7.90921 4.30772 7.90921 4.90952C7.90921 5.51077 8.39848 5.99993 8.9999 5.99993C9.60132 5.99993 10.0906 5.51077 10.0906 4.90952C10.0906 4.30772 9.60132 3.81812 8.9999 3.81812Z"
                    fill="#CECECE"
                  ></path>
                  <path
                    d="M9.00001 7.63647C8.54815 7.63647 8.18182 8.0028 8.18182 8.45466V13.3637C8.18182 13.8156 8.54815 14.1819 9.00001 14.1819C9.45186 14.1819 9.81819 13.8156 9.81819 13.3637V8.45466C9.81819 8.0028 9.45186 7.63647 9.00001 7.63647Z"
                    fill="#CECECE"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_149_603">
                    <rect width="18" height="18" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div
              className="MuiCollapse-root MuiCollapse-vertical MuiCollapse-hidden css-a0y2e3"
              style={{ minHeight: "0px" }}
            >
              <div className="MuiCollapse-wrapper MuiCollapse-vertical css-hboir5">
                <div className="MuiCollapse-wrapperInner MuiCollapse-vertical css-8atqhb">
                  <div className="css-0">
                    <div className="MuiTypography-root MuiTypography-caption-sm css-1c98fmz">
                      This is the amount a startup is looking to raise
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="css-x9supo">
            <div className="css-69i1ev">
              <div className="css-1gicw9m">
                <span className="MuiTypography-root MuiTypography-caption css-1lqn0d2">
                  End Date
                </span>
                <p className="MuiTypography-root MuiTypography-body2 css-37nqt7">
                  {convert_end_date}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}


    </>
  );
};

export default DealTerms;
