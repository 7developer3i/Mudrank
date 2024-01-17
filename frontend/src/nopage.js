import React from "react";
import { useNavigate } from "react-router-dom";
import portfolio from "./images/no_invest.png";

const NoPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="explore_container subscribe_container">
        <div className="bcontainer">
          <div className="explore_inner">
            <div className="explore_cnt">
              <div className="inner_container">
                <section className="myprofile">
                  <div className="bcontainer">
                    <div className="sec_container">
                      <div className="inner_img backimg">
                        <div className="sec_inner">
                          <div
                            className="live_tab_data"
                            style={{ justifyContent: "center" }}
                          >
                            <div className="mypro_inner">
                              <div className="no_item">
                                <div className="no_img">
                                  <div
                                    className="backimg"
                                    style={{
                                      backgroundImage: `url(${portfolio})`,
                                    }}
                                  >
                                    <svg
                                      className="transparent_svg"
                                      data-name="Layer 1"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 311 211"
                                    >
                                      <rect
                                        className="cls-1"
                                        x="0.5"
                                        y="0.5"
                                        width="310"
                                        height="210"
                                      ></rect>
                                    </svg>
                                  </div>
                                </div>
                                <div className="no_cnt">
                                  <h5>404 Error</h5>
                                  <p> There's NOTHING here......</p>
                                </div>
                                <div className="foem-input">
                                  <button
                                    onClick={() => navigate("/")}
                                    className="button wclr bblk"
                                  >
                                    Back to home{" "}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
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

export default NoPage;
