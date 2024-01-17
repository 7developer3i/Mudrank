import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../apis/contant";

export const Mudrankmission = () => {
  const [htmlContent, setHtmlContent] = useState("");
  const [aboutvalue, setAboutValue] = useState("");

  useEffect(() => {
    axios
      .get(`${BaseUrl.url}mission`)
      .then((res) => {
        setHtmlContent(res.data);
        setAboutValue(htmlContent.results[0].content);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const editData = ()=>{
    axios.put(`${BaseUrl.url}mission/3`, {content:aboutvalue}).then((res)=>{
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
                rows={20}
                cols={150}
                onChange={(e) => setAboutValue(e.target.value)}
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
