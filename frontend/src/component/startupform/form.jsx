import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import SetCookie from "../../hook/setCookie";
import RemoveCookie from "../../hook/removeCookie";
import Cookies from "js-cookie";
import axios from "axios";
import { BaseUrl } from "../../apis/contant";
import DocumentForm from "./documentform";
import whatbanner from "../../images/what_banner.png"
import { useNavigate } from "react-router-dom";

const StartupForm = () => {

  const authState = useContext(AuthContext);
  const { auth_startup_data, auth_high_lights, startup_document } = authState;

  const navigate = useNavigate();

  /* Application section */
  const [customerName, setCustomerName] = useState(
    auth_startup_data === [] ? "" : auth_startup_data.customer_name
  );
  const [companyEmail, setCompanyEmail] = useState(
    auth_startup_data === [] ? "" : auth_startup_data.company_email
  );
  const [companyName, setCompanyName] = useState(
    auth_startup_data === [] ? "" : auth_startup_data.company_name
  );
  const [address, setAddress] = useState(
    auth_startup_data === [] ? "" : auth_startup_data.address
  );
  const [contactInfo, setContactInfo] = useState(
    auth_startup_data === [] ? "" : auth_startup_data.contact_info
  );
  const [description, setDescription] = useState(
    auth_startup_data === [] ? "" : auth_startup_data.description
  );
  const [investmentGoal, setInvestmentGoal] = useState(
    auth_startup_data === [] ? "" : auth_startup_data.investment_goal
  );
  const [websiteUrl, setWebsiteURl] = useState(
    auth_startup_data === [] ? "" : auth_startup_data.website_link
  );
  const [videoUrl, setVideourl] = useState(
    auth_startup_data === [] ? "" : auth_startup_data.video_url
  );
  const [imgurl, setImgUrl] = useState(
    auth_startup_data === [] ? "" : auth_startup_data.img_url
  );
  const [logoUrl, setLogoURl] = useState(
    auth_startup_data === [] ? "" : auth_startup_data.logo_url
  );
  const [enddate, setEndDate] = useState(
    auth_startup_data.length === 0
      ? ""
      : auth_startup_data.end_date.substring(0, 10)
  );
  const [fundingtimelimit, setFundingTimeLimit] = useState(
    auth_startup_data === [] ? "" : auth_startup_data.funding_time_limit
  );
  const [discount, setDiscount] = useState(
    auth_startup_data === [] ? "" : auth_startup_data.discount
  )
  const [valuationCap, setValuationCap] = useState(
    auth_startup_data === [] ? "" : auth_startup_data.valuation_cap
  )
  const [target, setTarget] = useState(
    auth_startup_data === [] ? "" : auth_startup_data.target
  )

  /* Highlight section */

  const [highlights, setHighlights] = useState(
    auth_high_lights.length === 0
      ? []
      : JSON.parse(auth_high_lights[0].highlight)
  );

  function handleAddHighlight() {
    setHighlights([...highlights, { key: "", value: "" }]);
  };

  function handleRemoveHighlight(index) {
    setHighlights(highlights.filter((highlight, i) => i !== index));
  };

  function handleHighlightChange(index, key, value) {
    setHighlights(
      highlights.map((highlight, i) => {
        if (i === index) {
          return { ...highlight, [key]: value };
        } else {
          return highlight;
        }
      })
    );
  };

  // Data GET and POST

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = Cookies.get("userId");

    const formData = {
      user_id: userId,
      customer_name: customerName,
      companyName: companyName,
      companyEmail: companyEmail,
      address: address,
      contactInfo: contactInfo,
      description: description,
      investmentGoal: investmentGoal,
      websiteurl: websiteUrl,
      videoUrl: videoUrl,
      imgurl: imgurl,
      logourl: logoUrl,
      enddate: enddate,
      fundingtimelimit: fundingtimelimit,
      discount: discount,
      valuationCap: valuationCap,
      target: target
    };

    const AdddataUrl = `${BaseUrl.url}auth/startup`;

    try {
      const response = await axios.post(AdddataUrl, formData);
      if (response.data.success === true) {
        SetCookie("startupId", JSON.stringify(response.data.startupId));
        setCompanyName("");
        setAddress("");
        setContactInfo("");
        setDescription("");
        setEndDate("");
        setFundingTimeLimit("");
        setInvestmentGoal("");
        setLogoURl("");
        setWebsiteURl("");
      } else {
        alert("error in Your fromdata.");
      }

      const startupId = Cookies.get("startupId");

      const high_lights = {
        highlight: highlights,
        user_id: startupId,
      };

      //Highlight Api call
      await axios
        .post(`${BaseUrl.url}auth/startup-highlight`, high_lights)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setHighlights([]);
          }
        })
        .catch((error) => console.log(error));

      checkSubmit(startupId);

      RemoveCookie("userId");
      RemoveCookie("startupId");
    } catch (error) {
      console.error(error);
    }
  };

  const checkSubmit = (startupId) => {
    const formData = new FormData();

    // append each file to the FormData object
    for (let i = 0; i < startup_document.length; i++) {
      formData.append("files", startup_document[i].file);
      formData.append("documentType", startup_document[i].documentType);
    }
    formData.append("startup_id", startupId);

    axios
      .post(`${BaseUrl.url}auth/upload/docs`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const Edit_func = async (e) => {
    e.preventDefault();

    const editformData = {
      user_id: auth_startup_data.user_id,
      customer_name: customerName,
      companyName: companyName,
      companyEmail: companyEmail,
      address: address,
      investment_goal: investmentGoal,
      contactInfo: contactInfo,
      description: description,
      websiteurl: websiteUrl,
      videoUrl: videoUrl,
      imgurl: imgurl,
      logourl: logoUrl,
      enddate: enddate,
      fundingtimelimit: fundingtimelimit,
      discount: discount,
      valuationCap: valuationCap,
      target: target,
      high_light: highlights,
      startupId: auth_high_lights[0].id,
    };

    const editUrl = `${BaseUrl.url}auth/api/startups/${auth_startup_data.id}`;
    try {
      const response = await axios.put(editUrl, editformData);
      if (response.status = 200) {
        alert(response.data.message);
        navigate("/loginpage");
      }
    } catch (error) {
      throw error
    };
  };

  return (
    <>
      <section className="whatis abt_us raise_capital">
        <div className="bcontainer">
          <div className="what_banner">
            <div
              className="backimg"
              style={{ backgroundImage: `url(${whatbanner})` }}
            >
              <div className="inner_container">
                <div className="what_head">
                  <h4>Raise Capital with Mudrank</h4>
                  <h6>Tell us a little about your company. This will help us understand your business better.</h6>
                </div>
                <div className="form_inner">

                  <div className="what_head">
                    <h4>Startup Forms</h4>
                  </div>
                  <br />

                  {/* for highlights */}
                  <div className="row g-5">
                    <div className="page_head" style={{ display: "flex" }}>
                      <h4 style={{ display: "flex" }}><span style={{ color: "#9797a5" }}>Heighlights</span><span className="stp_icn">{highlights ? highlights.length : 0}</span></h4>
                    </div>

                    {highlights !== []
                      ? highlights.map((highlight, index) => (
                        <ul className="login_form reg_form">
                          <li className="">

                            <div className="form_input" key={index}>
                              <label htmlFor="password">
                                <p>Title</p>
                              </label>
                              <input
                                type="text"
                                placeholder="Enter title"
                                name={`highlights[${index}][key]`}
                                value={highlight.key}
                                onChange={(event) =>
                                  handleHighlightChange(
                                    index,
                                    "key",
                                    event.target.value
                                  )
                                }
                              />
                            </div>

                            <div className="form_input">
                              <label>
                                <p>Describe the content</p>
                              </label>
                              <textarea aria-label="With textarea" rows="5"
                                name={`highlights[${index}][value]`}
                                value={highlight.value}
                                onChange={(event) =>
                                  handleHighlightChange(
                                    index,
                                    "value",
                                    event.target.value
                                  )
                                } placeholder="Describe the traction..."></textarea>
                            </div>
                          </li>
                          <div className="save_can">
                            <button
                              style={{ marginLeft: "unset" }}
                              type="submit"
                              onClick={() => handleRemoveHighlight(index)}
                              className="button wclr bblk"
                            >Remove Highlight</button>
                          </div>
                        </ul>
                      ))
                      : ""}
                    <div className="form_input">
                      <br />
                      <button
                        type="submit"
                        onClick={handleAddHighlight}
                        className="button wclr wbg"
                        style={{ color: "black" }}
                      >
                        Add Highlight
                      </button>
                    </div>
                  </div>

                  {/* for forms of compani */}

                  <div className="page_head">
                    <h4>Application</h4>
                  </div>

                  <form className="login_form reg_form" novalidate>

                    <div className="form_input">
                      <label for="firstName">
                        Your Name
                        <p style={{ color: "red", display: "contents" }}>*</p>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder=""
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                      />
                      <div className="invalid-feedback">
                        Valid first name is .
                      </div>
                    </div>

                    <div className="form_input">
                      <label for="lastName">
                        Company Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder=""
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                      <div className="invalid-feedback">
                        Valid last name is .
                      </div>
                    </div>

                    <div className="form_input">
                      <label for="username">
                        Company Email
                      </label>
                      <div className="input-group has-validation">
                        <span className="input-group-text">@</span>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          placeholder="Company Email"
                          value={companyEmail}
                          onChange={(e) => setCompanyEmail(e.target.value)}
                        />
                        <div className="invalid-feedback">
                          Your username is .
                        </div>
                      </div>
                    </div>

                    <div className="form_input">
                      <label
                        for="contact"

                        style={{ marginTop: "10px" }}
                      >
                        Contact Info
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="contact"
                        placeholder="00000000"
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                      />
                      <div className="invalid-feedback">
                        Please enter a description.
                      </div>
                    </div>

                    <div className="form_input" style={{ marginTop: "10px" }}>
                      <label for="description">
                        description
                        <span className="text-body-secondary">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="description"
                      />
                      <div className="invalid-feedback">
                        Please enter a description.
                      </div>
                    </div>

                    <div className="form_input">
                      <label for="address">
                        Company Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="1234 Main St"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      <div className="invalid-feedback">
                        Please enter your shipping address.
                      </div>
                    </div>

                    <div className="form_input">
                      <label for="subscribe">
                        Funding Time limit
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="subscribe"
                        placeholder="00 days"
                        value={fundingtimelimit}
                        onChange={(e) => setFundingTimeLimit(e.target.value)}
                      />
                      <div className="invalid-feedback">
                        Please select a valid country.
                      </div>
                    </div>

                    <div className="form_input">
                      <label for="Video">
                        Video Url
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={videoUrl}
                        onChange={(e) => setVideourl(e.target.value)}
                        id="Video"
                      />
                      <div className="invalid-feedback">
                        Please provide a valid state.
                      </div>
                    </div>

                    <div className="form_input">
                      <label for="logo">
                        Logo url
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="logo"
                        placeholder=""
                        value={logoUrl}
                        onChange={(e) => setLogoURl(e.target.value)}
                      />
                      <div className="invalid-feedback">Zip code .</div>
                    </div>

                    <div className="form_input">
                      <label for="thumbnail">
                        Thumbnail
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="thumbnail"
                        placeholder="Add thumbnail"
                        value={imgurl}
                        onChange={(e) => setImgUrl(e.target.value)}
                      />
                      <div className="invalid-feedback">thumbnail is .</div>
                    </div>

                    <div className="form_input">
                      <label for="investment-goal">
                        Investment Goal
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="investment-goal"
                        placeholder="000000000"
                        value={investmentGoal}
                        onChange={(e) => setInvestmentGoal(e.target.value)}
                      />
                      <div className="invalid-feedback">thumbnail is .</div>
                    </div>


                    <div className="" style={{ marginLeft: "5px" }}>

                      <div className="page_head">
                        <h4>Deal terms</h4>
                      </div>

                      <div className="form_input">
                        <label for="zip">
                          Discount %
                        </label>
                        <input
                          id="discount"
                          name="paymentMethod"
                          type="text"
                          value={discount}
                          onChange={(e) => setDiscount(e.target.value)}
                        />
                        {/* <label for="credit">
                          Credit card
                        </label> */}
                      </div>

                      <div className="form_input">
                        <label for="zip">
                          Valuation Cap
                        </label>
                        <input
                          id="debit"
                          name="paymentMethod"
                          type="text"
                          value={valuationCap}
                          onChange={(e) => setValuationCap(e.target.value)}
                        />
                        {/* <label for="debit">
                          Debit card
                        </label> */}
                      </div>

                      <div className="form_input">
                        <label for="zip">
                          Target
                        </label>
                        <input
                          id="paypal"
                          name="paymentMethod"
                          type="text"
                          value={target}
                          onChange={(e) => setTarget(e.target.value)}
                        />
                        {/* <label className="form-check-label" for="paypal">
                          PayPal
                        </label> */}
                      </div>

                      <div className="form_input">
                        <label for="cc-expiration">
                          End date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="cc-expiration"
                          placeholder=""
                          value={enddate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                        <div className="invalid-feedback">Expiration date</div>
                      </div>

                      <div className="form_input">
                        <label for="cc-cvv">
                          Min Subscription '₹'
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="cc-cvv"
                          value={5000}
                          placeholder=""
                        />
                        <div className="invalid-feedback">Security code</div>
                      </div>

                    </div>

                    <hr className="my-4" />
                    <br />

                    <DocumentForm />

                    <button
                      className="button"
                      type="submit"
                      onClick={
                        auth_startup_data.length === 0 ? handleSubmit : Edit_func
                      }
                    >
                      {auth_startup_data.length === 0
                        ? "Submit Application"
                        : "Update Application"}
                    </button>

                  </form>

                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StartupForm;
