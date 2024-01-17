import React, { useEffect, useState } from "react";
import whatbanner from "../../images/what_banner.png";
import { BaseUrl } from "../../apis/contant";
import axios from "axios";

export function Privacy() {
    const [privacyData,setPrivacyData] = useState([])
//   const privacyData = [
//     {
//       id: 1,
//       para_item: "Information Collection and Use",
//       content: [
//         "While using our Site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to your name, email address, and phone number ('Personal Information').",
//       ],
//     },
//     {
//       id: 2,
//       para_item: "Log Data",
//       content: [
//         "Like many site operators, we collect information that your browser sends whenever you visit our Site ('Log Data'). This Log Data may include information such as your computer's Internet Protocol ('IP') address, browser type, browser version, the pages of our Site that you visit, the time and date of your visit, the time spent on those pages, and other statistics.",
//       ],
//     },
//     {
//       id: 3,
//       para_item: "Cookies",
//       content: [
//         "Cookies are files with a small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer's hard drive.",
//         "Like many sites, we use 'cookies' to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.",
//       ],
//     },
//     {
//       id: 4,
//       para_item: "Security",
//       content: [
//         "The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.",
//       ],
//     },
//     {
//       id: 5,
//       para_item: "Changes to This Privacy Policy",
//       content: [
//         "This Privacy Policy will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.",
//         "We reserve the right to update or change our Privacy Policy at any time, and you should check this Privacy Policy periodically. Your continued use of the Service after we post any modifications to the Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.",
//       ],
//     },
//     {
//       id: 6,
//       para_item: "Contact Us",
//       content: [
//         "If you have any questions about this Privacy Policy, please contact us at contact@mudrank.com.",
//       ],
//     },
//   ];

  useEffect(() => {
    axios
      .get(`${BaseUrl.url}privacy`)
      .then((response) => {
        setPrivacyData(response.data)
        // Handle the response data here
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here
      });
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
                  <h4>Privacy Policy</h4>
                </div>
                <div className="normal_txt">
                  {privacyData &&
                    privacyData.map((datas,index) => (
                      <div className="para_item">
                        <p className="bold">{datas.para_item}</p>
                       
                          <>
                            <p key={index}>{datas.content}</p>
                            <br />
                          </>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
