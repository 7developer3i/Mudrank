import React, { useEffect, useState } from "react";
import whatbanner from "../../images/what_banner.png";
import axios from "axios";
import { BaseUrl } from "../../apis/contant";
import { FaqInner } from "./FaqInner";

export function Faq() {
  const [browserData, setBrowserData] = useState([]);
  const [selectedCardData, setSelectedCardData] = useState({});
  const [index,setIndex] = useState()
  const [isFaqInnerVisible, setIsFaqInnerVisible] = useState(false);
  const [isfaqvisible ,setFaqvisible] = useState(true)




  useEffect(() => {
    axios
      .get(`${BaseUrl.url}browse`)
      .then((res) => {
        setBrowserData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const handleCardClick = (cardId) => {
    // Make a GET request to fetch the details of the selected card
    axios
      .get(`${BaseUrl.url}card/${cardId}`)
      .then((res) => {
        setSelectedCardData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const contentconvert = (content, maxCharacters) => {
    if (content.length > maxCharacters) {
      return content.substring(0, maxCharacters) + '..........';
    } else {
      return content;
    }
  };
  const contentconverttwo = (content, maxCharacters) => {
    if (content.length > maxCharacters) {
      return content.substring(0, maxCharacters) + '....';
    } else {
      return content;
    }
  };

  return (
    <>
    {isfaqvisible && 
      <section className="whatis abt_us faq_list_page">
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
                <div className="topics_lists">
                  {browserData &&
                    browserData.map((data, index) => (
                      <div className="topic_item">
                        <a onClick={()=>{handleCardClick(data.id)
                        setIndex(index)
                        setIsFaqInnerVisible(true)
                        setFaqvisible(false)}
                        } key={index}>
                          <div className="titem_inner">
                            <p className="top_tt">{contentconverttwo(data.title,20)}</p>
                            <p className="sml">{contentconvert(data.describe_item,150)}</p>
                          </div>
                        </a>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>}
      {isFaqInnerVisible && (

      <FaqInner selectedCardData={selectedCardData} setSelectedCardData={setSelectedCardData} index={index}/>
      )}

    </>
  );
}
