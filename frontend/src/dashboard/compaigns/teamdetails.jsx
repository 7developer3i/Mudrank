import React, { useState, useRef } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import team from "../../images/team.jpg"



const TeamDetails = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    switch (e.target.id) {
      case "first":
        document.getElementById("targetfirst").classList.add("visible")
        break;
      case "two":
        document.getElementById("targettwo").classList.add("visible")
        break;
      case "three":
        document.getElementById("targetthree").classList.add("visible")
        break
      default:
        break
    }
  };

  const handleMouseLeave = (e) => {
    setIsHovered(false);
    document.getElementById("targetfirst").classList.remove("visible")
    document.getElementById("targetthree").classList.remove("visible")
    document.getElementById("targettwo").classList.remove("visible")
  };

  return (
    <>
      <section className="meet_team_sec mrg60">
        <div className="bcontainer">
          <div className="inner_container">
            <div className="sec_inner">
              <h5 className="sec_tt">Meet the Team</h5>

              <div className="team_lists">
                <div className="team_inner">

                  <Swiper className="bslider" pagination={true} modules={[Pagination]}
                    spaceBetween={50}
                    slidesPerView={3}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                  >
                    <SwiperSlide>
                      <div className="member_item" onMouseLeave={handleMouseLeave}
                        onMouseEnter={handleMouseEnter}
                        id="first">

                        <div className="member_img">
                          <div
                            className="backimg"
                            style={{ backgroundImage: `url(${team})` }}
                          >
                            <svg
                              className="transparent_svg"
                              data-name="Layer 1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 251 251"
                            >
                              <rect
                                className="cls-1"
                                x="0.5"
                                y="0.5"
                                width="250"
                                height="250"
                              ></rect>
                            </svg>
                          </div>
                        </div>
                        <div className="member_info">
                          <p className="member_tt">
                            Lorem Dolor
                          </p>
                          <p className="member_pos sml">
                            Founder
                          </p>
                        </div>
                        <div className={`member_ovr`} id="targetfirst">
                          <div className="member_ovr_inner">
                            <p className="member_tt">
                              Lorem Dolor
                            </p>
                            <p className="member_pos sml ">
                              Founder
                            </p>
                            <div className="">
                              <p className="member_degree sml">
                                PGDM (Marketing), B.Tech (IT),Ex- SABMiller
                                India, Ex TOI Group
                              </p>
                            </div>
                            <div className="linkedin_icn">
                              <a
                                href="#"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <div className="">
                                  <svg
                                    className="svg"
                                    focusable="false"
                                    aria-hidden="true"
                                    viewBox="0 0 16 14"
                                    width="16"
                                    height="14"
                                    fill="none"
                                  >
                                    <path
                                      d="M14.7766 0H1.90789C1.29144 0 0.792969 0.451172 0.792969 1.00898V12.9883C0.792969 13.5461 1.29144 14 1.90789 14H14.7766C15.3931 14 15.8945 13.5461 15.8945 12.991V1.00898C15.8945 0.451172 15.3931 0 14.7766 0ZM5.27328 11.9301H3.03165V5.24726H5.27328V11.9301ZM4.15247 4.33672C3.43279 4.33672 2.85173 3.79805 2.85173 3.13359C2.85173 2.46914 3.43279 1.93047 4.15247 1.93047C4.8692 1.93047 5.45025 2.46914 5.45025 3.13359C5.45025 3.79531 4.8692 4.33672 4.15247 4.33672ZM13.6617 11.9301H11.423V8.68164C11.423 7.90781 11.4083 6.90977 10.258 6.90977C9.09291 6.90977 8.91594 7.75469 8.91594 8.62695V11.9301H6.6802V5.24726H8.82745V6.16055H8.85695C9.15485 5.63555 9.88633 5.08047 10.9747 5.08047C13.2429 5.08047 13.6617 6.46406 13.6617 8.26328V11.9301Z"
                                      fill="white"
                                    ></path>
                                  </svg>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>


                      </div>
                    </SwiperSlide>

                    <SwiperSlide>
                      <div className="member_item"
                        onMouseLeave={handleMouseLeave}
                        onMouseEnter={handleMouseEnter}
                        id="two">

                        <div className="member_img">
                          <div
                            className="backimg"
                            style={{ backgroundImage: `url(${team})` }}
                          >
                            <svg
                              className="transparent_svg"
                              data-name="Layer 1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 251 251"
                            >
                              <rect
                                className="cls-1"
                                x="0.5"
                                y="0.5"
                                width="250"
                                height="250"
                              ></rect>
                            </svg>
                          </div>
                        </div>
                        <div className="member_info">
                          <p className="member_tt">
                            Lorem Dolor
                          </p>
                          <p className="member_pos sml">
                            Founder
                          </p>
                        </div>
                        <div className={`member_ovr`} id="targettwo">
                          <div className="member_ovr_inner">
                            <p className="member_tt">
                              Lorem Dolor
                            </p>
                            <p className="member_pos sml ">
                              Founder
                            </p>
                            <div className="">
                              <p className="member_degree sml">
                                PGDM (Marketing), B.Tech (IT),Ex- SABMiller
                                India, Ex TOI Group
                              </p>
                            </div>
                            <div className="linkedin_icn">
                              <a
                                href="#"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <div className="">
                                  <svg
                                    className="svg"
                                    focusable="false"
                                    aria-hidden="true"
                                    viewBox="0 0 16 14"
                                    width="16"
                                    height="14"
                                    fill="none"
                                  >
                                    <path
                                      d="M14.7766 0H1.90789C1.29144 0 0.792969 0.451172 0.792969 1.00898V12.9883C0.792969 13.5461 1.29144 14 1.90789 14H14.7766C15.3931 14 15.8945 13.5461 15.8945 12.991V1.00898C15.8945 0.451172 15.3931 0 14.7766 0ZM5.27328 11.9301H3.03165V5.24726H5.27328V11.9301ZM4.15247 4.33672C3.43279 4.33672 2.85173 3.79805 2.85173 3.13359C2.85173 2.46914 3.43279 1.93047 4.15247 1.93047C4.8692 1.93047 5.45025 2.46914 5.45025 3.13359C5.45025 3.79531 4.8692 4.33672 4.15247 4.33672ZM13.6617 11.9301H11.423V8.68164C11.423 7.90781 11.4083 6.90977 10.258 6.90977C9.09291 6.90977 8.91594 7.75469 8.91594 8.62695V11.9301H6.6802V5.24726H8.82745V6.16055H8.85695C9.15485 5.63555 9.88633 5.08047 10.9747 5.08047C13.2429 5.08047 13.6617 6.46406 13.6617 8.26328V11.9301Z"
                                      fill="white"
                                    ></path>
                                  </svg>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>


                      </div>
                    </SwiperSlide>

                    <SwiperSlide>
                      <div className="member_item" onMouseLeave={handleMouseLeave}
                        onMouseEnter={handleMouseEnter}
                        id="three">

                        <div className="member_img">
                          <div
                            className="backimg"
                            style={{ backgroundImage: `url(${team})` }}
                          >
                            <svg
                              className="transparent_svg"
                              data-name="Layer 1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 251 251"
                            >
                              <rect
                                className="cls-1"
                                x="0.5"
                                y="0.5"
                                width="250"
                                height="250"
                              ></rect>
                            </svg>
                          </div>
                        </div>
                        <div className="member_info">
                          <p className="member_tt">
                            Lorem Dolor
                          </p>
                          <p className="member_pos sml">
                            Founder
                          </p>
                        </div>
                        <div className={`member_ovr`} id="targetthree">
                          <div className="member_ovr_inner">
                            <p className="member_tt">
                              Lorem Dolor
                            </p>
                            <p className="member_pos sml ">
                              Founder
                            </p>
                            <div className="">
                              <p className="member_degree sml">
                                PGDM (Marketing), B.Tech (IT),Ex- SABMiller
                                India, Ex TOI Group
                              </p>
                            </div>
                            <div className="linkedin_icn">
                              <a
                                href="#"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <div className="">
                                  <svg
                                    className="svg"
                                    focusable="false"
                                    aria-hidden="true"
                                    viewBox="0 0 16 14"
                                    width="16"
                                    height="14"
                                    fill="none"
                                  >
                                    <path
                                      d="M14.7766 0H1.90789C1.29144 0 0.792969 0.451172 0.792969 1.00898V12.9883C0.792969 13.5461 1.29144 14 1.90789 14H14.7766C15.3931 14 15.8945 13.5461 15.8945 12.991V1.00898C15.8945 0.451172 15.3931 0 14.7766 0ZM5.27328 11.9301H3.03165V5.24726H5.27328V11.9301ZM4.15247 4.33672C3.43279 4.33672 2.85173 3.79805 2.85173 3.13359C2.85173 2.46914 3.43279 1.93047 4.15247 1.93047C4.8692 1.93047 5.45025 2.46914 5.45025 3.13359C5.45025 3.79531 4.8692 4.33672 4.15247 4.33672ZM13.6617 11.9301H11.423V8.68164C11.423 7.90781 11.4083 6.90977 10.258 6.90977C9.09291 6.90977 8.91594 7.75469 8.91594 8.62695V11.9301H6.6802V5.24726H8.82745V6.16055H8.85695C9.15485 5.63555 9.88633 5.08047 10.9747 5.08047C13.2429 5.08047 13.6617 6.46406 13.6617 8.26328V11.9301Z"
                                      fill="white"
                                    ></path>
                                  </svg>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>


                      </div>
                    </SwiperSlide>

                    <SwiperSlide>
                      <div className="member_item" onMouseLeave={handleMouseLeave}
                        onMouseEnter={handleMouseEnter}
                        id="three">

                        <div className="member_img">
                          <div
                            className="backimg"
                            style={{ backgroundImage: `url(${team})` }}
                          >
                            <svg
                              className="transparent_svg"
                              data-name="Layer 1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 251 251"
                            >
                              <rect
                                className="cls-1"
                                x="0.5"
                                y="0.5"
                                width="250"
                                height="250"
                              ></rect>
                            </svg>
                          </div>
                        </div>
                        <div className="member_info">
                          <p className="member_tt">
                            Lorem Dolor
                          </p>
                          <p className="member_pos sml">
                            Founder
                          </p>
                        </div>
                        <div className={`member_ovr`} id="targetthree">
                          <div className="member_ovr_inner">
                            <p className="member_tt">
                              Lorem Dolor
                            </p>
                            <p className="member_pos sml ">
                              Founder
                            </p>
                            <div className="">
                              <p className="member_degree sml">
                                PGDM (Marketing), B.Tech (IT),Ex- SABMiller
                                India, Ex TOI Group
                              </p>
                            </div>
                            <div className="linkedin_icn">
                              <a
                                href="#"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <div className="">
                                  <svg
                                    className="svg"
                                    focusable="false"
                                    aria-hidden="true"
                                    viewBox="0 0 16 14"
                                    width="16"
                                    height="14"
                                    fill="none"
                                  >
                                    <path
                                      d="M14.7766 0H1.90789C1.29144 0 0.792969 0.451172 0.792969 1.00898V12.9883C0.792969 13.5461 1.29144 14 1.90789 14H14.7766C15.3931 14 15.8945 13.5461 15.8945 12.991V1.00898C15.8945 0.451172 15.3931 0 14.7766 0ZM5.27328 11.9301H3.03165V5.24726H5.27328V11.9301ZM4.15247 4.33672C3.43279 4.33672 2.85173 3.79805 2.85173 3.13359C2.85173 2.46914 3.43279 1.93047 4.15247 1.93047C4.8692 1.93047 5.45025 2.46914 5.45025 3.13359C5.45025 3.79531 4.8692 4.33672 4.15247 4.33672ZM13.6617 11.9301H11.423V8.68164C11.423 7.90781 11.4083 6.90977 10.258 6.90977C9.09291 6.90977 8.91594 7.75469 8.91594 8.62695V11.9301H6.6802V5.24726H8.82745V6.16055H8.85695C9.15485 5.63555 9.88633 5.08047 10.9747 5.08047C13.2429 5.08047 13.6617 6.46406 13.6617 8.26328V11.9301Z"
                                      fill="white"
                                    ></path>
                                  </svg>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>


                      </div>
                    </SwiperSlide>

                    <SwiperSlide>
                      <div className="member_item" onMouseLeave={handleMouseLeave}
                        onMouseEnter={handleMouseEnter}
                        id="three">

                        <div className="member_img">
                          <div
                            className="backimg"
                            style={{ backgroundImage: `url(${team})` }}
                          >
                            <svg
                              className="transparent_svg"
                              data-name="Layer 1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 251 251"
                            >
                              <rect
                                className="cls-1"
                                x="0.5"
                                y="0.5"
                                width="250"
                                height="250"
                              ></rect>
                            </svg>
                          </div>
                        </div>
                        <div className="member_info">
                          <p className="member_tt">
                            Lorem Dolor
                          </p>
                          <p className="member_pos sml">
                            Founder
                          </p>
                        </div>
                        <div className={`member_ovr`} id="targetthree">
                          <div className="member_ovr_inner">
                            <p className="member_tt">
                              Lorem Dolor
                            </p>
                            <p className="member_pos sml ">
                              Founder
                            </p>
                            <div className="">
                              <p className="member_degree sml">
                                PGDM (Marketing), B.Tech (IT),Ex- SABMiller
                                India, Ex TOI Group
                              </p>
                            </div>
                            <div className="linkedin_icn">
                              <a
                                href="#"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <div className="">
                                  <svg
                                    className="svg"
                                    focusable="false"
                                    aria-hidden="true"
                                    viewBox="0 0 16 14"
                                    width="16"
                                    height="14"
                                    fill="none"
                                  >
                                    <path
                                      d="M14.7766 0H1.90789C1.29144 0 0.792969 0.451172 0.792969 1.00898V12.9883C0.792969 13.5461 1.29144 14 1.90789 14H14.7766C15.3931 14 15.8945 13.5461 15.8945 12.991V1.00898C15.8945 0.451172 15.3931 0 14.7766 0ZM5.27328 11.9301H3.03165V5.24726H5.27328V11.9301ZM4.15247 4.33672C3.43279 4.33672 2.85173 3.79805 2.85173 3.13359C2.85173 2.46914 3.43279 1.93047 4.15247 1.93047C4.8692 1.93047 5.45025 2.46914 5.45025 3.13359C5.45025 3.79531 4.8692 4.33672 4.15247 4.33672ZM13.6617 11.9301H11.423V8.68164C11.423 7.90781 11.4083 6.90977 10.258 6.90977C9.09291 6.90977 8.91594 7.75469 8.91594 8.62695V11.9301H6.6802V5.24726H8.82745V6.16055H8.85695C9.15485 5.63555 9.88633 5.08047 10.9747 5.08047C13.2429 5.08047 13.6617 6.46406 13.6617 8.26328V11.9301Z"
                                      fill="white"
                                    ></path>
                                  </svg>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>


                      </div>
                    </SwiperSlide>

                    <SwiperSlide>
                      <div className="member_item" onMouseLeave={handleMouseLeave}
                        onMouseEnter={handleMouseEnter}
                        id="three">

                        <div className="member_img">
                          <div
                            className="backimg"
                            style={{ backgroundImage: `url(${team})` }}
                          >
                            <svg
                              className="transparent_svg"
                              data-name="Layer 1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 251 251"
                            >
                              <rect
                                className="cls-1"
                                x="0.5"
                                y="0.5"
                                width="250"
                                height="250"
                              ></rect>
                            </svg>
                          </div>
                        </div>
                        <div className="member_info">
                          <p className="member_tt">
                            Lorem Dolor
                          </p>
                          <p className="member_pos sml">
                            Founder
                          </p>
                        </div>
                        <div className={`member_ovr`} id="targetthree">
                          <div className="member_ovr_inner">
                            <p className="member_tt">
                              Lorem Dolor
                            </p>
                            <p className="member_pos sml ">
                              Founder
                            </p>
                            <div className="">
                              <p className="member_degree sml">
                                PGDM (Marketing), B.Tech (IT),Ex- SABMiller
                                India, Ex TOI Group
                              </p>
                            </div>
                            <div className="linkedin_icn">
                              <a
                                href="#"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <div className="">
                                  <svg
                                    className="svg"
                                    focusable="false"
                                    aria-hidden="true"
                                    viewBox="0 0 16 14"
                                    width="16"
                                    height="14"
                                    fill="none"
                                  >
                                    <path
                                      d="M14.7766 0H1.90789C1.29144 0 0.792969 0.451172 0.792969 1.00898V12.9883C0.792969 13.5461 1.29144 14 1.90789 14H14.7766C15.3931 14 15.8945 13.5461 15.8945 12.991V1.00898C15.8945 0.451172 15.3931 0 14.7766 0ZM5.27328 11.9301H3.03165V5.24726H5.27328V11.9301ZM4.15247 4.33672C3.43279 4.33672 2.85173 3.79805 2.85173 3.13359C2.85173 2.46914 3.43279 1.93047 4.15247 1.93047C4.8692 1.93047 5.45025 2.46914 5.45025 3.13359C5.45025 3.79531 4.8692 4.33672 4.15247 4.33672ZM13.6617 11.9301H11.423V8.68164C11.423 7.90781 11.4083 6.90977 10.258 6.90977C9.09291 6.90977 8.91594 7.75469 8.91594 8.62695V11.9301H6.6802V5.24726H8.82745V6.16055H8.85695C9.15485 5.63555 9.88633 5.08047 10.9747 5.08047C13.2429 5.08047 13.6617 6.46406 13.6617 8.26328V11.9301Z"
                                      fill="white"
                                    ></path>
                                  </svg>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>


                      </div>
                    </SwiperSlide>

                    <SwiperSlide>
                      <div className="member_item" onMouseLeave={handleMouseLeave}
                        onMouseEnter={handleMouseEnter}
                        id="three">

                        <div className="member_img">
                          <div
                            className="backimg"
                            style={{ backgroundImage: `url(${team})` }}
                          >
                            <svg
                              className="transparent_svg"
                              data-name="Layer 1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 251 251"
                            >
                              <rect
                                className="cls-1"
                                x="0.5"
                                y="0.5"
                                width="250"
                                height="250"
                              ></rect>
                            </svg>
                          </div>
                        </div>
                        <div className="member_info">
                          <p className="member_tt">
                            Lorem Dolor
                          </p>
                          <p className="member_pos sml">
                            Founder
                          </p>
                        </div>
                        <div className={`member_ovr`} id="targetthree">
                          <div className="member_ovr_inner">
                            <p className="member_tt">
                              Lorem Dolor
                            </p>
                            <p className="member_pos sml ">
                              Founder
                            </p>
                            <div className="">
                              <p className="member_degree sml">
                                PGDM (Marketing), B.Tech (IT),Ex- SABMiller
                                India, Ex TOI Group
                              </p>
                            </div>
                            <div className="linkedin_icn">
                              <a
                                href="#"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <div className="">
                                  <svg
                                    className="svg"
                                    focusable="false"
                                    aria-hidden="true"
                                    viewBox="0 0 16 14"
                                    width="16"
                                    height="14"
                                    fill="none"
                                  >
                                    <path
                                      d="M14.7766 0H1.90789C1.29144 0 0.792969 0.451172 0.792969 1.00898V12.9883C0.792969 13.5461 1.29144 14 1.90789 14H14.7766C15.3931 14 15.8945 13.5461 15.8945 12.991V1.00898C15.8945 0.451172 15.3931 0 14.7766 0ZM5.27328 11.9301H3.03165V5.24726H5.27328V11.9301ZM4.15247 4.33672C3.43279 4.33672 2.85173 3.79805 2.85173 3.13359C2.85173 2.46914 3.43279 1.93047 4.15247 1.93047C4.8692 1.93047 5.45025 2.46914 5.45025 3.13359C5.45025 3.79531 4.8692 4.33672 4.15247 4.33672ZM13.6617 11.9301H11.423V8.68164C11.423 7.90781 11.4083 6.90977 10.258 6.90977C9.09291 6.90977 8.91594 7.75469 8.91594 8.62695V11.9301H6.6802V5.24726H8.82745V6.16055H8.85695C9.15485 5.63555 9.88633 5.08047 10.9747 5.08047C13.2429 5.08047 13.6617 6.46406 13.6617 8.26328V11.9301Z"
                                      fill="white"
                                    ></path>
                                  </svg>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>


                      </div>
                    </SwiperSlide>

                  </Swiper>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default TeamDetails;
