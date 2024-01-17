import React, { useState, useEffect } from "react";
import banner from "../../images/banner.png";
import what_banner from "../../images/what_banner.png";
import investment from "../../images/investment.png";

import camp2 from "../../images/camp2.png";
import hicn from "../../images/hicn.png";
import axios from "axios";
import { BaseUrl } from "../../apis/contant";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";

export function Startup() {
  const [count, setCount] = useState(0);
  const [investmentsenabled, setInvestmentsEnabled] = useState(0);
  const [startupData, setStartupData] = useState([]);
  const [FundraisingData, setFundraisingData] = useState([]);
  const [faqData, setFaqData] = useState("");

  useEffect(() => {
    const targetCount = 10000;
    const duration = 1000; // 3 seconds
    const increment = Math.ceil(targetCount / (duration / 10));
    let currentCount = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        currentCount += increment;
        setCount(currentCount);
        if (currentCount >= targetCount) {
          clearInterval(interval);
        }
      }, 10);
    }, 1000);
    const targetCount1 = 655;
    const duration1 = 1000; // 3 seconds
    const increment1 = Math.ceil(targetCount1 / (duration1 / 10));
    let currentCount1 = 0;
    const timer1 = setTimeout(() => {
      const interval1 = setInterval(() => {
        currentCount1 += increment1;
        setInvestmentsEnabled(currentCount1);
        if (currentCount1 >= targetCount1) {
          clearInterval(interval1);
        }
      }, 30);
    }, 1000);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer1);
    };
  }, []);

  useEffect(() => {
    const Fundraising = () => {
      axios.get(`${BaseUrl.url}fundraising`).then((responce) => {
        setFundraisingData(responce.data);
        console.log("responce.data", responce.data).catch((error) => {
          console.log("Error:", error);
        });
      });
    };
    Fundraising();
  }, []);

  useEffect(() => {
    axios
      .get(`${BaseUrl.url}startup`)
      .then((responce) => {
        setStartupData(responce.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const [activeIndex, setActiveIndex] = useState(null);
  const handleClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    axios
      .get(`${BaseUrl.url}freq`)
      .then((res) => {
        setFaqData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const contentconvert = (content, maxCharacters) => {
    if (content.length > maxCharacters) {
      return content.substring(0, maxCharacters) + '..........';
    } else {
      return content;
    }
  };

  useEffect(() => {
    const faqButtons = document.querySelectorAll(".faq_btn");
    const faqContents = document.querySelectorAll(".faq_content");

    faqButtons.forEach((button, index) => {
      button.addEventListener("click", function () {
        handleClick(index);
        const isActive = button.classList.contains("active_f");
        const activeContent = faqContents[index];

        faqButtons.forEach((btn, i) => {
          if (i !== index) {
            btn.classList.remove("active_f");
            faqContents[i].style.maxHeight = "0";
          }
        });

        if (isActive) {
          button.classList.remove("active_f");
          activeContent.style.maxHeight = "0";
        } else {
          button.classList.add("active_f");
          var bheight = activeContent.scrollHeight;
          activeContent.style.maxHeight = bheight + "px";
        }
      });
    });
  }, []);

  return (
    <>
      <section className="index_banner startup_sec">
        <div className="banner_img">
          <div className="bcontainer">
            <div className="inner_img">
              <div
                className="backimg"
                style={{ backgroundImage: `url(${what_banner})` }}
              >
                <svg
                  className="transparent_svg mhidden"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1345 811"
                >
                  <rect
                    className="cls-1"
                    x="0.5"
                    y="0.5"
                    width="1344"
                    height="810"
                  ></rect>
                </svg>

                <div className="inner_container dhidden">
                  <div className="txt_side">
                    <h2>
                      <span>Raising</span> made easy
                    </h2>
                    <h6>
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout.
                    </h6>

                    <div className="inner_btn">
                      <Link className="button wbg">Apply Now</Link>
                    </div>
                  </div>
                  <div className="img_side">
                    <div
                      className="backimg"
                      style={{ backgroundImage: `url(${investment})` }}
                    >
                      <svg
                        className="transparent_svg"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 456 456"
                      >
                        <rect
                          className="cls-1"
                          x="0.5"
                          y="0.5"
                          width="455"
                          height="455"
                        ></rect>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="inner_container mhidden">
              <div className="txt_side">
                <h2>
                  <span>Raising</span> made easy
                </h2>
                <h6>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                </h6>
                <div className="inner_btn">
                  <Link href="#" className="button wbg">
                    Apply Now
                  </Link>
                </div>
              </div>
              <div className="img_side">
                <div
                  className="backimg"
                  style={{ backgroundImage: `url(${investment})` }}
                >
                  <svg
                    className="transparent_svg"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 536 536"
                  >
                    <rect
                      className="cls-1"
                      x="0.5"
                      y="0.5"
                      width="535"
                      height="535"
                    ></rect>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="numbering mrg77">
        <div className="bcontainer">
          <div className="nums_lists">
            <div className="num_item">
              <h3>
                ₹<span>{count}</span>
              </h3>
              <p>Minimum Investment</p>
            </div>

            <div className="num_item">
              <h3>
                ₹<span>{investmentsenabled}</span>Cr
              </h3>
              <p>Investments Enabled</p>
            </div>

            <div className="num_item">
              <h3>
                <span>2.5</span>Lac+
              </h3>
              <p>Investor Community</p>
            </div>

            <div className="num_item">
              <h3>0.0%</h3>
              <p>Default</p>
            </div>
          </div>
        </div>
      </section>
      <section className="camp_lists mrg77">
        <div className="bcontainer">
          <div
            className="inner_img backimg"
            style={{ backgroundImage: `url(${banner})` }}
          >
            <div className="inner_container">
              <div className="cmt_head">
                <h4>100+ Startup Campaigns Completed Successfully</h4>
              </div>

              <div className="">
                <Swiper
                  spaceBetween={0}
                  slidesPerView={6}
                  onSlideChange={() => console.log("slide change")}
                  onSwiper={(swiper) => console.log(swiper)}
                >
                  {startupData &&
                    startupData.map((item, index) => (
                      <SwiperSlide key={index}>
                      <Link to="/blog">
                        <div className="camp_list_item">
                          <div className="camp_list_inner">
                            <div className="camp_list_img">
                              <div
                                className="backimg"
                                style={{
                                  backgroundImage: `url(${item.Image})`,
                                }}
                              >
                                <img src={`${BaseUrl.url}${item.Image}`} />
                              </div>
                            </div>
                            <p className="camp_list_tt sml">{item.title}</p>
                          </div>
                        </div>
                        </Link>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="fund_raise mrg77">
        <div className="bcontainer">
          <div className="inner_container">
            <div className="cmt_head">
              <h4>Fundraising reimagined</h4>
              <h6>
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters.
              </h6>
            </div>

            <div className="fund_lists">
              <Swiper
                spaceBetween={0}
                slidesPerView={2}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {FundraisingData &&
                  FundraisingData.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className="fund_item">
                        <div className="fund_inner">
                          <div
                            className="fund_icon hicn"
                          >
                            <img src={`${BaseUrl.url}${item.Image}`} />
                          </div>
                          <div className="fund_tt">
                            <h6>{item.title}</h6>
                          </div>
                          <div className="fund_desc">
                            <p className="">{contentconvert(item.paragraph,90)}</p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
      <section className="exp_joy investment commited mrg77">
        <div className="bcontainer">
          <div
            className="inner_img backimg"
            style={{ backgroundImage: `url(${banner})` }}
          >
            <div className="inner_container">
              <div className="commit_info">
                <div className="cmt_points">
                  <div className="cmt_points_inner">
                    <div className="cmt_points_item">
                      <h5>Fast and easy</h5>
                      <p className="">
                        No multiple negotiations and endless documentation
                      </p>
                    </div>

                    <div className="cmt_points_item">
                      <h5>Effective</h5>
                      <p>No multiple negotiations and endless documentation</p>
                    </div>

                    <div className="cmt_points_item">
                      <h5>Raise from your community</h5>
                      <p>No multiple negotiations and endless documentation</p>
                    </div>

                    <div className="inner_btn">
                      <Link href="#" className="button wbg">
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="comit_img">
                  <div className="single_video_cnt">
                    <div className="single_video_inner">
                      <iframe
                        width="100%"
                        scrolling="no"
                        height="100%"
                        src="https://www.youtube.com/embed/AvmG7YC8FYw?rel=0"
                        title="YouTube video player"
                        frameBorder={0}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="faq_sec mrg77">
        <div className="bcontainer">
          <div
            className="inner_img backimg"
            style={{ backgroundImage: `url(${what_banner})` }}
          >
            <div className="inner_container">
              <div className="main_part">
                <div className="left_part">
                  <div className="cmt_points_item">
                    <h5>Frequently Asked Questions</h5>
                    <p>
                      Mudrank is your destination for the most Frequently Asked
                      Questions
                    </p>
                  </div>
                  <div className="inner_btn mhidden">
                    <Link href="#" className="button wbg">
                      Learn More
                    </Link>
                  </div>
                </div>
                <div className="right_part">
                  <div className="faq_questions">
                    {faqData &&
                      faqData.map((item, index) => (
                        <div className="faq_que" key={index}>
                          <button
                            className={`faq_btn ${
                              activeIndex === index ? "active_f" : ""
                            }`}
                            onClick={() => handleClick(index)}
                          >
                            <p>{item.question}</p>
                          </button>
                          <div className="faq_content">
                            <div className="inner_answer">
                              <p>{item.answer}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="inner_btn dhidden">
                    <a href="#" className="button wbg">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
