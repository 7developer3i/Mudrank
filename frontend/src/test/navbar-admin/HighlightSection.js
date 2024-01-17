import React, { useContext, useState } from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import AuthContext from "../../context/AuthContext";

const HighlightSection = ({
  handleRemoveHighlight,
  handleAddHighlight,
  title,setTitle,setDescribe,describe
}) => {
    const authState = useContext(AuthContext);

    const { highlights, setHighlights } = authState;

    function handleAddHighlight() {
        setHighlights([...highlights, { key: "", value: "" }]);
      };
    
      function handleRemoveHighlight(index) {
        setHighlights(highlights.filter((highlight, i) => i !== index));
      };
      const handleHighlightChange = (index, key, value) => {
        const updatedHighlights = [...highlights];
        updatedHighlights[index] = { ...updatedHighlights[index], [key]: value };
        setHighlights(updatedHighlights);

      };
      console.log(highlights, "highlights..");
  return (
    <Grid container spacing={2} style={{margin:"40px 0"}}>
      <Grid item xs={12}>
          <Typography variant="h4" style={{ marginBottom: "10px",color:"white" }}>
            Highlights
          </Typography>

          <Grid container spacing={2}>
            {highlights && highlights.map((highlight, index) => (
              <Grid item xs={12} key={index}>
                {/* <Paper elevation={3} style={{ padding: '20px', marginBottom: '10px' }}> */}
                  <TextField
                    fullWidth
                    label="Title"
                    placeholder="Enter title"
                    value={title} style={{width:"50%",display:"block"}}
                    onChange={(event) =>{
                      handleHighlightChange(index, "key", event.target.value)
                      setTitle(event.target.value)}
                    }
                  />

                  <TextField
                    fullWidth
                    multiline
                    rows={5} style={{width:"50%", display:"block"}}
                    label="Describe the content"
                    placeholder="Describe the traction..."
                   value={describe}
                    onChange={(event) =>{
                      handleHighlightChange(index, "value", event.target.value)
                      setDescribe(event.target.value)}
                    }
                  />

                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginTop: '10px' }}
                    onClick={() => handleRemoveHighlight(index)}
                  >
                    Remove Highlight
                  </Button>
                {/* </Paper> */}
              </Grid>
            ))}

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddHighlight}
                style={{ color: 'white' }}
              >
                Add Highlight
              </Button>
            </Grid>
          </Grid>
        {/* </Paper> */}
      </Grid>
    </Grid>
  );
};

export default HighlightSection;
