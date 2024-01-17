import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BaseUrl } from "../../apis/contant";

const Documents = () => {
  const startup_document = useSelector((state) => state.apiData.documents);

  const [filepath, setFilePath] = useState("");
  const [document_startup_id, setDocument_Startup_Id] = useState("");
  const [docs_path, setDocs_Path] = useState("");
  const [docs_type, setDocs_Type] = useState("");

  useEffect(() => {
    if (startup_document !== null && startup_document.length > 0) {
      setFilePath(startup_document[0].file_path);
      setDocument_Startup_Id(startup_document[0].startup_id);
    }
  }, [startup_document]);

  const Open_Docs = (e) => {
    // e.preventDefault();

    const GetId = e.target.id;
    const data = {
      type: GetId,
      startupId: document_startup_id,
    };
    axios
      .post(`${BaseUrl.url}auth/documents/type`, data)
      .then((res) => {
        setDocs_Path(res.data[0].file_path);
        const Type = res.data[0].document_type;
        setDocs_Type(Type);
      })
      .catch((err) => console.log(err));
    if (docs_type !== "") {
      document.getElementById(docs_type).click();
      setDocs_Path("")
      setDocs_Type("")
    }
  };

  useEffect(() => {
    if (docs_type !== "") {
      document.getElementById(docs_type).click();
      setDocs_Path("")
      setDocs_Type("")
    }
  }, [docs_type]);

  return (
    <section className="docs_sec mrg60">
      <a
        id={docs_type}
        href={`${BaseUrl.url}${docs_path}`}
        target="_blank" rel="noreferrer"
      />
      <div className="bcontainer">
        <div className="inner_container">
          <div className="sec_inner">
            <h5 className="sec_tt">Documents</h5>

            <div className="docs_lists">

            <div className="doc_item">
                <div className="doc_head">
                  <p className="doc_tt">
                    COI
                  </p>
                  <p className="doc_subtt ssl">
                    Certificate of Incorporation
                  </p>
                </div>
                <div onClick={Open_Docs}>
                  <svg
                    className="svg"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 22 28"
                    width="22"
                    height="28"
                    fill="none"
                    id="COI"
                  >
                    <g>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.75 0.2164C14.6307 0.0811789 14.467 0 14.2974 0H4.14305C2.26931 0 0.722656 1.65708 0.722656 3.67239V24.3274C0.722656 26.3429 2.26932 28 4.14305 28H17.9251C19.7989 28 21.3455 26.3429 21.3455 24.3274V7.92646C21.3455 7.7507 21.2701 7.58172 21.1632 7.45309L14.75 0.2164ZM14.934 2.3877L19.2284 7.23693H16.4368C15.6068 7.23693 14.934 6.52003 14.934 5.62731V2.3877ZM17.9267 26.6472H4.14465C2.96897 26.6472 1.98176 25.599 1.98176 24.3273V3.67227C1.98176 2.40762 2.96262 1.35254 4.14465 1.35254H13.6764V5.62694C13.6764 7.2703 14.9089 8.58926 16.4367 8.58926H20.0896V24.3273C20.0896 25.599 19.1088 26.6472 17.9267 26.6472V26.6472Z"
                        fill="#0C59BD"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.9032 21.9805H6.28364C5.96226 21.9805 5.69922 22.2846 5.69922 22.6568C5.69922 23.0287 5.96227 23.3331 6.28364 23.3331H15.9091C16.2305 23.3331 16.4936 23.0287 16.4936 22.6568C16.4936 22.2846 16.2305 21.9805 15.9032 21.9805H15.9032Z"
                        fill="#0C59BD"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.2497 19.5526C10.3817 19.6878 10.562 19.769 10.7562 19.769C10.9507 19.769 11.131 19.6878 11.2628 19.5526L15.3294 15.2985C15.5931 15.0278 15.5723 14.595 15.2948 14.3449C15.0171 14.0879 14.573 14.108 14.3163 14.3786L11.4502 17.3747V9.98931C11.4502 9.61717 11.1378 9.31299 10.7562 9.31299C10.3747 9.31299 10.0623 9.61717 10.0623 9.98931V17.3747L7.20317 14.3786C6.9395 14.1082 6.50221 14.0879 6.22473 14.3449C5.9472 14.6019 5.92638 15.0281 6.19006 15.2985L10.2497 19.5526Z"
                        fill="#0C59BD"
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>

              <div className="doc_item">
                <div className="doc_head">
                  <p className="doc_tt">
                  MOA
                  </p>
                  <p className="doc_subtt ssl">
                  Memorandum of Association
                  </p>
                </div>
                <div onClick={Open_Docs}>
                  <svg
                    className="svg"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 22 28"
                    width="22"
                    height="28"
                    fill="none"
                    id="MOA"
                  >
                    <g>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.75 0.2164C14.6307 0.0811789 14.467 0 14.2974 0H4.14305C2.26931 0 0.722656 1.65708 0.722656 3.67239V24.3274C0.722656 26.3429 2.26932 28 4.14305 28H17.9251C19.7989 28 21.3455 26.3429 21.3455 24.3274V7.92646C21.3455 7.7507 21.2701 7.58172 21.1632 7.45309L14.75 0.2164ZM14.934 2.3877L19.2284 7.23693H16.4368C15.6068 7.23693 14.934 6.52003 14.934 5.62731V2.3877ZM17.9267 26.6472H4.14465C2.96897 26.6472 1.98176 25.599 1.98176 24.3273V3.67227C1.98176 2.40762 2.96262 1.35254 4.14465 1.35254H13.6764V5.62694C13.6764 7.2703 14.9089 8.58926 16.4367 8.58926H20.0896V24.3273C20.0896 25.599 19.1088 26.6472 17.9267 26.6472V26.6472Z"
                        fill="#0C59BD"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.9032 21.9805H6.28364C5.96226 21.9805 5.69922 22.2846 5.69922 22.6568C5.69922 23.0287 5.96227 23.3331 6.28364 23.3331H15.9091C16.2305 23.3331 16.4936 23.0287 16.4936 22.6568C16.4936 22.2846 16.2305 21.9805 15.9032 21.9805H15.9032Z"
                        fill="#0C59BD"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.2497 19.5526C10.3817 19.6878 10.562 19.769 10.7562 19.769C10.9507 19.769 11.131 19.6878 11.2628 19.5526L15.3294 15.2985C15.5931 15.0278 15.5723 14.595 15.2948 14.3449C15.0171 14.0879 14.573 14.108 14.3163 14.3786L11.4502 17.3747V9.98931C11.4502 9.61717 11.1378 9.31299 10.7562 9.31299C10.3747 9.31299 10.0623 9.61717 10.0623 9.98931V17.3747L7.20317 14.3786C6.9395 14.1082 6.50221 14.0879 6.22473 14.3449C5.9472 14.6019 5.92638 15.0281 6.19006 15.2985L10.2497 19.5526Z"
                        fill="#0C59BD"
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>

              <div className="doc_item">
                <div className="doc_head">
                  <p className="doc_tt">
                  AOA
                  </p>
                  <p className="doc_subtt ssl">
                  Article of Association
                  </p>
                </div>
                <div onClick={Open_Docs}>
                  <svg
                    className="svg"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 22 28"
                    width="22"
                    height="28"
                    fill="none"
                    id="AOA"
                  >
                    <g>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.75 0.2164C14.6307 0.0811789 14.467 0 14.2974 0H4.14305C2.26931 0 0.722656 1.65708 0.722656 3.67239V24.3274C0.722656 26.3429 2.26932 28 4.14305 28H17.9251C19.7989 28 21.3455 26.3429 21.3455 24.3274V7.92646C21.3455 7.7507 21.2701 7.58172 21.1632 7.45309L14.75 0.2164ZM14.934 2.3877L19.2284 7.23693H16.4368C15.6068 7.23693 14.934 6.52003 14.934 5.62731V2.3877ZM17.9267 26.6472H4.14465C2.96897 26.6472 1.98176 25.599 1.98176 24.3273V3.67227C1.98176 2.40762 2.96262 1.35254 4.14465 1.35254H13.6764V5.62694C13.6764 7.2703 14.9089 8.58926 16.4367 8.58926H20.0896V24.3273C20.0896 25.599 19.1088 26.6472 17.9267 26.6472V26.6472Z"
                        fill="#0C59BD"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.9032 21.9805H6.28364C5.96226 21.9805 5.69922 22.2846 5.69922 22.6568C5.69922 23.0287 5.96227 23.3331 6.28364 23.3331H15.9091C16.2305 23.3331 16.4936 23.0287 16.4936 22.6568C16.4936 22.2846 16.2305 21.9805 15.9032 21.9805H15.9032Z"
                        fill="#0C59BD"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.2497 19.5526C10.3817 19.6878 10.562 19.769 10.7562 19.769C10.9507 19.769 11.131 19.6878 11.2628 19.5526L15.3294 15.2985C15.5931 15.0278 15.5723 14.595 15.2948 14.3449C15.0171 14.0879 14.573 14.108 14.3163 14.3786L11.4502 17.3747V9.98931C11.4502 9.61717 11.1378 9.31299 10.7562 9.31299C10.3747 9.31299 10.0623 9.61717 10.0623 9.98931V17.3747L7.20317 14.3786C6.9395 14.1082 6.50221 14.0879 6.22473 14.3449C5.9472 14.6019 5.92638 15.0281 6.19006 15.2985L10.2497 19.5526Z"
                        fill="#0C59BD"
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>

              <div className="doc_item">
                <div className="doc_head">
                  <p className="doc_tt">
                  Report
                  </p>
                  <p className="doc_subtt ssl">
                  Risk Report
                  </p>
                </div>
                <div onClick={Open_Docs}>
                  <svg
                    className="svg"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 22 28"
                    width="22"
                    height="28"
                    fill="none"
                    id="Report"
                  >
                    <g>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.75 0.2164C14.6307 0.0811789 14.467 0 14.2974 0H4.14305C2.26931 0 0.722656 1.65708 0.722656 3.67239V24.3274C0.722656 26.3429 2.26932 28 4.14305 28H17.9251C19.7989 28 21.3455 26.3429 21.3455 24.3274V7.92646C21.3455 7.7507 21.2701 7.58172 21.1632 7.45309L14.75 0.2164ZM14.934 2.3877L19.2284 7.23693H16.4368C15.6068 7.23693 14.934 6.52003 14.934 5.62731V2.3877ZM17.9267 26.6472H4.14465C2.96897 26.6472 1.98176 25.599 1.98176 24.3273V3.67227C1.98176 2.40762 2.96262 1.35254 4.14465 1.35254H13.6764V5.62694C13.6764 7.2703 14.9089 8.58926 16.4367 8.58926H20.0896V24.3273C20.0896 25.599 19.1088 26.6472 17.9267 26.6472V26.6472Z"
                        fill="#0C59BD"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.9032 21.9805H6.28364C5.96226 21.9805 5.69922 22.2846 5.69922 22.6568C5.69922 23.0287 5.96227 23.3331 6.28364 23.3331H15.9091C16.2305 23.3331 16.4936 23.0287 16.4936 22.6568C16.4936 22.2846 16.2305 21.9805 15.9032 21.9805H15.9032Z"
                        fill="#0C59BD"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.2497 19.5526C10.3817 19.6878 10.562 19.769 10.7562 19.769C10.9507 19.769 11.131 19.6878 11.2628 19.5526L15.3294 15.2985C15.5931 15.0278 15.5723 14.595 15.2948 14.3449C15.0171 14.0879 14.573 14.108 14.3163 14.3786L11.4502 17.3747V9.98931C11.4502 9.61717 11.1378 9.31299 10.7562 9.31299C10.3747 9.31299 10.0623 9.61717 10.0623 9.98931V17.3747L7.20317 14.3786C6.9395 14.1082 6.50221 14.0879 6.22473 14.3449C5.9472 14.6019 5.92638 15.0281 6.19006 15.2985L10.2497 19.5526Z"
                        fill="#0C59BD"
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>



            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Documents;
