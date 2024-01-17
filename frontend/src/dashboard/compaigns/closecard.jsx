import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { open_Data_View_Index } from "../../feature/dashboard/admindetails/view/viewSlice";

import whatbanner from "../../images/what_banner.png"


function ClosedList({ datas, index, dispatch }) {

  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

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
        onClick={() => ''}
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
                  <img src={datas.img_url} />
                </div>
                <div className="card_heading">
                  <p> {datas.company_name}</p>
                </div>
              </div>
              {/* <p className="card_desc sml">
                {datas.description.substring(0, datas.description.length / 3) +
                  "..."}
              </p> */}

              <div className="subs_desc">
                <div className="subs_info">
                  <p className="ssl">
                    Anchor
                  </p>
                  <p className="">
                    Khari Foods
                  </p>
                </div>
                <div className="subs_info">
                  <p className="ssl">
                    Tenure
                  </p>
                  <p className="">
                    45 days
                  </p>
                </div>
              </div>

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

          {/* <div
            // onMouseLeave={handleMouseLeave}
            ref={cardRef}
            // className={isHovered ? "css-1w9vtzz" : "css-1iuf1kw"}
            className={`card_${isHovered ? "visible" : "ovr"}`}
          >
            <div>
              <div className="card_tt">
                <div className="card_tt_img">
                  <img src={datas.img_url} />
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
                    10 days
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
          </div> */}

        </div>
      </div>
    </div>
  );
}

const CloseCard = () => {
  const Startup_loading = useSelector((state) => state.apiData.loading);
  const Startup_data = useSelector((state) => state.apiData.close_data);
  const Startup_error = useSelector((state) => state.apiData.error);

  const dispatch = useDispatch();

  return (
    <section className="explore_container subscribe_container mrg60">
      <div className="bcontainer">
        <div className="inner_container">

          <section className="subscribe_lists">
            <div className="bcontainer">
              <div className="sec_container">

                <div className="inner_img backimg" style={{ backgroundImage: `url(${whatbanner})` }}>

                  <div className="sec_inner">
                    <h5> Closed campaigns</h5>
                    <p>Wall of successful startups</p>



                    <div style={{ display: "grid", justifyContent: "center" }}>
                      {Startup_data && Startup_data.result.length === 0 ? <p>No data display</p> : ""}
                    </div>

                    <div className="all_camps">

                      {Startup_data &&
                        Startup_data.result.map((datas, index) => (
                          <ClosedList key={index} index={index} datas={datas} dispatch={dispatch} />
                        ))}

                    </div>

                    {/* Error While response problem */}
                    {Startup_error && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          fontSize: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        <p>Error.....</p>
                      </div>
                    )}



                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default CloseCard;
