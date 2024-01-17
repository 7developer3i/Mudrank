import React, { useContext, useEffect, useState } from "react";
import { close_view_details } from "../../feature/dashboard/admindetails/view/viewSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchDocuments } from "../../feature/dashboard/admindetails/fetchdataSlice";
import { fetchStartup_documents } from "../../feature/dashboard/admindetails/api";
import Subscription from "./subscription";
import { open_subscription_section } from "../../feature/actions/subscriptionreducer/reducer";
import { BaseUrl, END_POINTS } from "../../apis/contant";
import bgimg from "../../images/bg_img.png"
import hicn from "../../images/hicn.png"
import AuthContext from "../../context/AuthContext";
import axios from "axios";

const Info = () => {

  const authcontext = useContext(AuthContext);
  const { showSucessMessage, showError } = authcontext;

  //For Startup data Reduxactions
  const Startup_data = useSelector((state) => state.apiData.data);
  const view_index = useSelector((state) => state.viewPageData.view_index);
  const Startup_highlights = useSelector(
    (state) => state.apiData.data_highlights
  );

  //For Investor data Reduxaction
  const Investor_data = useSelector((state) => state.fetch_investor_data.data);

  //For Show Subscription Page
  const subscription_page_show = useSelector(
    (state) => state.subscription_page.subscription
  );
  const No_of_units = useSelector((state) => state.subscription_page.units);

  const dispatch = useDispatch();

  const [store_highlight, setStore_Highlight] = useState();
  const [kycunvarified, setKYCUnvarified] = useState(null);

  useEffect(() => {
    if (Startup_data && Startup_highlights) {
      const startupsWithHighlights = Startup_data.result.map((startup) => {
        const startupHighlights = Startup_highlights.result.filter(
          (h) => h.startup_id === startup.id
        );
        return {
          ...startup,
          highlights: JSON.parse(startupHighlights[0].highlight),
        };
      });
      setStore_Highlight(startupsWithHighlights);
    }
  }, [Startup_data, Startup_highlights]);

  const fetchApi = async () => {
    const Id = Startup_data.result[view_index].id;
    try {
      const document = await fetchStartup_documents(Id);
      dispatch(fetchDocuments(document));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Startup_data && view_index !== null) {
      fetchApi();
    }
  }, [Startup_data, view_index]);

  const handleKycFormSubmit = async () => {
    if (Investor_data) {
      try {
        const response = await axios.get(`${BaseUrl.url}${END_POINTS.INFO.KYC_STATUS}` + Investor_data.id)
        if (response.data.success === true) {
          setKYCUnvarified(null);
          return dispatch(open_subscription_section())
        }
        if (response.data.success === false) {
          setKYCUnvarified(response.data.message)
          setTimeout(() => {
            setKYCUnvarified(null);
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Function to subscribe a user
  function subscribe(subc) {
    const dataString = `${subc}`;
    const dataArray = dataString.split(',');
    const cleanedArray = dataArray.filter(item => item !== '');
    return cleanedArray.length;
  };

  return (
    <>
      <section className="explore_container ">
        <div className="bcontainer">
          <div className="explore_inner">
            <div className="explore_cnt">
              <div className="inner_container">
                <section className="card_information">
                  <div className="sec_container">
                    <div className="inner_img wht_bg">
                      <div className="sec_inner">
                        <div className="">
                          {store_highlight && view_index !== null ? (
                            <div key={store_highlight.id}>
                              <div className="page_head">
                                <a onClick={() => dispatch(close_view_details())}><p className="bck_btn">
                                  <svg className="bck_svg" focusable="false" aria-hidden="true" viewBox="0 0 7 12" width="7" height="12" fill="none">
                                    <path d="M1.22445 10.5789L1.22434 10.579L1.21766 10.5723C0.95179 10.3064 0.95179 9.87 1.21766 9.60412L4.78994 6.03184C4.94595 5.87584 4.94595 5.62193 4.78994 5.46593L1.21766 1.89365C0.95179 1.62777 0.95179 1.19133 1.21766 0.925457C1.48354 0.659584 1.91998 0.659584 2.18585 0.925457L5.75813 4.49774C6.44589 5.18549 6.44589 6.31228 5.75813 7.00004L2.18585 10.5723C2.04959 10.7086 1.87459 10.7731 1.70176 10.7731C1.52087 10.7731 1.35168 10.6976 1.22445 10.5789Z" fill="#090909" stroke="#090909" strokeWidth="0.547896">
                                    </path>
                                  </svg>
                                  Back </p>
                                </a>
                              </div>

                              <div className="single_data">
                                <div className="">
                                  <div className="single_head">
                                    <div className="single_tt_img">
                                      <div className="single_img">
                                        <img
                                          src={store_highlight[view_index].logo_url}
                                          alt="Detoxie"
                                        />
                                      </div>
                                      <h5 className="single_tt">
                                        {store_highlight[view_index].company_name}
                                      </h5>
                                    </div>
                                    <span className="live_tag">
                                      <svg
                                        className=""
                                        focusable="false"
                                        aria-hidden="true"
                                        viewBox="0 0 14 15"
                                        width="14"
                                        height="15"
                                        fill="none"
                                      >
                                        <circle
                                          opacity="0.2"
                                          cx="7"
                                          cy="7.5"
                                          r="7"
                                          fill="#179942"
                                        ></circle>
                                        <circle cx="7" cy="7.5" r="3" fill="#179942"></circle>
                                      </svg>
                                      Live
                                    </span>
                                  </div>
                                  <p className="single_sub_desc">
                                    {store_highlight[view_index].description}
                                  </p>

                                  <div className="single_card_tags">
                                    <div className="single_card_tag">
                                      <p className="ssl">💡100% YOY growth</p>
                                    </div>
                                    <div className="single_card_tag">
                                      <p className="ssl">✨25K+ Customers</p>
                                    </div>
                                    <div className="single_card_tag">
                                      <p className="ssl">Skincare</p>
                                    </div>
                                  </div>
                                </div>


                                <div className="single_infos_video">
                                  <div className="single_infos">
                                    <div className="single_infos_data">
                                      <div className="sdata_item">
                                        <h5 className="sdata_tt">
                                          {subscribe(store_highlight[view_index].subscribers)}
                                        </h5>
                                        <p className="sdata_sub sml">
                                          Subscribers
                                        </p>
                                      </div>
                                      <div className="sdata_item">
                                        <h5 className="sdata_tt">
                                          {store_highlight[view_index].funding_time_limit}{" "}
                                          days
                                        </h5>
                                        <p className="sdata_sub sml">
                                          Left to subscribe
                                        </p>
                                      </div>
                                      <div className="sdata_item">
                                        <h5 className="sdata_tt bclr">
                                          44.70%
                                        </h5>
                                        <p className="sdata_sub sml">
                                          Of goal raised
                                        </p>
                                        <div className="blue_bar">
                                          <span
                                            className="blue_line"
                                            role="progressbar"
                                            aria-valuenow="45"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                            style={{
                                              width: "44.70%",
                                              backgroundColor: "#2d32ff",
                                            }}
                                          >
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    <div
                                      style={{
                                        display:
                                          subscription_page_show ? "" : "none",
                                      }}
                                    >
                                      <Subscription view_index={view_index} Startup_data={Startup_data} Investor_data={Investor_data} No_of_units={No_of_units} />
                                    </div>

                                    <div
                                      style={{
                                        display:
                                          subscription_page_show ? "none" : "",
                                      }}
                                      className="single_subs_btn"
                                    >
                                      <div className="sbtn_inner">
                                        <button
                                          onClick={() => handleKycFormSubmit(view_index)}
                                          className="button bbg"
                                          tabIndex="0"
                                          type="button"
                                          colour="primary"
                                        >
                                          Subscribe
                                        </button>
                                        <div className="min_subs">
                                          <p className="ssl">
                                            ₹5000{" "}
                                            <span className="">
                                              Minimum Subscription
                                            </span>
                                          </p>
                                        </div>
                                        {showSucessMessage &&
                                          <div className="min_subs" style={{ position: "initial" }}>
                                            <p className="ssl">
                                              <span style={{ color: "green", fontWeight: "bold" }}>
                                                {showSucessMessage}
                                              </span>
                                            </p>
                                          </div>}
                                        {showError &&
                                          <div className="min_subs" style={{ position: "initial" }}>
                                            <p className="ssl">
                                              <span style={{ color: "red", fontWeight: "bold" }}>
                                                {showError}
                                              </span>
                                            </p>
                                          </div>}
                                        {kycunvarified &&
                                          <div className="min_subs" style={{ position: "initial" }}>
                                            <p className="ssl">
                                              <span style={{ color: "red", fontWeight: "bold" }}>
                                                {kycunvarified}
                                              </span>
                                            </p>
                                          </div>}
                                      </div>
                                    </div>
                                  </div>
                                  <section className="single_video_cnt">
                                    <div className="single_video_inner">
                                      <iframe
                                        width="100%"
                                        scrolling="no"
                                        height="100%"
                                        src={store_highlight[view_index].video_url}
                                        title="YouTube video player"
                                        frameBorder={0}
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen=""
                                      />
                                    </div>
                                  </section>
                                </div>
                              </div>

                              <section className="subs_offered">
                                <h5 className="sec_tt">
                                  Subscriptions offered
                                </h5>
                                <div className="sub_offered_list">
                                  <div className="sub_off_item">

                                    <div className="bg_img" style={{ backgroundImage: `url(${bgimg})` }}>

                                    </div>
                                    <div className="sub_off_desc">
                                      <p className="sm_tt vsl">
                                        SUBSCRIBE FOR
                                      </p>
                                      <p className="sub_off_price">
                                        ₹5,000
                                      </p>
                                      <div className="rwd_desc">
                                        <p className="rwd_tt sml">
                                          GET REWARDS
                                        </p>
                                        <p className="rwd_tt sml">
                                          Off on products{" "}
                                        </p>
                                      </div>
                                      <ul className="rwd_off">
                                        <li className="rwd_off_li">
                                          <p className="ssl">30% off on all products</p>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>

                                  <div className="sub_off_item">

                                    <div className="bg_img" style={{ backgroundImage: `url(${bgimg})` }}>

                                    </div>
                                    <div className="sub_off_desc">
                                      <p className="sm_tt vsl">
                                        SUBSCRIBE FOR
                                      </p>
                                      <p className="sub_off_price">
                                        ₹5,000
                                      </p>
                                      <div className="rwd_desc">
                                        <p className="rwd_tt sml">
                                          GET REWARDS
                                        </p>
                                        <p className="rwd_tt sml">
                                          Exit on SAR
                                        </p>
                                      </div>
                                      <ul className="rwd_off">
                                        <li className="rwd_off_li">
                                          <p className="ssl">Complete 3 refferals of INR 1200 each or puchase detoxie products worth 3500 and unlock exit of 1 SAR</p>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </section>


                              <section className="subs_highlight">
                                <h5 className="sec_tt">
                                  Highlights
                                </h5>
                                <div className="highlights_list">
                                  {store_highlight
                                    && store_highlight[view_index].highlights.map((data, index) =>
                                      <div key={index} className="highlight_item">
                                        <div className="hicn">
                                          <img
                                            decoding="async"
                                            loading="lazy"
                                            className="remix-image"
                                            alt=""
                                            src={hicn}
                                          />
                                        </div>
                                        <div className="hdata">
                                          <div className="hdata_tt">
                                            <h5 className="">{data.key}</h5>
                                          </div>
                                          <div className="hdata_desc">
                                            <p className="sml">{data.value}</p>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  }
                                </div>
                              </section>

                            </div>
                          ) : (
                            ""
                          )}
                        </div>




                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default Info;
