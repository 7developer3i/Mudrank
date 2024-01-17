import React, { useState, useEffect, useRef } from "react";
import what1 from "../../images/what1.png"
import whatbanner from "../../images/what_banner.png"
import banner from "../../images/banner.png"
import banner1 from "../../images/banner1.png"
import banner2 from "../../images/banner2.png"
import learnbg from "../../images/learn_bg.png"
import feedImg from "../../images/feed_img.png"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function ExplorePage() {

    const Startup_data = useSelector((state) => state.apiData.data);
    const Startup_loading = useSelector((state) => state.apiData.loading);

    const [activeTab, setActiveTab] = useState('#tab1');

    const navigate = useNavigate()

    const handleTabClick = (e) => {
        e.preventDefault();
        const tabId = e.target.getAttribute('href');
        setActiveTab(tabId);
    };

    useEffect(() => {
        const faqButtons = document.querySelectorAll('.faq_btn');
        const faqContents = document.querySelectorAll('.faq_content');

        faqButtons.forEach((button, index) => {
            button.addEventListener('click', function () {
                const isActive = button.classList.contains('active_f');
                const activeContent = faqContents[index];

                faqButtons.forEach((btn, i) => {
                    if (i !== index) {
                        btn.classList.remove('active_f');
                        faqContents[i].style.maxHeight = '0';
                    }
                });

                if (isActive) {
                    button.classList.remove('active_f');
                    activeContent.style.maxHeight = '0';
                } else {
                    button.classList.add('active_f');
                    activeContent.style.maxHeight = activeContent.scrollHeight + 'px';
                }
            });
        });
    }, []);

    const convertCloseDay = (enddate) => {
        const endDate = new Date(enddate);
        // Calculate the time difference in milliseconds between the current date and end date
        const timeDiff = endDate - new Date();
        // Convert the time difference to days
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        return `${days} Days`
    };

    return (
        <>

            <section className="explore_container">

                <div className="bcontainer">
                    <div className="explore_inner">
                        <div className="explore_cnt">
                            <div className="inner_container">
                                <div className="explore_left">

                                    <section className="get_started">
                                        <div className="bcontainer">
                                            <div className="sec_container">

                                                <div className="inner_img backimg" style={{ backgroundImage: `url(${whatbanner})` }}>
                                                    <div className="sec_inner">
                                                        <h6 className="user_head">👋 Welcome, User !</h6>
                                                        <h5 className="blk">
                                                            Get Started
                                                        </h5>

                                                        <div className="profile_comp">
                                                            <p className="">
                                                                You are closer to starting you wealth creation journey with
                                                                Mudrank
                                                            </p>
                                                            <div className="pr_bar">
                                                                <div className="pr_bar_line"></div>
                                                                <p className="sml">50%</p>
                                                            </div>
                                                        </div>
                                                        <div className="pro_steps">
                                                            <p className="pro_comp sml">
                                                                <strong>2</strong> out of <strong>4</strong> completed
                                                            </p>
                                                            <div className="pro_step">
                                                                <div className="pro_step_inner">
                                                                    <div className="pro_step_line">
                                                                        <div className="right_icn">
                                                                            <svg
                                                                                className="rgt_arrow"
                                                                                focusable="false"
                                                                                aria-hidden="true"
                                                                                viewBox="0 0 11 8"
                                                                            >
                                                                                <g fill="none">
                                                                                    <path
                                                                                        d="m1 4 2.857 2.857L9.57 1.143"
                                                                                        stroke="currentColor"
                                                                                        strokeWidth="2"
                                                                                        strokeLinecap="round"
                                                                                        strokeLinejoin="round"
                                                                                    ></path>
                                                                                </g>
                                                                            </svg>
                                                                        </div>
                                                                        <p className="step_txt sml">
                                                                            Create your profile
                                                                        </p>
                                                                    </div>
                                                                    <div className="hr_line"></div>
                                                                </div>
                                                            </div>

                                                            <div className="pro_step">
                                                                <div className="pro_step_inner">
                                                                    <div className="pro_step_line">
                                                                        <div className="right_icn">
                                                                            <svg
                                                                                className="rgt_arrow"
                                                                                focusable="false"
                                                                                aria-hidden="true"
                                                                                viewBox="0 0 11 8"
                                                                            >
                                                                                <g fill="none">
                                                                                    <path
                                                                                        d="m1 4 2.857 2.857L9.57 1.143"
                                                                                        stroke="currentColor"
                                                                                        strokeWidth="2"
                                                                                        strokeLinecap="round"
                                                                                        strokeLinejoin="round"
                                                                                    ></path>
                                                                                </g>
                                                                            </svg>
                                                                        </div>
                                                                        <p className="step_txt sml">
                                                                            Explore live campaigns
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="cmp_info">
                                                                <div className="">
                                                                    <div className="pro_step_line">
                                                                        <div className="right_icn org_icn">
                                                                            <svg
                                                                                className="rgt_arrow"
                                                                                focusable="false"
                                                                                aria-hidden="true"
                                                                                viewBox="0 0 2 12"
                                                                                fill="none"
                                                                            >
                                                                                <path
                                                                                    d="M1 10.667v.007M1 7.75V1.333"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.3"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                ></path>
                                                                            </svg>
                                                                        </div>
                                                                        <p className="cmp_info_tt sml">
                                                                            Complete KYC and share bank account details{" "}
                                                                        </p>
                                                                    </div>
                                                                    <div className="cmp_sub_info">
                                                                        <p className="sub_info_txt">
                                                                            Provide some identification details and the bank
                                                                            account in which we should credit returns&nbsp;
                                                                            <br />
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="cmp_btn">
                                                                    <a onClick={() => navigate("/kyc-form")} >
                                                                        <button
                                                                            className="button bbg"
                                                                            tabIndex="0"
                                                                            type="button"
                                                                            colour="brand"
                                                                        >
                                                                            Complete It
                                                                            <span className="MuiTouchRipple-root css-w0pj6f"></span>
                                                                        </button>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="pro_step">
                                                                <div className="pro_step_line">
                                                                    <div className="pro_step_line">
                                                                        <div className="">
                                                                            <svg
                                                                                className="rgt_arrow"
                                                                                focusable="false"
                                                                                aria-hidden="true"
                                                                                viewBox="0 0 2 12"
                                                                                fill="none"
                                                                            >
                                                                                <path
                                                                                    d="M1 10.667v.007M1 7.75V1.333"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.3"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                ></path>
                                                                            </svg>
                                                                        </div>
                                                                        <p className="step_txt sml">
                                                                            Subscribe and sign documents
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

                                    <section className="live_camp mrg60">
                                        <div className="bcontainer">
                                            <div className="sec_container">

                                                <div className="inner_img backimg" style={{ backgroundImage: `url(${banner})` }}>
                                                    <div className="sec_inner">
                                                        <div className="live_head">
                                                            <h5 className="blk">
                                                                Live campaigns
                                                            </h5>
                                                            <a className="view_all" href="#">View All <svg className="" focusable="false" aria-hidden="true" viewBox="0 0 15 12" width="15" height="12" fill="none"><path d="M9.20471 11.0779L9.06328 11.2194L8.92186 11.0779L8.12009 10.2761L7.97868 10.1347L8.12009 9.99329L11.3466 6.76679L1 6.76679L0.8 6.76679L0.8 6.56679L0.8 5.43284L0.799999 5.23284L1 5.23284L11.3466 5.23284L8.12009 2.00637L7.97867 1.86496L8.12009 1.72354L8.92186 0.921722L9.06328 0.780293L9.20471 0.921718L14.1414 5.85843L14.2828 5.99985L14.1414 6.14127L9.20471 11.0779Z" fill="#3087E9" stroke="#3087E9" strokeWidth="0.4"></path></svg></a>
                                                        </div>

                                                        <div className="live_tab_lists">
                                                            <li className={`live_items${activeTab === '#tab1' ? ' active' : ''}`}>
                                                                <a href="#tab1" onClick={handleTabClick}>CSOP</a>
                                                            </li>
                                                            <li className={`live_items${activeTab === '#tab2' ? ' active' : ''}`}>
                                                                <a href="#tab2" onClick={handleTabClick}>ID</a>
                                                            </li>
                                                        </div>


                                                        <div className="live_tab_data">
                                                            <div className={`live_tab_inn ${activeTab === '#tab1' ? 'active' : ''}`} id="tab1">
                                                                <div className="camp_tab_data">
                                                                    {Startup_data && Startup_data.result.map((data, index) =>
                                                                        <div className="camp_item" key={index}>
                                                                            <a href="#">
                                                                                <div className="camp_item_inner">
                                                                                    <div className="camp_data">
                                                                                        <div className="camp_img">
                                                                                            <div className="backimg" style={{ backgroundImage: `url(${data.img_url})` }}>
                                                                                                <svg className="transparent_svg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                                                                                                    viewBox="0 0 51 51">
                                                                                                    <rect className="cls-1" x="0.5" y="0.5" width="50" height="50"></rect>
                                                                                                </svg>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="camp_info_inner">
                                                                                            <div className="camp_tt">
                                                                                                <h6>{data.company_name}</h6>
                                                                                            </div>
                                                                                            <div className="camp_info">
                                                                                                <div className="camp_info_item">
                                                                                                    <div className="cinfo_tt">
                                                                                                        <p className="sml">
                                                                                                            Raised
                                                                                                        </p>
                                                                                                        <p className="bold">50%</p>
                                                                                                    </div>
                                                                                                    <div className="cinfo_tt">
                                                                                                        <p className="sml">
                                                                                                            Closes in
                                                                                                        </p>
                                                                                                        <p className="bold">{convertCloseDay(data.end_date)}</p>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                    )}

                                                                    {Startup_loading && <div style={{fontWeight:"bold", fontSize:"20px"}}>Loading....</div>}
                                                                </div>
                                                            </div>

                                                            <div className={`live_tab_inn ${activeTab === '#tab2' ? 'active' : ''}`} id="tab2">
                                                                <div className="camp_tab_data">
                                                                    <div className="camp_item">
                                                                        <a href="#">
                                                                            <div className="camp_item_inner">
                                                                                <div className="camp_data">
                                                                                    <div className="camp_img">
                                                                                        <div className="backimg" style={{ backgroundImage: `url(${what1})` }}>
                                                                                            <svg className="transparent_svg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                                                                                                viewBox="0 0 51 51">
                                                                                                <rect className="cls-1" x="0.5" y="0.5" width="50" height="50"></rect>
                                                                                            </svg>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="camp_info_inner">
                                                                                        <div className="camp_tt">
                                                                                            <h6>Lorem ipsum dolor</h6>
                                                                                        </div>
                                                                                        <div className="camp_info">
                                                                                            <div className="camp_info_item">
                                                                                                <div className="cinfo_tt">
                                                                                                    <p className="sml">
                                                                                                        Raised
                                                                                                    </p>
                                                                                                    <p className="bold">50%</p>
                                                                                                </div>
                                                                                                <div className="cinfo_tt">
                                                                                                    <p className="sml">
                                                                                                        Closes in
                                                                                                    </p>
                                                                                                    <p className="bold">5 days</p>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    </div>

                                                                    <div className="camp_item">
                                                                        <a href="#">
                                                                            <div className="camp_item_inner">
                                                                                <div className="camp_data">
                                                                                    <div className="camp_img">
                                                                                        <div className="backimg" style={{ backgroundImage: `url(${what1})` }}>
                                                                                            <svg className="transparent_svg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                                                                                                viewBox="0 0 51 51">
                                                                                                <rect className="cls-1" x="0.5" y="0.5" width="50" height="50"></rect>
                                                                                            </svg>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="camp_info_inner">
                                                                                        <div className="camp_tt">
                                                                                            <h6>Lorem ipsum dolor</h6>
                                                                                        </div>
                                                                                        <div className="camp_info">
                                                                                            <div className="camp_info_item">
                                                                                                <div className="cinfo_tt">
                                                                                                    <p className="sml">
                                                                                                        Raised
                                                                                                    </p>
                                                                                                    <p className="bold">50%</p>
                                                                                                </div>
                                                                                                <div className="cinfo_tt">
                                                                                                    <p className="sml">
                                                                                                        Closes in
                                                                                                    </p>
                                                                                                    <p className="bold">5 days</p>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    </div>

                                                                    <div className="camp_item">
                                                                        <a href="#">
                                                                            <div className="camp_item_inner">
                                                                                <div className="camp_data">
                                                                                    <div className="camp_img">
                                                                                        <div className="backimg" style={{ backgroundImage: `url(${what1})` }}>
                                                                                            <svg className="transparent_svg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                                                                                                viewBox="0 0 51 51">
                                                                                                <rect className="cls-1" x="0.5" y="0.5" width="50" height="50"></rect>
                                                                                            </svg>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="camp_info_inner">
                                                                                        <div className="camp_tt">
                                                                                            <h6>Lorem ipsum dolor</h6>
                                                                                        </div>
                                                                                        <div className="camp_info">
                                                                                            <div className="camp_info_item">
                                                                                                <div className="cinfo_tt">
                                                                                                    <p className="sml">
                                                                                                        Raised
                                                                                                    </p>
                                                                                                    <p className="bold">50%</p>
                                                                                                </div>
                                                                                                <div className="cinfo_tt">
                                                                                                    <p className="sml">
                                                                                                        Closes in
                                                                                                    </p>
                                                                                                    <p className="bold">5 days</p>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="ad_slider mrg60">
                                        <div className="bcontainer">
                                            <div className="sec_container">
                                                <div className="">
                                                    <div className="banner_slider">
                                                        <div className="banner_slider_inner">

                                                            <Swiper className="bslider" pagination={true} modules={[Pagination]}
                                                                spaceBetween={10}
                                                                slidesPerView={1}
                                                                loop={true}
                                                            >
                                                                <SwiperSlide>
                                                                    <div className="banner_item">
                                                                        <a href="#">
                                                                            <div className="banner_item_inner">
                                                                                <div className="backimg" style={{ backgroundImage: `url(${banner1})` }}>
                                                                                    <svg className="transparent_svg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                                                                                        viewBox="0 0 1591 347">
                                                                                        <rect className="cls-1" x="0.5" y="0.5" width="1590" height="346"></rect>
                                                                                    </svg>
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    </div>
                                                                </SwiperSlide>
                                                                <SwiperSlide>
                                                                    <div className="banner_item">
                                                                        <a href="#">
                                                                            <div className="banner_item_inner">
                                                                                <div className="backimg" style={{ backgroundImage: `url(${banner2})` }}>
                                                                                    <svg className="transparent_svg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                                                                                        viewBox="0 0 1591 347">
                                                                                        <rect className="cls-1" x="0.5" y="0.5" width="1590" height="346"></rect>
                                                                                    </svg>
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    </div>
                                                                </SwiperSlide>
                                                            </Swiper>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                </div>


                                <div className="explore_sidebar">

                                    {/* <section className="whatshot feed_sec">
                                        <div className="bcontainer">
                                            <div className="sec_container">
                                                <div className="startup_feed">
                                                    <h6>
                                                        Startup Feed
                                                    </h6>

                                                    <div className="feed_list">

                                                        <div className="feed_item">
                                                            <div className="feed_img">
                                                                <div className="backimg" style={{ backgroundImage: `url(${feedImg})` }}>
                                                                    <svg className="transparent_svg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 321 201">
                                                                        <rect className="cls-1" x="0.5" y="0.5" width="320" height="200"></rect>
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                            <div className="feed_info">
                                                                <div className="feed_tt">
                                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing</p>
                                                                </div>
                                                                <div className="feed_desc">
                                                                    <p className="sml">
                                                                        Duis aute irure dolor in reprehen in cillum dolore voluptate velit esse cillum dolore fugiat nulla pariatur...
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="feed_item">
                                                            <div className="feed_img">
                                                                <div className="backimg" style={{ backgroundImage: `url(${feedImg})` }}>
                                                                    <svg className="transparent_svg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 321 201">
                                                                        <rect className="cls-1" x="0.5" y="0.5" width="320" height="200"></rect>
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                            <div className="feed_info">
                                                                <div className="feed_tt">
                                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing</p>
                                                                </div>
                                                                <div className="feed_desc">
                                                                    <p className="sml">
                                                                        Duis aute irure dolor in reprehen in cillum dolore voluptate velit esse cillum dolore fugiat nulla pariatur...
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>


                                                    </div>

                                                    <div className="feed_all">
                                                        <div className="inner_btn">
                                                            <a href="#" className="button wbg">View All</a>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>

                                    </section> */}

                                    <section className="learn_more">
                                        <div className="bcontainer">
                                            <div className="sec_container">
                                                <div className="learn_inner">
                                                    <div className="backimg" style={{ backgroundImage: `url(${learnbg})` }}>
                                                        <a href="#">
                                                            <div className="learn_txt">
                                                                <p>What is Lorem Ipsum it is times</p>
                                                                <p className="sml">
                                                                    lipsum as it is sometimes known it as loreum
                                                                </p>
                                                            </div>
                                                            <div className="inner_btn"><p className="button wclr bblk">Learn More</p></div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="help_center">
                                        <div className="bcontainer">
                                            <div className="sec_container">
                                                <div className="faq_infos">
                                                    <div className="faq_tt">
                                                        <h6 className="faq_head">Help Center</h6>
                                                    </div>
                                                    <div className="faq_questions">
                                                        <div className="faq_que">
                                                            <button className="faq_btn">
                                                                <h6>Id sequi maxime ea accusantium beatae sed voluptatum?</h6>
                                                            </button>
                                                            <div className="faq_content">
                                                                <div className="inner_answer">
                                                                    <p>
                                                                        Lorem Ipsum is simply dummy text of the printing and typesetting
                                                                        industry. Lorem Ipsum has been the industry's standard dummy text
                                                                        ever since the 1500s, when an unknown printer took a galley of type
                                                                        and scrambled it to make a type specimen book. It has survived not
                                                                        only five centuries, but also the leap into electronic typesetting,
                                                                        remaining essentially unchanged. It was popularised in the 1960s
                                                                        with the release of Letraset sheets containing Lorem Ipsum passages,
                                                                        and more recently with desktop publishing software like Aldus
                                                                        PageMaker including versions of Lorem Ipsum.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="faq_que">
                                                            <button className="faq_btn">
                                                                <h6>Et adipisci autem qui voluptatum nobis ut adipisci?</h6>
                                                            </button>
                                                            <div className="faq_content">
                                                                <div className="inner_answer">
                                                                    <p>
                                                                        Lorem Ipsum is simply dummy text of the printing and typesetting
                                                                        industry. Lorem Ipsum has been the industry's standard dummy text
                                                                        ever since the 1500s, when an unknown printer took a galley of type
                                                                        and scrambled it to make a type specimen book. It has survived not
                                                                        only five centuries, but also the leap into electronic typesetting,
                                                                        remaining essentially unchanged. It was popularised in the 1960s
                                                                        with the release of Letraset sheets containing Lorem Ipsum passages,
                                                                        and more recently with desktop publishing software like Aldus
                                                                        PageMaker including versions of Lorem Ipsum.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="faq_que">
                                                            <button className="faq_btn">
                                                                <h6>What is Lorem Ipsum?</h6>
                                                            </button>
                                                            <div className="faq_content">
                                                                <div className="inner_answer">
                                                                    <p>
                                                                        Lorem Ipsum is simply dummy text of the printing and typesetting
                                                                        industry. Lorem Ipsum has been the industry's standard dummy text
                                                                        ever since the 1500s, when an unknown printer took a galley of type
                                                                        and scrambled it to make a type specimen book. It has survived not
                                                                        only five centuries, but also the leap into electronic typesetting,
                                                                        remaining essentially unchanged. It was popularised in the 1960s
                                                                        with the release of Letraset sheets containing Lorem Ipsum passages,
                                                                        and more recently with desktop publishing software like Aldus
                                                                        PageMaker including versions of Lorem Ipsum.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="inner_btn"><a href="#" className="button wclr bblk">Need More Help</a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}