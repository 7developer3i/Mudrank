import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import whatbanner from "../../images/what_banner.png";
import axios from "axios";
import { BaseUrl } from "../../apis/contant";


export function FaqInner({selectedCardData,index}) {
  const [activeIndex, setActiveIndex] = useState(null);
  const handleClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
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
          activeContent.style.maxHeight = activeContent.scrollHeight + "px";
        }
      });
    });
  }, []);

  return (
    <>
      <section className="whatis abt_us faq_sec">
        <div className="bcontainer">
          <div className="what_banner">
            <div
              className="backimg"
              style={{ backgroundImage: `url(${whatbanner})` }}
            >
              <div className="inner_container">
                <div className="breadcrumbs">
                  <a href="/">
                    <p>Mudrank</p>
                  </a>
                  <p className="seprator">/</p>
                  <Link to={"/faq"}>
                    <p>FAQ</p>
                  </Link>
                  <p className="seprator">/</p>
                  <p>Getting started</p>
                </div>
                <div className="faq_infos">
                  <div className="faq_tt">
                    <h5 className="faq_head">Getting started | FAQ </h5>
                  </div>
                  <div className="faq_questions">
                      <div className="faq_que">
                        <button
                          className={`faq_btn ${
                            activeIndex === index ? "active_f" : ""
                          }`}
                          onClick={() => handleClick(index)}
                        >
                          <h6>{selectedCardData.question}</h6>
                        </button>
                        <div className="faq_content">
                          <div className="inner_answer">
                            <p>{selectedCardData.answer}</p>
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
    </>
  );
}
