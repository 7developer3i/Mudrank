import mudrank from "../../images/Mudrank.svg";
import twitter from "../../images/twitter.svg";
import fb from "../../images/fb.svg";
import linkedin from "../../images/linkedin.svg";
import yt from "../../images/yt.svg";
import chat from "../../images/chat.svg";
import tiktok from "../../images/tiktok.svg";
import git from "../../images/git.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../../apis/contant";

export const Footer = () => {
  const socialItem = [twitter, fb, linkedin, yt, chat, tiktok, git];
  const [FooterData, setFooterData] = useState("");

  useEffect(() => {
    const FetchfooterData = () => {
      axios
        .post(`${BaseUrl.url}footer_data`, { data: FooterData })
        .then((res) => {
        })
        .catch((err) => {
          console.log("err", err);
        });
    };
    axios
      .get(`${BaseUrl.url}footer_data`)
      .then((res) => {
        setFooterData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <>
      <footer>
        <div className="bcontainer mrg77">
          <div className="foo_inner">
            <div className="foo_abt">
              <div className="foo_logo">
                <a href="/">
                  <div
                    className="backimg"
                    style={{ backgroundImage: `url(${mudrank})` }}
                  >
                    <svg
                      className="transparent_svg"
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 175 36"
                    >
                      <rect
                        className="cls-1"
                        x="0.5"
                        y="0.5"
                        width="174"
                        height="35"
                      ></rect>
                    </svg>
                  </div>
                </a>
              </div>
              <div className="foo_desc">
                <p>
                  Mudrank is an investor-first, technology-driven,
                  transparency-focused digital investment platform for curated
                  non-market linked alternative investment opportunities across
                  the entire risk-reward spectrum that best cater to an
                  investor’s wealth creation.
                </p>
              </div>
              <div className="foo_social">
                <div className="social_inner">
                  
                    {socialItem &&
                      socialItem.map((data, index) => (
                        <div className="sc_item" key={index}>
                          <a href="#">
                            <img src={data} />
                          </a>
                        </div>
                      ))}
                  </div>
              </div>
            </div>

            <div className="foo_menus">
              <div className="foo_menus_inner foo_desc">
              {/* <div className="foo_desc"> */}
                {FooterData &&
                  FooterData.map((item, index) => (
                    <div className="fmenu_item">
                      {JSON.parse(item.name).map((items, index) => (
                        <li className="text-white" key={index} href="#">
                          {items}
                        </li>
                      ))}
                    </div>
                  ))}
              </div>
              {/* </div> */}

            </div>
          </div>

          <div className="foo_copy">
            <div className="bcontainer">
              <div className="copy_inner">
                <p className="sml">
                  Made with love in India | Copyright © 2023, Mudrank{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
