import React, { useEffect, useState } from "react";
import whatbanner from "../../images/what_banner.png";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogDetailsAsync,
  selectBlogs,
} from "../../feature/website/blogs/blogSlice";

export function Blog() {
  const [activeTab, setActiveTab] = useState("#tab1");
  const blogs = useSelector(selectBlogs);
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState([]);

  const handleTabClick = (e) => {
    e.preventDefault();
    const tabId = e.target.getAttribute("href");
    setActiveTab(tabId);
    if (tabId == "#tab2") {
      const data = blogs.filter((blog) => blog.type === "Investment");
      setFilteredData(data);
    } else if (tabId == "#tab3") {
      const data = blogs.filter((blog) => blog.type === "Product");
      setFilteredData(data);
    } else if (tabId == "#tab4") {
      const data = blogs.filter((blog) => blog.type === "Finance");
      setFilteredData(data);
    }
  };

  const handleTabSelection = (tabid) => {
    document.querySelectorAll(".live_tab_lists li").forEach((li) => {
      li.classList.remove("active");
    });
    document.querySelectorAll(".live_tab_data .live_tab_inn").forEach((tab) => {
      tab.classList.remove("active");
    });
    document.querySelector(".live_tab_data " + tabid).classList.add("active");
    document.querySelector(tabid).parentElement.classList.add("active");
  };

  function formatDates(inputDate) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(inputDate);
    return date.toLocaleDateString("en-US", options);
  }

  useEffect(() => {
    return () => dispatch(fetchBlogDetailsAsync());
  }, []);

  return (
    <>
      <section className="whatis abt_us blog_page">
        <div className="bcontainer">
          <div className="what_banner">
            <div
              className="backimg"
              style={{ backgroundImage: `url(${whatbanner})` }}
            >
              <div className="inner_container">
                <div className="what_head">
                  <h4>Browse by Topics</h4>
                </div>

                <div className="live_tab_lists">
                  <ul className="live_tab_inner">
                    <li
                      className={`live_items${
                        activeTab === "#tab1" ? " active" : ""
                      }`}
                    >
                      <a href="#tab1" onClick={handleTabClick}>
                        All
                      </a>
                    </li>
                    <li
                      className={`live_items${
                        activeTab === "#tab2" ? " active" : ""
                      }`}
                    >
                      <a href="#tab2" onClick={handleTabClick}>
                        Invest
                      </a>
                    </li>
                    <li
                      className={`live_items${
                        activeTab === "#tab3" ? " active" : ""
                      }`}
                    >
                      <a href="#tab3" onClick={handleTabClick}>
                        Product
                      </a>
                    </li>
                    <li
                      className={`live_items${
                        activeTab === "#tab4" ? " active" : ""
                      }`}
                    >
                      <a href="#tab4" onClick={handleTabClick}>
                        Finance
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="live_tab_data">
                  <div
                    className={`live_tab_inn${
                      activeTab === "#tab1" ? " active" : ""
                    }`}
                    id="tab1"
                  >
                    <div className="blog_lists topics_lists">
                      {blogs &&
                        blogs.map((data, index) => (
                          <div className="blog_item" key={index}>
                            <a>
                              <div className="blog_item_inner">
                                <div className="blog_img">
                                  <div
                                    className="backimg"
                                    style={{
                                      backgroundImage: `url(${data.image})`,
                                    }}
                                  >
                                    <svg
                                      className="transparent_svg"
                                      data-name="Layer 1"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 321 181"
                                    >
                                      <rect
                                        className="cls-1"
                                        x="0.5"
                                        y="0.5"
                                        width="320"
                                        height="180"
                                      ></rect>
                                    </svg>
                                  </div>
                                </div>

                                <p className="blog_tt">{data.title}</p>
                                <p className="sml">
                                  {formatDates(data.updated_date)}
                                </p>
                              </div>
                            </a>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div
                    className={`live_tab_inn${
                      activeTab === "#tab2" ? " active" : ""
                    }`}
                    id="tab2"
                  >
                    <div className="blog_lists topics_lists">
                      {filteredData &&
                        filteredData.map((data, index) => (
                          <div className="blog_item" key={index}>
                            <a>
                              <div className="blog_item_inner">
                                <div className="blog_img">
                                  <div
                                    className="backimg"
                                    style={{
                                      backgroundImage: `url(${data.image})`,
                                    }}
                                  >
                                    <svg
                                      className="transparent_svg"
                                      data-name="Layer 1"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 321 181"
                                    >
                                      <rect
                                        className="cls-1"
                                        x="0.5"
                                        y="0.5"
                                        width="320"
                                        height="180"
                                      ></rect>
                                    </svg>
                                  </div>
                                </div>

                                <p className="blog_tt">{data.title}</p>
                                <p className="sml">
                                  {formatDates(data.updated_date)}
                                </p>
                              </div>
                            </a>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div
                    className={`live_tab_inn${
                      activeTab === "#tab3" ? " active" : ""
                    }`}
                    id="tab3"
                  >
                    <div className="blog_lists topics_lists">
                    {filteredData &&
                        filteredData.map((data, index) => (
                          <div className="blog_item" key={index}>
                            <a>
                              <div className="blog_item_inner">
                                <div className="blog_img">
                                  <div
                                    className="backimg"
                                    style={{
                                      backgroundImage: `url(${data.image})`,
                                    }}
                                  >
                                    <svg
                                      className="transparent_svg"
                                      data-name="Layer 1"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 321 181"
                                    >
                                      <rect
                                        className="cls-1"
                                        x="0.5"
                                        y="0.5"
                                        width="320"
                                        height="180"
                                      ></rect>
                                    </svg>
                                  </div>
                                </div>

                                <p className="blog_tt">{data.title}</p>
                                <p className="sml">
                                  {formatDates(data.updated_date)}
                                </p>
                              </div>
                            </a>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div
                    className={`live_tab_inn${
                      activeTab === "#tab4" ? " active" : ""
                    }`}
                    id="tab4"
                  >
                    <div className="blog_lists topics_lists">
                    {filteredData &&
                        filteredData.map((data, index) => (
                          <div className="blog_item" key={index}>
                            <a>
                              <div className="blog_item_inner">
                                <div className="blog_img">
                                  <div
                                    className="backimg"
                                    style={{
                                      backgroundImage: `url(${data.image})`,
                                    }}
                                  >
                                    <svg
                                      className="transparent_svg"
                                      data-name="Layer 1"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 321 181"
                                    >
                                      <rect
                                        className="cls-1"
                                        x="0.5"
                                        y="0.5"
                                        width="320"
                                        height="180"
                                      ></rect>
                                    </svg>
                                  </div>
                                </div>

                                <p className="blog_tt">{data.title}</p>
                                <p className="sml">
                                  {formatDates(data.updated_date)}
                                </p>
                              </div>
                            </a>
                          </div>
                        ))}
                    </div>
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
