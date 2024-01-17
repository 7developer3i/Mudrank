// import React, { useEffect, useState } from "react";
// import whatbanner from "../../images/what_banner.png";
// import axios from "axios"; // Import Axios
// import { BaseUrl } from "../../apis/contant";

// export const MudrankAbout = () => {
//     const [htmlContent, setHtmlContent] = useState('');
//     useEffect(() => {
//         axios.get(`${BaseUrl.url}sendHtmlAndSave`)
//           .then((response) => {
//             setHtmlContent(response.data)
//           })
//           .catch((error) => {
//             console.error('Error fetching HTML:', error);
//           });
//       }, []);

//   return (
//     <div>
//            <div style={{color:"white"}} dangerouslySetInnerHTML={{ __html: htmlContent }} />

//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import { BaseUrl } from "../../apis/contant";
import { AboutPageEditMOdal } from "./edit";

const MudrankAbout = () => {
  const [htmlContent, setHtmlContent] = useState("");
  const [aboutvalue, setAboutValue] = useState("");
  useEffect(() => {
    axios
      .get(`${BaseUrl.url}sendHtmlAndSave`)
      .then((response) => {
        setHtmlContent(response.data);
        setAboutValue(htmlContent.results[0].content)
      })
      .catch((error) => {
        console.error("Error fetching HTML:", error);
      });
  }, []);

  const editData = ()=>{
      axios.put(`${BaseUrl.url}sendHtmlAndSave/11`, {content:aboutvalue}).then((res)=>{
      }).catch((err)=>{
        console.log("err",err);
      })
  }
  return (
    <div>
      
      <div className="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 py-5">
        <div className="w-full max-w-6xl mx-auto rounded-xl bg-white shadow-lg p-5 text-black">
          <div className="border border-gray-200 overflow-hidden rounded-md">
            <div className="w-full">
              <div
                style={{ color: "black" }}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>
            {htmlContent && (
              <textarea
                onChange={(e) => setAboutValue(e.target.value)}
                rows={20}
                cols={150}
                value={aboutvalue}
              />
            )}
            <button
              onClick={() => editData()}
              type="button"
              class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MudrankAbout;
