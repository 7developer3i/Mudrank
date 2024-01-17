import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";

const DocumentForm = () => {

  const authState = useContext(AuthContext);
  const { setStartup_Documents, startup_document } = authState;

  const [selectedDocuments, setSelectedDocuments] = useState([]);

  const handleDocumentCheckboxChange = (event) => {
    const documentType = event.target.value;
    if (event.target.checked) {
      setSelectedDocuments([...selectedDocuments, documentType]);
    } else {
      setSelectedDocuments(
        selectedDocuments.filter((doc) => doc !== documentType)
      );
    }
  };

  const handleDocumentFileChange = (event, documentType) => {
    const newFiles = [...event.target.files];
    const uploadedFiles = newFiles.map(file => ({
      file: file,
      documentType: documentType
    }));
    setStartup_Documents([...startup_document, ...uploadedFiles]);
  };

  const renderFileInputField = (documentType) => {
    if (selectedDocuments.includes(documentType)) {
      return (
        <div className="form_input">
          <label
            htmlFor={`${documentType}-file`}
            style={{ fontWeight: "revert" }}
          >
            {documentType} File:
          </label>

          <div className="file_upd">
            <div className="file_upd_inner">
              <div className="file-data-box">

                <div className="file-upload">
                  <div className="file-upload-box">
                    <input type="file" id={`${documentType}-file`} className="file-upload-input" accept=".pdf,.doc,.docx" onChange={(event) => handleDocumentFileChange(event, documentType)} />
                    <p>Drag and drop or <span className="file-link">Choose your file</span></p>
                  </div>
                </div>
                {/* <div className="form-input">
                  <label
                    htmlFor={`${documentType}-file`}
                    style={{ fontWeight: "revert" }}
                  >
                    {documentType} File:
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    id={`${documentType}-file`}
                    onChange={(event) => handleDocumentFileChange(event, documentType)}
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="page_head">
        <h4>Documents</h4>
      </div>

      <div style={{ marginBottom: "5px" }} className="form-input">
        <input
          value="MOA"
          onChange={handleDocumentCheckboxChange}
          type="checkbox"
          className="styled-checkbox"
          id="MOA"
        />
        <label
          style={{ color: "black", fontWeight: "bold" }}
          className="styled-checkbox-1"
          for="MOA"
        >
          Memorandum of Association (MOA)
        </label>
      </div>

      <div style={{ marginBottom: "5px" }} className="form-input">
        <input
          value="COI"
          onChange={handleDocumentCheckboxChange}
          type="checkbox"
          className="styled-checkbox"
          id="COI"
        />
        <label
          style={{ color: "black", fontWeight: "bold" }}
          className="styled-checkbox-1"
          for="COI"
        >
          Certificate of Incorporation (COI)
        </label>
      </div>

      <div style={{ marginBottom: "5px" }} className="form-input">
        <input
          value="AOA"
          onChange={handleDocumentCheckboxChange}
          type="checkbox"
          className="styled-checkbox"
          id="AOA"
        />
        <label
          style={{ color: "black", fontWeight: "bold" }}
          className="form-check-label"
          for="AOA"
        >
          Articles of Association (AOA)
        </label>
      </div>

      <div style={{ marginBottom: "5px" }} className="form-input">
        <input
          value="Reports"
          onChange={handleDocumentCheckboxChange}
          type="checkbox"
          className="styled-checkbox"
          id="report"
        />
        <label
          style={{ color: "black", fontWeight: "bold" }}
          className="form-check-label"
          for="report"
        >
          Reports
        </label>
      </div>

      <div style={{ marginTop: "20px" }}>
        {renderFileInputField("MOA")}
        {renderFileInputField("COI")}
        {renderFileInputField("AOA")}
        {renderFileInputField("Reports")}
      </div>
    </>
  );
};

export default DocumentForm;
