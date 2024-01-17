  import React, { useState, useEffect } from "react";
  import { Link } from "react-router-dom";
  import banner from "../../images/banner.png";
  import Illustration from "../../images/Illustration.png";
  import what_banner from "../../images/what_banner.png";
  import commited from "../../images/commited.png";
  import icn1 from "../../images/icn1.svg";
  import icn2 from "../../images/icn2.svg";
  import icn3 from "../../images/icn3.svg";
  import auth1 from "../../images/auth1.png";
  import auth3 from "../../images/auth3.png";
  import auth2 from "../../images/auth2.png";
  import image1 from "../../images/image1.png";
  import image2 from "../../images/image2.png";
  import image3 from "../../images/image3.png";
  import image4 from "../../images/image4.png";
  import image5 from "../../images/image5.png";
  import image6 from "../../images/image6.png";
  import image7 from "../../images/image7.png";
  import image8 from "../../images/image8.png";
  import investment from "../../images/investment.png";
  import plan1 from "../../images/plan1.svg";
  import plan2 from "../../images/plan2.svg";
  import { Swiper, SwiperSlide } from "swiper/react";
  import "swiper/css";
  import axios from "axios";
  import { BaseUrl } from "../../apis/contant";
  import { Imagehtml } from "../../image";

  export function Home() {
    const [activeTab, setActiveTab] = useState("#tab1");
    const [autherInfo, setAutherInfo] = useState([]);
    const [partnersData, setPartnersData] = useState([]);
    const [Curated, setCurated] = useState([]);

    const handleTabClick = (e) => {
      e.preventDefault();
      const tabId = e.target.getAttribute("href");
      setActiveTab(tabId);
    };

    const handleTabSelection = (tabid) => {
      document.querySelectorAll(".tabs-list li").forEach((li) => {
        li.classList.remove("active");
      });
      document.querySelectorAll(".inner_container .tab_inn").forEach((tab) => {
        tab.classList.remove("active");
      });
      document.querySelector(".all_tab_data " + tabid).classList.add("active");
      document.querySelector(tabid).parentElement.classList.add("active");
    };


    const fetchData = () => {
      axios
        .get(`${BaseUrl.url}curated`)
        .then((res) => {
          setCurated(res.data);
        })
        .catch((err) => {
          console.log("err", err);
        });
    };

    const fetchHCustomerData = async () => {
      try {
        const response = await axios.get(`${BaseUrl.url}customer`);
        if (response.status === 200) {
          setAutherInfo(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchPartnersData = async () => {
      try {
        const response = await axios.get(`${BaseUrl.url}partners`);
        if (response.status === 200) {
          setPartnersData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      fetchHCustomerData();
      fetchPartnersData();
      fetchData()

      const handleWindowLoad = () => {
        if (window.screen.width > 767) {
          const bw = window.innerWidth;
          const mainContain = parseFloat(
            document.querySelector(".banner_img .inner_container.mhidden")
              .offsetWidth
          );
          const mainContain1 = (bw - mainContain) / 2;
          document.querySelector(
            ".testimonials .inner_testimonial"
          ).style.paddingLeft = `${mainContain1}px`;
        }
      };
      window.addEventListener("load", handleWindowLoad);

      return () => {
        window.removeEventListener("load", handleWindowLoad);
      };
    }, []);

    const [count, setCount] = useState(0);
    const [investmentsenabled, setInvestmentsEnabled] = useState(0);

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
      const duration1 = 1500; // 3 seconds
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

    const featureItems = [
      { id: 1, title: "Diversification" },
      { id: 2, title: "Great Returns" },
      { id: 3, title: "Non Market Linked Assets" },
    ];

    const [activeItemId, setActiveItemId] = useState(2);

    const handleItemClick = (itemId) => {
      setActiveItemId(itemId);
    };

    const contentconvert = (content, maxCharacters) => {
      if (content.length > maxCharacters) {
        return content.substring(0, maxCharacters) + '..........';
      } else {
        return content;
      }
    };

    return (
      <>
        <section className="index_banner">
          <div className="banner_img">
            <div className="bcontainer">
              <div className="inner_img">
                <div
                  className="backimg"
                  style={{ backgroundImage: `url(${banner})` }}
                >
                  <svg
                    className="transparent_svg mhidden"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1345 810"
                  >
                    <rect
                      className="cls-1"
                      x="0.5"
                      y="0.5"
                      width="1344"
                      height="809"
                    ></rect>
                  </svg>

                  <div className="inner_container dhidden">
                    <div className="txt_side">
                      <h2>
                        Go Beyond
                        <span>Low Returns</span>
                      </h2>
                      <h6>
                        Diversify through non-market linked investment
                        opportunities offering attractive risk-adjusted returns
                      </h6>
                    </div>
                    <div className="img_side">
                      <div
                        className="backimg"
                        style={{ backgroundImage: `url(${Illustration})` }}
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
              <div className="inner_container mhidden">
                <div className="txt_side">
                  <h2>
                    Go Beyond
                    <span>Low Returns</span>
                  </h2>
                  <h6>
                    Diversify through non-market linked investment opportunities
                    offering attractive risk-adjusted returns
                  </h6>
                </div>
                <div className="img_side">
                  <div
                    className="backimg"
                    style={{ backgroundImage: `url(${Illustration})` }}
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

        <section className="invest_tabs mrg77">
          <div className="bcontainer">
            <ul className="tabs-list">
              <div className="inner_container">
                <li
                  className={`tab_items${activeTab === "#tab1" ? " active" : ""}`}
                >
                  <a href="#tab1" onClick={handleTabClick}>
                    Bonds
                  </a>
                </li>
                <li
                  className={`tab_items${activeTab === "#tab2" ? " active" : ""}`}
                >
                  <a href="#tab2" onClick={handleTabClick}>
                    Leasex
                  </a>
                </li>
                <li
                  className={`tab_items${activeTab === "#tab3" ? " active" : ""}`}
                >
                  <a href="#tab3" onClick={handleTabClick}>
                    Startup Equity
                  </a>
                </li>
                <li
                  className={`tab_items${activeTab === "#tab4" ? " active" : ""}`}
                >
                  <a href="#tab4" onClick={handleTabClick}>
                    Commercial Property
                  </a>
                </li>
              </div>
            </ul>

            <div className="all_tab_data">
              <div className="inner_container">
                <div
                  className={`tab_inn ${activeTab === "#tab1" ? "active" : ""}`}
                  id="tab1"
                >
                  <div className="tab_data">
                    <div className="tab_data_inner">
                      <div className="left_side">
                        <h4>
                          Invest in <span>Bonds, Rated A or Higher</span>
                        </h4>
                        <div className="list_item">
                          <ul>
                            <li>
                              <p>Investments starting at ₹10,000</p>
                            </li>
                            <li>
                              <p>Stock Exchange Listed</p>
                            </li>
                            <li>
                              <p>Earn 8-11% Pre-Tax YTM</p>
                            </li>
                          </ul>
                        </div>
                        <div className="btn_grp">
                          <div className="inner_btn">
                            <Link to={"/"} className="button wclr bblk wbrd">
                              Know More
                            </Link>
                          </div>

                          <div className="inner_btn">
                            <Link to={"/"} className="button wclr bbg">
                              view details
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="right_side">
                        <div className="right_side_inner">
                          <div className="plan">
                            <a href="#">
                            <Imagehtml/>
                            </a>
                          </div>
                          <div className="plan">
                            <a href="#">
                            <Imagehtml/>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`tab_inn ${activeTab === "#tab2" ? "active" : ""}`}
                  id="tab2"
                >
                <div className="tab_data">
                    <div className="tab_data_inner">
                      <div className="left_side">
                        <h4>
                          Invest in <span>Bonds, Rated A or Higher</span>
                        </h4>
                        <div className="list_item">
                          <ul>
                            <li>
                              <p>Investments starting at ₹10,000</p>
                            </li>
                            <li>
                              <p>Stock Exchange Listed</p>
                            </li>
                            <li>
                              <p>Earn 8-11% Pre-Tax YTM</p>
                            </li>
                          </ul>
                        </div>
                        <div className="btn_grp">
                          <div className="inner_btn">
                            <a href="#" className="button wclr bblk wbrd">
                              Know More
                            </a>
                          </div>

                          <div className="inner_btn">
                            <a href="#" className="button wclr bbg">
                              view details
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="right_side">
                        <div className="right_side_inner">
                          <div className="plan">
                            <a href="#">
                            <Imagehtml/>
                            </a>
                          </div>
                          <div className="plan">
                            <a href="#">
                            <Imagehtml/>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`tab_inn ${activeTab === "#tab3" ? "active" : ""}`}
                  id="tab3"
                >
                  <div className="tab_data">
                    <div className="tab_data_inner">
                      <div className="left_side">
                        <h4>
                          Invest in <span>Bonds, Rated A or Higher</span>
                        </h4>
                        <div className="list_item">
                          <ul>
                            <li>
                              <p>Investments starting at ₹10,000</p>
                            </li>
                            <li>
                              <p>Stock Exchange Listed</p>
                            </li>
                            <li>
                              <p>Earn 8-11% Pre-Tax YTM</p>
                            </li>
                          </ul>
                        </div>
                        <div className="btn_grp">
                          <div className="inner_btn">
                            <a href="#" className="button wclr bblk wbrd">
                              Know More
                            </a>
                          </div>

                          <div className="inner_btn">
                            <a href="#" className="button wclr bbg">
                              view details
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="right_side">
                        <div className="right_side_inner">
                          <div className="plan">
                            <a href="#">
                            <Imagehtml/>
                            </a>
                          </div>
                          <div className="plan">
                            <a href="#">
                            <Imagehtml/>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`tab_inn ${activeTab === "#tab4" ? "active" : ""}`}
                  id="tab4"
                >
                  <div className="tab_data">
                    <div className="tab_data_inner">
                      <div className="left_side">
                        <h4>
                          Invest in <span>Bonds, Rated A or Higher</span>
                        </h4>
                        <div className="list_item">
                          <ul>
                            <li>
                              <p>Investments starting at ₹10,000</p>
                            </li>
                            <li>
                              <p>Stock Exchange Listed</p>
                            </li>
                            <li>
                              <p>Earn 8-11% Pre-Tax YTM</p>
                            </li>
                          </ul>
                        </div>
                        <div className="btn_grp">
                          <div className="inner_btn">
                            <a href="#" className="button wclr bblk wbrd">
                              Know More
                            </a>
                          </div>

                          <div className="inner_btn">
                            <a href="#" className="button wclr bbg">
                              view details
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="right_side">
                        <div className="right_side_inner">
                          <div className="plan">
                            <a href="#">
                            <Imagehtml/>
                            </a>
                          </div>
                          <div className="plan">
                            <a href="#">
                            <Imagehtml/>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="whatis mrg77">
          <div className="bcontainer">
            <div className="what_banner">
              <div
                className="backimg"
                style={{ backgroundImage: `url(${what_banner})` }}
              >
                <div className="inner_container">
                  <div className="what_head">
                    <h4>What is Mudrank?</h4>
                    <h5>
                      Platform for curated investment opportunities beyond Stocks,
                      Fixed Deposits and Gold
                    </h5>
                  </div>
                  <div className="feature_items">
                    {featureItems && featureItems.map((item) => (
                      <div
                        key={item.id}
                        className={`feature_item ${
                          activeItemId === item.id ? "active" : ""
                        }`}
                        onClick={() => handleItemClick(item.id)}
                      >
                        <div className="feature_inner">
                          <div className="ft_icon">
                            {item.id === 1 && <img src={icn1} alt={item.title} />}
                            {item.id === 2 && <img src={icn2} alt={item.title} />}
                            {item.id === 3 && <img src={icn3} alt={item.title} />}
                          </div>
                          <div className="ft_tt">
                            <h5 className="ssize">{item.title}</h5>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="commited mrg77">
          <div className="bcontainer">
            <div
              className="inner_img backimg"
              style={{ backgroundImage: `url(${banner})` }}
            >
              <div className="commit_cnt">
                <div className="cmt_head">
                  <h4>
                    We are committed to making financial products more inclusive
                  </h4>
                </div>
                <div className="commit_info">
                  <div className="cmt_points">
                    <div className="cmt_points_inner">
                      {Curated &&
                        Curated.map((item, index) => (
                          <div className="cmt_point">
                            <div className="point_head">
                              <h5 className="ssize">{item.title}</h5>
                            </div>
                            <div className="point_desc">
                              <p className="big">{item.text}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="comit_img">
                    <div
                      className="backimg"
                      style={{ backgroundImage: `url(${commited})` }}
                    >
                      <svg
                        className="transparent_svg"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 601 594"
                      >
                        <rect
                          className="cls-1"
                          x="0.5"
                          y="0.5"
                          width="600"
                          height="593"
                        ></rect>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials mrg77">
          <div className="testi_head">
            <h4>What Our Happy Customer Say About Us</h4>
          </div>
          <div className="inner_testimonial">
            <div className="testi_slider swiper">
              <div className="testimonials_items swiper-wrapper">
                <Swiper
                  spaceBetween={0}
                  slidesPerView={3}
                  onSlideChange={() => console.log("slide change")}
                  onSwiper={(swiper) => console.log(swiper)}
                >
                  {autherInfo &&
                    autherInfo.map((data, index) => (
                      <SwiperSlide key={index}>
                        <div className="testi_item swiper-slide">
                          <p>{contentconvert(data.describe,125)}</p>
                          <div className="author_info">
                            <div className="auth_img">
                              <div
                                className="backimg"
                                style={{
                                  backgroundImage: `url(${data.auth_img})`,
                                }}
                              >
                                <svg
                                  className="transparent_svg"
                                  data-name="Layer 1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 69 69"
                                >
                                  <rect
                                    className="cls-1"
                                    x="0.5"
                                    y="0.5"
                                    width="68"
                                    height="68"
                                  ></rect>
                                </svg>
                              </div>
                            </div>
                            <div className="authname">
                              <div className="auth_tt">
                                <h5 className="ssize">{data.auth_name}</h5>
                              </div>
                              <div className="auth_pos">
                                <p className="sml">{data.auth_post}</p>
                              </div>
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

        <section className="partners mrg77">
          <div className="inner_partners bcontainer">
            <div className="partner_head">
              <h4>Our Partners</h4>
            </div>
            <div className="partner_logos">
              <div className="logo_slider swiper">
                <div className="partner_logos_inner swiper-wrapper">
                  {partnersData &&
                    partnersData.map((data, index) => (
                      <div className="logo_item swiper-slide">
                        <div
                          className="backimg"
                          style={{ backgroundImage: `url(${data.image})` }}
                        >
                          <svg
                            className="transparent_svg"
                            data-name="Layer 1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 146 57"
                          >
                            <rect
                              className="cls-1"
                              x="0.5"
                              y="0.5"
                              width="145"
                              height="56"
                            ></rect>
                          </svg>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="investment commited mrg77">
          <div className="bcontainer">
            <div
              className="inner_img backimg"
              style={{ backgroundImage: `url(${banner})` }}
            >
              <div className="inner_container">
                <div className="commit_info">
                  <div className="cmt_points">
                    <div className="cmt_points_inner">
                      <h4>Small Investment, Big Returns!</h4>
                      <p>
                        Reimagine your wealth creation journey with Grip today!
                      </p>
                      <div className="inner_btn">
                        <Link to={"/"} className="button wbg">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="comit_img">
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
          </div>
        </section>
      </>
    );
  }
