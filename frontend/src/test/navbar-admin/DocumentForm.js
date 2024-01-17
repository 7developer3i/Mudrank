import React, { useContext, useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  Container,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import AuthContext from "../../context/AuthContext";

const DocumentForm = ({moa,setMoa,coi,setCoi,aoa,setAoa,reports,setReports}) => {
 
  const {files, setFiles, docsType, setdocsType,selectedDocuments, setSelectedDocuments} = useContext(AuthContext);

  const handleDocumentCheckboxChange = (documentType) => {
    setSelectedDocuments((prevSelected) => {
      if (prevSelected.includes(documentType)) {
        return prevSelected.filter((doc) => doc !== documentType);
      } else {
        return [...prevSelected, documentType];
      }
    });
  };
  // console.log("moa",moa,coi,aoa,reports);
  console.log("selecteddocument",selectedDocuments);
 const handleFileChange = (e)=>{
  const selectedFiles = e.target.files;
  setFiles([...files, ...selectedFiles]);
 }

  const renderFileInputField = (documentType) => {
    if (selectedDocuments.includes(documentType)) {
      return (
        <Grid item xs={12} key={documentType}>
          <TextField
            fullWidth
            type="file"
            onChange={handleFileChange} multiple
            accept=".pdf,.doc,.docx"
            label={`${documentType} File`}
            id={`${documentType}-file`}
          />
        </Grid>
      );
    }
    return null;
  };

  return (
    <Container>
      <Typography variant="h4" style={{ marginBottom: "5px" }}>
        Documents
      </Typography>
      <Grid item xs={12} sm={6}>

      <FormControlLabel
        control={
          <Checkbox
            value={moa}
            onChange={(e) => {
              handleDocumentCheckboxChange("MOA",e.target.checked);
              setMoa(true);
            }}
          />
        }
        label="Memorandum of Association (MOA)"
      />
     
      <FormControlLabel
        control={
          <Checkbox
            value={coi}
            onChange={(e) => {handleDocumentCheckboxChange("COI",e.target.checked); 
            setCoi(true)}}
          />
        }
        label="Certificate of Incorporation (COI)"
      />
     </Grid>
     <Grid item xs={12} sm={6}>

      <FormControlLabel
        control={
          <Checkbox
            value={aoa}
            onChange={(e) => {handleDocumentCheckboxChange("AOA"); setAoa(e.target.checked)}}
          />
        }
        label="Articles of Association (AOA)"
      />
    
      <FormControlLabel
        control={
          <Checkbox
            value={reports}
            onChange={(e) => {handleDocumentCheckboxChange("Reports"); setReports(e.target.checked)}}
          />
        }
        label="Reports"
      />
      </Grid>

      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        {renderFileInputField("MOA")}
        {renderFileInputField("COI")}
        {renderFileInputField("AOA")}
        {renderFileInputField("Reports")}
      </Grid>
    </Container>
  );
};

export default DocumentForm;
