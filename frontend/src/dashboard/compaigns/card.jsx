import React, { useState, useEffect, useRef } from "react";

import banner from "../../images/banner.png"


import { useSelector, useDispatch } from "react-redux";
import {
  fetchDataStart,
  fetchDataFailure,
  fetchDataSuccess,
  fetchDataHighlights,
  fetchCloseStartups,
} from "../../feature/dashboard/admindetails/fetchdataSlice";
import {
  fetchCloseData,
  fetchData,
  fetchHighlights,
} from "../../feature/dashboard/admindetails/api";
import { open_view_details } from "../../feature/dashboard/admindetails/view/viewSlice";

function CardList({ datas, index, dispatch }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // Set the end date
  const endDate = new Date(datas.end_date);

  // Calculate the time difference in milliseconds between the current date and end date
  const timeDiff = endDate - new Date();

  // Convert the time difference to days
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  const handleMouseEnter = () => {
    if (!isHovered) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (isHovered) {
      setIsHovered(false);
    }
  };
  return (
    <div className="card_item" key={index}>
      <div
        className="card_inner"
        onClick={() => dispatch(open_view_details(index))}
      >
        <div className="card_data" onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}>
          <div className="main_cnt">
            <div className="card_img">
              <img src={datas.img_url} alt="THE NEW SHOP" />
            </div>
            <div className="card_cnt">
              <div className="card_tt">
                <div className="card_tt_img">
                  <img src={datas.img_url} alt="" />
                </div>
                <div className="card_heading">
                  <p> {datas.company_name}</p>
                </div>
              </div>
              <p className="card_desc sml">
                {datas.description.substring(0, datas.description.length / 3) +
                  "..."}
              </p>
              <div className="subs_desc">
                <div className="subs_info">
                  <p className="ssl">
                    Raised
                  </p>
                  <p className="">
                    57.80%
                  </p>
                </div>
                <div className="subs_info">
                  <p className="ssl">
                    Min. Subscription
                  </p>
                  <p className="">
                    ₹5,000
                  </p>
                </div>
              </div>
              <div className="card_tags">
                <div className="card_tag">
                  <p className="tag_txt vsl">
                    💡Profitable
                  </p>
                </div>
                <div className="card_tag">
                  <p className="tag_txt vsl">
                    ✨$12Mn ARR
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            // onMouseLeave={handleMouseLeave}
            ref={cardRef}
            // className={isHovered ? "css-1w9vtzz" : "css-1iuf1kw"}
            className={`card_${isHovered ? "visible" : "ovr"}`}
          >
            <div>
              <div className="card_tt">
                <div className="card_tt_img">
                  <img src={datas.img_url} alt="" />
                </div>
                <div className="card_heading">
                  <p> {datas.company_name}</p>
                </div>
              </div>

              <div className="subs_desc">
                <div className="subs_info">
                  <p className="ssl">
                    Subscribers
                  </p>
                  <p className="">
                    58
                  </p>
                </div>

                <div className="subs_info">
                  <p className="ssl">
                    Average Amount Per Subscriber
                  </p>
                  <p className="">
                    ₹9,965.52
                  </p>
                </div>

                <div className="subs_info">
                  <p className="ssl">
                    Minimum Subscription
                  </p>
                  <p className="">
                    ₹5,000
                  </p>
                </div>

                <div className="subs_info">
                  <p className="ssl">
                    Closes in
                  </p>
                  <p className="">
                    {days} days
                  </p>
                </div>
              </div>
            </div>
            <div className="ovr_tags">
              <div className="card_tags">
                <div className="card_tag">
                  <p className="tag_txt vsl">
                    Fashion
                  </p>
                </div>
                <div className="card_tag css-1tn28th">
                  <p className="tag_txt vsl MuiTypography-root MuiTypography-caption-sm css-1sp4j3f">
                    Health
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Card = () => {

  const Startup_loading = useSelector((state) => state.apiData.loading);
  const Startup_data = useSelector((state) => state.apiData.data);
  const Startup_error = useSelector((state) => state.apiData.error);

  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const fetchApiData = async () => {
    try {
      dispatch(fetchDataStart());
      const available_data = await fetchData();
      const data_highlight = await fetchHighlights();
      const close_data = await fetchCloseData();
      dispatch(fetchCloseStartups(close_data));
      dispatch(fetchDataHighlights(data_highlight));
      dispatch(fetchDataSuccess(available_data));
      setSearchResults(available_data.result)
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    
    if (value.length > 0) { 
      const filteredResults = searchResults.filter((testimonial) =>
      testimonial.company_name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults(Startup_data.result)
    }
  };


  return (
    <>
      <section className="explore_container subscribe_container">
        <div className="bcontainer">
          <div className="explore_inner">
            <div className="explore_cnt">
              <div className="inner_container">

                <section className="subscribe_lists">

                  <div className="bcontainer">
                    <div className="sec_container">

                      <div className="inner_img backimg" style={{ backgroundImage: `url(${banner})` }}>

                        <div className="sec_inner">
                          <h4>Live Opportunities</h4>
                          <div className="filters" id="filter">
                            <div className="fil_container">
                              <div className="fil_inner">

                                <div className="fil_cnt">
                                  <div className="fil_items">
                                    <div className="sec_fil">

                                      <select className="select_input">
                                        <option value="">Sector</option>
                                      </select>
                                      <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        role="presentation"
                                        className="icon icon-caret"
                                        viewBox="0 0 10 6"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
                                          fill="currentColor"
                                        />
                                      </svg>

                                    </div>

                                    <div className="sec_fil">

                                      <select className="select_input">
                                        <option value="">Minimum</option>
                                        <option value="">ALL</option>
                                        <option value="">5000</option>
                                        <option value="">5,001 - 10,000</option>
                                        <option value="">10,001 - 20,000</option>
                                        <option value=""> {'>'} 20,000</option>
                                      </select>
                                      <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        role="presentation"
                                        className="icon icon-caret"
                                        viewBox="0 0 10 6"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
                                          fill="currentColor"
                                        />
                                      </svg>
                                    </div>

                                  </div>

                                  <div className="camp_search">
                                    <div className="search_cnt">
                                      <div className="srch_icn">
                                        <svg className="" focusable="false" aria-hidden="true" viewBox="0 0 20 20"><path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM19 19l-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"></path></svg>
                                      </div>
                                      <input type="text" id="Search" placeholder="Search" className="" value={searchTerm}
                                        onChange={handleSearch} />
                                    </div>
                                  </div>

                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="card_lists">
                            <div className="sec_head">
                              <h5>CSOP campaigns</h5>
                              <p className="sub_head">Explore what is trendings</p>
                            </div>

                            {Startup_loading && (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  fontSize: "40px",
                                  fontWeight: "bold",
                                  marginTop: "10px",
                                  marginBottom: "10px"
                                }}
                              >
                                <p>Loading.....</p>
                              </div>
                            )}

                            <div className="all_camps">
                              {Startup_data &&
                                searchResults.map((datas, index) =>
                                  <CardList dispatch={dispatch} key={index} datas={datas} index={index} />
                                )}
                            </div>
                          </div>


                          <div className="card_lists">
                            <div className="sec_head">
                              <h5>Discounting</h5>
                              <p className="sub_head">Explore what is trendings</p>
                            </div>

                            {Startup_loading && (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  fontSize: "40px",
                                  fontWeight: "bold",
                                  marginTop: "10px",
                                  marginBottom: "10px"
                                }}
                              >
                                <p>Loading.....</p>
                              </div>
                            )}

                            <div className="all_camps">
                              {Startup_data &&
                                searchResults.map((datas, index) =>
                                  <CardList dispatch={dispatch} key={index} datas={datas} index={index} />
                                )}
                            </div>
                          </div>


                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Error While response problem */}
                {Startup_error && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      color: "blue",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    <span>Error.....</span>
                  </div>
                )}
              </div>



            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Card;
