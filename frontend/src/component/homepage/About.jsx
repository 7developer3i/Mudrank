import React, { useState, useEffect } from "react";
import whatbanner from "../../images/what_banner.png";
import team from "../../images/team.jpg";
import banner from "../../images/banner.png";
import axios from "axios";
import { BaseUrl } from "../../apis/contant";

export function About() {
  const [founderData, setFounderData] = useState([]);
  const [htmlContent, setHtmlContent] = useState("");
  const [aboutData,setAboutData] = useState("")

  useEffect(() => {
    axios
      .get(`${BaseUrl.url}about`)
      .then((response) => {
        setFounderData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${BaseUrl.url}mission`)
      .then((res) => {
        setHtmlContent(res.data.results[0].content);

      })
      .catch((err) => {
        console.log("err", err);
      });

      axios.get(`${BaseUrl.url}sendHtmlAndSave`).then((res)=>{
        setAboutData(res.data.results[0].content)
      }).catch((err)=>{
        console.log("err",err);
      })
  },[]);

  return (
    <>
      <section className="whatis abt_us">
        <div className="bcontainer">
          <div className="what_banner">
            <div
              className="backimg"
              style={{ backgroundImage: `url(${whatbanner})` }}
            >
              <div className="inner_container">
                <div className="what_head">
                  <h4>About Us</h4>
                  <h5>
                  Welcome to mudrank, where innovation meets security in the world of cryptocurrencies. Established with a vision to simplify and enhance the crypto experience for enthusiasts, traders, and investors, we are dedicated to providing a cutting-edge platform that empowers users in their journey through the dynamic realm of digital assets.
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        style={{ color: "white" }}
        dangerouslySetInnerHTML={{ __html: aboutData }}
      ></div>
      <div
        style={{ color: "white" }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      ></div>
      <section className="our_mission mrg77">
        <div className="bcontainer">
          <div className="our_mission_inner inner_container">
            <h5 className="prm">Our Mission</h5>
            <h6 className="wclr">
            At mudrank, our mission is to foster financial inclusion and empower individuals to navigate the ever-evolving landscape of cryptocurrencies with confidence. We strive to be a catalyst for positive change by offering a user-centric platform that combines advanced technology with a commitment to security, transparency, and education.
            </h6>
          </div>
        </div>
      </section>

      <section className="meet_team">
        <div className="bcontainer">
          <div
            className="inner_img backimg"
            style={{ backgroundImage: `url(${banner})` }}
          >
            <div className="commit_cnt">
              <div className="cmt_head">
                <h4>Meet the founders</h4>
              </div>
              <div className="teem_members">
                {founderData &&
                  founderData.map((item, index) => (
                    <div className="team_member">
                      <div className="team_img">
                        <div
                          className="backimg"
                          style={{ backgroundImage: `url(${team})` }}
                        >
                          {/* <svg
                        className="transparent_svg"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 251 251"
                      >
                        <rect
                          className="cls-1"
                          x="0.5"
                          y="0.5"
                          width={250}
                          height={250}
                        />
                      </svg> */}
                          <img src={`${BaseUrl.url}${item.image}`} />
                        </div>
                      </div>
                      <div className="team_info">
                        <div className="team_tt">
                          <div className="tt_inner">
                            <div className="point_head">
                              <h6 className="prm">{item.textone}</h6>
                              <p className="wclr sml">{item.heading}</p>
                            </div>
                          </div>
                        </div>
                        <div className="team_desc">
                          <p className="wclr">{item.paratext}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
