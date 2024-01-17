import React, { useContext, useEffect, useState } from "react";
import { TextField, Button, Typography, Container, Grid } from "@mui/material";
import DocumentForm from "./DocumentForm.js"; // Import your DocumentForm component
import HighlightSection from "./HighlightSection.js";
import axios from "axios";
import { BaseUrl } from "../../apis/contant";
import AuthContext from "../../context/AuthContext.js";
import Popop from "../navbar-admin/sections/customer/popop.jsx";
import { date } from "yup";

export const Startupaddform = ({
  handleHighlightChange,
  handleRemoveHighlight,
  handleAddHighlight,
}) => {
  const {
    highlights,
    files,
    docsType,
    openpopmodal,
    setOpenpopmodal,
    popopmessage,
    setPopopmessage,
    selectedDocuments
  } = useContext(AuthContext);
  const [customerName, setCustomerName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [contactinfo, setContactinfo] = useState("");
  const [description, setDescription] = useState("");
  const [companyaddress, setCompanyaddress] = useState("");
  const [fundingtimelimit, setFundingtimelimit] = useState("");
  const [videourl, setVideourl] = useState("");
  const [logourl, setLogourl] = useState("");
  const [thumbnailurl, setThumbnailurl] = useState("");
  const [investmentgoal, setInvestmentgoal] = useState("");
  const [discount, setDiscount] = useState("");
  const [valuationcap, setValuationcap] = useState("");
  const [target, setTarget] = useState("");
  const [enddate, setEnddate] = useState("");
  const [subscription, setSubscription] = useState("");
  const [moa, setMoa] = useState("");
  const [coi, setCoi] = useState("");
  const [aoa, setAoa] = useState("");
  const [reports, setReports] = useState("");
  const [title, setTitle] = useState("");
  const [describe, setDescribe] = useState("");
  const [customerNameError, setCustomerNameError] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [companyEmailError, setCompanyEmailError] = useState("")
  const [contactinfoError, setContactinfoError] = useState("")
  const [descriptionError, setDescriptionError] = useState("")
  const [companyeddressError, setCpmpanyeddressError] = useState("")
  const [fundingError, setFundingError] = useState("")
  const [videoError, setVideoError] = useState("")
  const [logoError, setLogoError] = useState("")
  const [thumbnailError, setThumbnailError] = useState("")
  const [investmentError, setInvestmentError] = useState("")
  const [discountError, setDiscountError] = useState("")
  const [valuationcapError, setValuationcapError] = useState("")
  const [targetError, setTargetError] = useState("")
  const [dateError, setDateError] = useState("")
  const [subscriptionError, setSubscriptionError] = useState("")



  const formData = new FormData();
  formData.append("customer_name", customerName);
  formData.append("company_name", companyName);
  formData.append("company_email", companyEmail);
  formData.append("contact_info", contactinfo);
  formData.append("address", companyaddress);
  formData.append("investment_goal", investmentgoal);
  formData.append("discount", discount);
  formData.append("valuation_cap", valuationcap);
  formData.append("target", target);
  formData.append("description", description);
  formData.append("funding_time_limit", fundingtimelimit);
  formData.append("video_url", videourl);
  formData.append("logo_url", logourl);
  formData.append("img_url", thumbnailurl);
  formData.append("end_date", enddate);
  formData.append("highlight", JSON.stringify(highlights));
  formData.append("documentType", JSON.stringify(selectedDocuments));
  // Append each selected file to the FormData object
  for (const file of files) {
    formData.append("files", file);
  }
  // Add state for other form fields...

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName) {
      setCustomerNameError("Name is required");
    } else {
      setCustomerNameError("");
    }

    if (!companyName) {
      setCompanyNameError("comapny name is required");
    } else {
      setCompanyNameError("");
    }
    if (!companyEmail) {
      setCompanyEmailError("comapny email is required");
    } else {
      setCompanyEmailError("");
    }
    if (!contactinfo) {
      setContactinfoError("contact number is required");
    } else {
      setContactinfoError("");
    }
    if (!description) {
      setDescriptionError("description is required");
    } else {
      setDescriptionError("");
    }

    if (!companyaddress) {
      setCpmpanyeddressError("address is required");
    } else {
      setCpmpanyeddressError("");
    }

    if (!fundingtimelimit) {
      setFundingError("funding time limit is required");
    } else {
      setFundingError("");
    }

    if (!videourl) {
      setVideoError("video url is required");
    } else {
      setVideoError("");
    }

    if (!logourl) {
      setLogoError("logo url is required");
    } else {
      setLogoError("");
    }

    if (!thumbnailurl) {
      setThumbnailError("thumbnail url is required");
    } else {
      setThumbnailError("");
    }

    if (!investmentgoal) {
      setInvestmentError("investment goal is required");
    } else {
      setInvestmentError("");
    }

    if (!valuationcap) {
      setValuationcapError("valuation cap is required");
    } else {
      setValuationcapError("");
    }
    if (!target) {
      setTargetError("target is required");
    } else {
      setTargetError("");
    }
    if (!enddate) {
      setDateError("enddate is required");
    } else {
      setDateError("");
    }
    if (!discount) {
      setDiscountError("discount is required");
    } else {
      setDiscountError("");
    }
    if (!subscription) {
      setSubscriptionError("subscription is required");
    } else {
      setSubscriptionError("");
    }
    axios
      .post(`${BaseUrl.url}combined-api`, formData)
      .then((res) => {
        console.log("reess", res.data);
        console.log("status", res.data.status);
        setPopopmessage(res.data.message);
        if (res.data.status == 200) {
          setOpenpopmodal(true);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const Edit_func = (e) => {
    e.preventDefault();
    // Your edit function logic...
  };

  return (
    <Container>
      {openpopmodal && <Popop popopmessage={popopmessage} />}

      <div className="page_head">
        <h4 style={{ color: "white", textAlign: "center", fontSize: "50px" }}>
          Application
        </h4>
      </div>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Your Name"
              value={customerName}
              variant="outlined"
              onChange={(e) => setCustomerName(e.target.value)}
              error={!!customerNameError}
              helperText={customerNameError}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Company Name"
              value={companyName}
              variant="outlined"
              onChange={(e) => setCompanyName(e.target.value)}
              error={!!companyNameError}
              helperText={companyNameError}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Company Email"
              variant="outlined"
              value={companyEmail}
              onChange={(e) => setCompanyEmail(e.target.value)}
              error={!!companyEmailError}
              helperText={companyEmailError}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contact Info"
              variant="outlined"
              type="number"
              value={contactinfo}
              id="contact"
              onChange={(e) => setContactinfo(e.target.value)}
              error={!!contactinfoError}
              helperText={contactinfoError}
              placeholder="00000000"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Description (Optional)"
              variant="outlined"
              value={description}
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              error={!!descriptionError}
              helperText={descriptionError}
              id="description"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Company Address"
              variant="outlined"
              type="text"
              value={companyaddress}
              id="address"
              onChange={(e) => setCompanyaddress(e.target.value)}
              placeholder="1234 Main St"
              error={!!companyeddressError}
              helperText={companyeddressError}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Funding Time Limit"
              variant="outlined"
              type="text"
              id="subscribe"
              value={fundingtimelimit}
              placeholder="00 days"
              onChange={(e) => setFundingtimelimit(e.target.value)}
              error={!!fundingError}
              helperText={fundingError}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Video Url"
              variant="outlined"
              value={videourl}
              type="text"
              onChange={(e) => setVideourl(e.target.value)}
              error={!!videoError}
              helperText={videoError}
              id="Video"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Logo URL"
              variant="outlined"
              type="text"
              id="logo"
              value={logourl}
              placeholder=""
              onChange={(e) => setLogourl(e.target.value)}
              error={!!logoError}
              helperText={logoError}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Thumbnail URL"
              variant="outlined"
              type="text"
              id="thumbnail"
              value={thumbnailurl}
              placeholder="Add thumbnail"
              onChange={(e) => setThumbnailurl(e.target.value)}
              error={!!thumbnailError}
              helperText={thumbnailError}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Investment Goal"
              variant="outlined"
              type="number"
              id="investment-goal"
              value={investmentgoal}
              placeholder="000000000"
              onChange={(e) => setInvestmentgoal(e.target.value)}
              error={!!investmentError}
              helperText={investmentError}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Discount %"
              variant="outlined"
              type="text"
              value={discount}
              id="discount"
              onChange={(e) => setDiscount(e.target.value)}
              error={!!discountError}
              helperText={discountError}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Valuation Cap"
              variant="outlined"
              type="text"
              value={valuationcap}
              id="valuationCap"
              onChange={(e) => setValuationcap(e.target.value)}
              error={!!valuationcapError}
              helperText={valuationcapError}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Target"
              variant="outlined"
              type="text"
              value={target}
              id="target"
              onChange={(e) => setTarget(e.target.value)}
              error={!!targetError}
              helperText={targetError}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="End Date"
              variant="filled"
              type="date"
              value={enddate}
              id="enddate"
              onChange={(e) => setEnddate(e.target.value)}
              error={!!dateError}
              helperText={dateError}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Min Subscription '₹'"
              variant="outlined"
              type="number"
              value={subscription}
              id="minSubscription"
              onChange={(e) => setSubscription(e.target.value)}
              error={!!subscriptionError}
              helperText={subscriptionError}
            />
          </Grid>
        </Grid>
        <HighlightSection
          highlights={highlights}
          handleHighlightChange={handleHighlightChange}
          handleRemoveHighlight={handleRemoveHighlight}
          handleAddHighlight={handleAddHighlight}
          title={title}
          setTitle={setTitle}
          describe={describe}
          setDescribe={setDescribe}
        />
        <DocumentForm
          moa={moa}
          setMoa={setMoa}
          coi={coi}
          setCoi={setCoi}
          aoa={aoa}
          setAoa={setAoa}
          reports={reports}
          setReports={setReports}
          title={title}
          setTitle={setTitle}
          describe={describe}
          setDescribe={setDescribe}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Submit Application
          {/* {auth_startup_data.length === 0 ? 'Submit Application' : 'Update Application'} */}
        </Button>
      </form>
    </Container>
  );
};

export default Startupaddform;
