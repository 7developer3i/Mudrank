import React, { useEffect, useState } from "react";

import team from "../../images/pitch1.png";
import axios from "axios";
import { BaseUrl } from "../../apis/contant";
import img1 from '../../../src/images/pitch1.png'
const Pitch = () => {
  const [activeTab, setActiveTab] = useState("#tab1");
  const [imageField, setImageField] = useState({});
  const [showSlider,setShowSlider] = useState([])
  const [test, setTEst] = useState("")

  const handleTabClick = (image) => {
    // e.preventDefault();
    setTEst(`${BaseUrl.url}${image}`)
    // const tabId = e.currentTarget.getAttribute("href");

    // if (!tabId) {
    //   console.error("Tab ID is null or undefined.");
    //   return;
    // }

    // setActiveTab(tabId);
  };

  const handleTabSelection = (tabid) => {
    document.querySelectorAll(".pitch_img_lists li").forEach((li) => {
      li.classList.remove("active");
    });
    document
      .querySelectorAll(".inner_image_data .single_image_data")
      .forEach((tab) => {
        tab.classList.remove("active");
      });
    document.querySelector(".all_image_data " + tabid).classList.add("active");
    document.querySelector(tabid).parentElement.classList.add("active");
  };
  // const handleClick = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("files", imageField);

  //   axios
  //     .post(`${BaseUrl.url}imagedata`, formData) 
  //     .then((res) => {
  //       if (res.status === 200) {
          
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //     });
  // };

  useEffect(()=>{
    axios.get(`${BaseUrl.url}imagedata`).then((res)=>{
      setShowSlider(res.data)
    }).catch((err)=>{
      console.log("err",err);
    })
  },[])

  return (
    <>
      {/* <button
        type="submit"
        onClick={(e) => handleClick(e)}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-2/4	 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
      <label
        className="block mb-2 text-sm font-medium text-white dark:text-white"
        for="file_input"
      >
        Upload file
      </label>
      <input
        className="block w-2/4 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer text-black dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        aria-describedby="file_input_help"
        id="file_input"
        type="file"
        accept=""
        onChange={(e) => setImageField(e.target.files[0])}
      />
      <p
        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
        id="file_input_help"
      >
        SVG, PNG, JPG or GIF (MAX. 800x400px).
      </p> */}
      <section className="pitch_sec mrg60">
        <div className="bcontainer">
          <div className="inner_container">
            <div className="inner_img backimg">
              <div className="sec_inner">
                <div className="sec_inn_head">
                  <h5 className="sec_tt">Pitch</h5>

                  <div className="pitch_info">
                    <div className="pitch_img">
                      <img
                        className=""
                        alt=""
                        src={img1}
                      />
                      
                    </div>
                    <p className="">Cars24</p>
                  </div>
                </div>

                <div className="pitch_content">
                  <div className="pitch_cnt_inner">
                    <div className="pitch_img_lists">
                      {showSlider && showSlider.map((item) => <li
                        className={`pitch_img_item${
                          activeTab === "#tab1" ? " active" : ""
                        }`}
                      >
                        <a onClick={()=>handleTabClick(item.image_data)}>
                          <div className="ovr"></div>
                          <div
                            className="backimg"
                            // style={{ backgroundImage: `url(${team})` }}
                          >
                          <img  src={`${BaseUrl.url}${item.image_data}`}/>
                            <svg
                              className="transparent_svg"
                              data-name="Layer 1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 151 91"
                            >
                              <rect
                                className="cls-1"
                                x="0.5"
                                y="0.5"
                                width="150"
                                height="90"
                              ></rect>
                            </svg>
                          </div>
                          <p className="sml">loreum ipsum</p>
                        </a>
                      </li>
                      )}
                    </div>

                    <div className="all_image_data">
                      <div className="inner_image_data">
                        <div
                          className={`single_image_data active`}
                          // id="tab1"
                        >
                          tab1
                          <div
                            className="backimg"
                            // style={{ backgroundImage: `url(${test})` }}
                          >
                          <img src={test} />
                            <svg
                              className="transparent_svg"
                              data-name="Layer 1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 901 501"
                            >
                              <rect
                                className="cls-1"
                                x="0.5"
                                y="0.5"
                                width="900"
                                height="500"
                              ></rect>
                            </svg>
                          </div>
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

      {/* <div>
        <section className="css-tmr8xb">
          <div className="MuiContainer-root MuiContainer-maxWidthLg css-qke4yj">
            <div className="css-0">
              <div className="css-1boqul0">
                <h3 className="MuiTypography-root MuiTypography-h3 css-wi3rv7">
                  Pitch
                </h3>st
                <div className="css-azi6v8">
                  <div className="css-e6ig1n">
                    <img
                      decoding="async"
                      loading="lazy"
                      className="remix-image"
                      alt="Detoxie"
                      src="https://tyke-startup-bucket.s3.ap-south-1.amazonaws.com/PRISTLE%20PRODUCTS%20PRIVATE%20LIMITED/Detoxie%20Logo.png"
                      style={{ minWidth: '0px', minHeight: '0px', backgroundSize: 'cover', backgroundPosition: 'center center', animationDuration: '0.125s' }}
                    />
                  </div>
                  <p className="MuiTypography-root MuiTypography-body1 css-j5nokm">
                    Detoxie
                  </p>
                </div>
              </div>
              <div className="pdf-show-box css-3sly1y" style={{ height: '558px' }}>
                <div className="css-i28oji">
                  <div className="css-u5rtrz">
                    <div className="css-19n7zjd">
                      <canvas height="94" width="160"></canvas>
                      <div className="css-ueki5j">
                        <div className="css-bkhurc">
                          <span className="MuiTypography-root MuiTypography-subtitle css-qtgf02">
                            Current Preview
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="css-19n7zjd">
                      <canvas height="94" width="160"></canvas>
                      <div className="css-6hwpqy"></div>
                    </div>
                    <div className="css-19n7zjd">
                      <canvas height="94" width="160"></canvas>
                      <div className="css-6hwpqy"></div>
                    </div>
                    <div className="css-19n7zjd">
                      <canvas height="94" width="160"></canvas>
                      <div className="css-6hwpqy"></div>
                    </div>
                    <div className="css-19n7zjd">
                      <canvas height="94" width="160"></canvas>
                      <div className="css-6hwpqy"></div>
                    </div>
                    <div className="css-19n7zjd">
                      <canvas height="94" width="160"></canvas>
                      <div className="css-6hwpqy"></div>
                    </div>
                    <div className="css-19n7zjd">
                      <canvas height="94" width="160"></canvas>
                      <div className="css-6hwpqy"></div>
                    </div>
                    <div className="css-19n7zjd">
                      <canvas height="94" width="160"></canvas>
                      <div className="css-6hwpqy"></div>
                    </div>
                    <div className="css-19n7zjd">
                      <canvas height="94" width="160"></canvas>
                      <div className="css-6hwpqy"></div>
                    </div>
                    <div className="css-19n7zjd">
                      <canvas height="94" width="160"></canvas>
                      <div className="css-6hwpqy"></div>
                    </div>
                    <div className="css-19n7zjd">
                      <canvas height="94" width="160"></canvas>
                      <div className="css-6hwpqy"></div>
                    </div>
                    <div className="css-19n7zjd">
                      <canvas height="94" width="160"></canvas>
                      <div className="css-6hwpqy"></div>
                    </div>
                    <div className="css-19n7zjd">
                      <canvas height="94" width="160"></canvas>
                      <div className="css-6hwpqy"></div>
                    </div>
                    <div className="css-19n7zjd">
                      <canvas height="94" width="160"></canvas>
                      <div className="css-6hwpqy"></div>
                    </div>
                    <div className="css-19n7zjd">
                      <canvas height="94" width="160"></canvas>
                      <div className="css-6hwpqy"></div>
                    </div>
                    <div className="css-19n7zjd">
                      <canvas height="94" width="160"></canvas>
                      <div className="css-6hwpqy"></div>
                    </div>
                    <div className="css-19n7zjd">
                      <canvas></canvas>
                      <div className="css-6hwpqy"></div>
                    </div>
                    <div className="css-19n7zjd">
                      <canvas></canvas>
                      <div className="css-6hwpqy"></div>
                    </div>
                    <div className="css-19n7zjd">
                      <canvas></canvas>
                      <div className="css-6hwpqy"></div>
                    </div>
                    <div className="css-19n7zjd">
                      <canvas></canvas>
                      <div className="css-6hwpqy"></div>
                    </div>
                  </div>
                </div>
                <div className="css-qu4nwc">
                  <div className="css-u5rtrz">
                    <div className="right-canvas-box css-zw0bu7">
                      <canvas height="558" width="992"></canvas>
                    </div>
                  </div>
                </div>
                <div className="css-1iozed9">
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1cw4hi4"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 9 10"
                    width="9"
                    height="10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.38891 5.38891C8.6037 5.17412 8.6037 4.82588 8.38891 4.61109L4.88873 1.11091C4.67394 0.896125 4.3257 0.896125 4.11091 1.11091C3.89612 1.3257 3.89612 1.67394 4.11091 1.88873L7.22218 5L4.11091 8.11127C3.89612 8.32606 3.89612 8.6743 4.11091 8.88909C4.3257 9.10388 4.67394 9.10388 4.88873 8.88909L8.38891 5.38891ZM-4.80825e-08 5.55L8 5.55L8 4.45L4.80825e-08 4.45L-4.80825e-08 5.55Z"
                      fill="#0C59BD"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div> */}
    </>
  );
};

export default Pitch;
