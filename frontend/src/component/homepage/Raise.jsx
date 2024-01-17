import React, { useState } from "react";
import whatbanner from "../../images/what_banner.png";

import { Document, Page, pdfjs } from "react-pdf";
import shortid from "https://cdn.skypack.dev/shortid@2.2.16";
import axios from "axios";
import { useForm } from "react-hook-form";
import { BaseUrl } from "../../apis/contant";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export function Raise() {
  const [selectedfile, SetSelectedFile] = useState("");
  const [image, setImage] = useState();
  const [imageField, setImageField] = useState({});
  const [privateRoundInterest, setPrivateRoundInterest] = useState("");
  // Initialize with an empty string
  const handlePrivateRoundChange = (event) => {
    setPrivateRoundInterest(event.target.value);
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  // formData.name,
  // formData.companyname,
  // formData.companyemail,
  // formData.website,
  // formData.linkedin,
  // formData.linkedinurl,
  // formData.fundraisingrounds,
  // formData.product,
  // formData.traction,
  // formData.revenue,
  // formData.team,
  // formData.Communityround,
  // formData.rightfit,
  // formData.commitments,
  // formData.privateRoundInterest
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("privateRoundInterest", privateRoundInterest);
    formData.append("files", imageField);
    formData.append("name", data.name);
    formData.append("companyname", data.companyname);
    formData.append("companyemail", data.companyemail);
    formData.append("website", data.website);
    formData.append("linkedin", data.linkedin);
    formData.append("linkedinurl", data.linkedinurl);
    formData.append("fundraisingrounds", data.fundraisingrounds);
    formData.append("product", data.product);
    formData.append("website", data.website);
    formData.append("traction", data.traction);
    formData.append("revenue", data.revenue);
    formData.append("team", data.team);
    formData.append("rightfit", data.rightfit);
    formData.append("commitments", data.commitments);

    axios
      .post(`${BaseUrl.url}raise`, formData, {
        "Content-Type": "multipart/form-data",
      })
      .then((res) => {
        reset();
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const filesizes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };
  const InputChange = (e) => {
    let file = e.target.files[0];

    // if (file) {
    //     if (file.type === 'application/pdf') {
    //         SetSelectedFile({
    //             id: shortid.generate(),
    //             filename: file.name,
    //             filetype: file.type,
    //             filedata: file,
    //             datetime: file.lastModifiedDate.toLocaleString('en-IN'),
    //             filesize: filesizes(file.size),
    //         });
    //     } else {
    //         alert('Please select a PDF file.');
    //     }
    // } else {
    //     //alert('Please select a file.');
    // }

    const formData = new FormData();
    formData.append("files", file);

    axios
      .post("http://localhost:3002/upload/36", formData, {
        "Content-Type": "multipart/form-data",
      })
      .then((res) => {
        console.log("res", res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
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
                  <h6>
                    Tell us a little about your company. This will help us
                    understand your business better.
                  </h6>
                </div>

                <div className="form_inner">
                  <div className="login_form reg_form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="form_input">
                        <label>
                          <p>Your Name</p>
                        </label>
                        <input
                          type="text"
                          id=""
                          name=""
                          {...register("name", {
                            required: "This field is required",
                            validate: (value) => {
                              return (
                                !/\s/.test(value) || "Spaces are not allowed"
                              );
                            },
                          })}
                          placeholder="Enter your name"
                        />
                        {errors.name && (
                          <span style={{ color: "red" }}>
                            {errors.name.message}
                          </span>
                        )}
                      </div>

                      <div className="form_input">
                        <label>
                          <p>Registered Company Name</p>
                        </label>
                        <input
                          type="text"
                          id=""
                          name=""
                          {...register("companyname", {
                            required: "This field is required",
                            validate: (value) => {
                              return (
                                !/\s/.test(value) || "Spaces are not allowed"
                              );
                            },
                          })}
                          placeholder="Enter your company's registered name"
                        />
                        {errors.companyname && (
                          <span style={{ color: "red" }}>
                            {errors.companyname.message}
                          </span>
                        )}
                      </div>

                      <div className="form_input">
                        <label>
                          <p>Company Email</p>
                        </label>
                        <input
                          type="text"
                          id="email"
                          name=""
                          {...register("companyemail", {
                            pattern: {
                              required: "This field is required",
                              value:
                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                              message: "Invalid email format",
                            },
                            validate: (value) => {
                              return (
                                !/\s/.test(value) || "Spaces are not allowed"
                              );
                            },
                          })}
                          placeholder="Enter your company email"
                        />
                        {errors.companyemail && (
                          <span style={{ color: "red" }}>
                            {errors.companyemail.message}
                          </span>
                        )}
                      </div>

                      <div className="form_input">
                        <label>
                          <p>Website</p>
                        </label>
                        <input
                          type="url"
                          id="website"
                          name="website"
                          {...register("website", {
                            required: "This field is required", // Specify the required message
                            pattern: {
                              value: /^https?:\/\/(www\.)?.+\..+/,
                              message: "Enter a valid URL",
                            },
                            validate: (value) => {
                              return (
                                !/\s/.test(value) || "Spaces are not allowed"
                              );
                            },
                          })}
                          placeholder="Enter your company's website URL"
                        />
                        {errors.website && (
                          <span style={{ color: "red" }}>
                            {errors.website.message}
                          </span>
                        )}
                      </div>

                      <div className="form_input">
                        <label>
                          <p>Company's LinkedIn Page</p>
                        </label>
                        <input
                          type="url"
                          id="linkedin"
                          name="linkedin"
                          {...register("linkedin", {
                            required: "This field is required",
                            pattern: {
                              value: /^https?:\/\/(www\.)?.+\..+/,
                              message: "Enter a valid URL",
                            },
                            validate: (value) => {
                              // Custom validation to check for spaces
                              return (
                                !/\s/.test(value) || "Spaces are not allowed"
                              );
                            },
                          })}
                          placeholder="Enter your company's LinkedIn page URL"
                        />
                        {errors.linkedin && (
                          <span style={{ color: "red" }}>
                            {errors.linkedin.message}
                          </span>
                        )}
                      </div>

                      <div className="form_input">
                        <label>
                          <p>Founder's LinkedIn URL</p>
                        </label>
                        <input
                          type="url"
                          id=""
                          name="linkedinurl"
                          {...register("linkedinurl", {
                            required: "This field is required",
                            pattern: {
                              value: /^https?:\/\/(www\.)?.+\..+/,
                              message: "Enter a valid URL",
                            },
                            validate: (value) => {
                              // Custom validation to check for spaces
                              return (
                                !/\s/.test(value) || "Spaces are not allowed"
                              );
                            },
                          })}
                          placeholder="Enter Founder's LinkedIn URL 1"
                        />
                        {errors.linkedinurl && (
                          <span style={{ color: "red" }}>
                            {errors.linkedinurl.message}
                          </span>
                        )}
                      </div>

                      <div className="form_input">
                        <label>
                          <p>Describe your previous fundraising rounds</p>
                        </label>
                        <textarea
                          id=""
                          name=""
                          rows="5"
                          placeholder="Describe your previous fundraising rounds"
                          {...register("fundraisingrounds", {
                            required: "This field is required",
                            validate: (value) => {
                              return (
                                !/\s/.test(value) || "Spaces are not allowed"
                              );
                            },
                          })}
                        ></textarea>
                        {errors.fundraisingrounds && (
                          <span style={{ color: "red" }}>
                            {errors.fundraisingrounds.message}
                          </span>
                        )}
                      </div>

                      <div className="form_input">
                        <label>
                          <p>Describe your product</p>
                        </label>
                        <textarea
                          id=""
                          name=""
                          rows="5"
                          placeholder="Describe your product"
                          {...register("product", {
                            required: "This field is required",
                            validate: (value) => {
                              return (
                                !/\s/.test(value) || "Spaces are not allowed"
                              );
                            },
                          })}
                        ></textarea>
                        {errors.product && (
                          <span style={{ color: "red" }}>
                            {errors.product.message}
                          </span>
                        )}
                      </div>

                      <div className="form_input">
                        <label>
                          <p>Describe the traction</p>
                        </label>
                        <textarea
                          id=""
                          name=""
                          rows="5"
                          placeholder="Describe the traction"
                          {...register("traction", {
                            required: "This field is required",
                            validate: (value) => {
                              return (
                                !/\s/.test(value) || "Spaces are not allowed"
                              );
                            },
                          })}
                        ></textarea>
                        {errors.traction && (
                          <span style={{ color: "red" }}>
                            {errors.traction.message}
                          </span>
                        )}
                      </div>

                      <div className="form_input">
                        <label>
                          <p>Describe the revenue you are making</p>
                        </label>
                        <input
                          type="text"
                          id=""
                          name=""
                          placeholder="Enter your current revenue"
                          {...register("revenue", {
                            required: "This field is required",
                            validate: (value) => {
                              return (
                                !/\s/.test(value) || "Spaces are not allowed"
                              );
                            },
                          })}
                        />
                        {errors.revenue && (
                          <span style={{ color: "red" }}>
                            {errors.revenue.message}
                          </span>
                        )}
                      </div>

                      <div className="form_input">
                        <label>
                          <p>How big is the team?</p>
                        </label>
                        <input
                          type="text"
                          id=""
                          name=""
                          placeholder="Enter your current team size"
                          {...register("team", {
                            required: "This field is required",
                            validate: (value) => {
                              return (
                                !/\s/.test(value) || "Spaces are not allowed"
                              );
                            },
                          })}
                        />
                        {errors.team && (
                          <span style={{ color: "red" }}>
                            {errors.team.message}
                          </span>
                        )}
                      </div>

                      <div className="form_input">
                        <label>
                          <p>
                            What makes you think Mudrank is the right fit for
                            you?
                          </p>
                        </label>
                        <textarea
                          id=""
                          name=""
                          rows="5"
                          placeholder="Describe yourself here..."
                          {...register("rightfit", {
                            required: "This field is required",
                            validate: (value) => {
                              return (
                                !/\s/.test(value) || "Spaces are not allowed"
                              );
                            },
                          })}
                        ></textarea>
                        {errors.rightfit && (
                          <span style={{ color: "red" }}>
                            {errors.rightfit.message}
                          </span>
                        )}
                      </div>

                      <div className="form_input">
                        <label>
                          <p>Do you have any existing commitments?</p>
                        </label>
                        <textarea
                          id=""
                          name=""
                          rows="5"
                          placeholder="Describe yourself here..."
                          {...register("commitments", {
                            required: "This field is required",
                            validate: (value) => {
                              return (
                                !/\s/.test(value) || "Spaces are not allowed"
                              );
                            },
                          })}
                        ></textarea>
                        {errors.commitments && (
                          <span style={{ color: "red" }}>
                            {errors.commitments.message}
                          </span>
                        )}
                      </div>

                      <div className="form_input">
                        <label>
                          <p>
                            Would you be interested in raising a Private Round?
                          </p>
                        </label>
                        <div className="radio_options">
                          <div className="radio">
                            <input
                              id="radio-1"
                              name="privateRoundInterest"
                              type="radio"
                              value="Yes"
                              checked={privateRoundInterest === "Yes"}
                              onChange={handlePrivateRoundChange}
                            />
                            <label htmlFor="radio-1" className="radio-label">
                              Yes
                            </label>
                          </div>
                          <div className="radio">
                            <input
                              id="radio-2"
                              name="privateRoundInterest"
                              type="radio"
                              value="No"
                              checked={privateRoundInterest === "No"}
                              onChange={handlePrivateRoundChange}
                            />
                            <label htmlFor="radio-2" className="radio-label">
                              No
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="form_input">
                        <label>
                          <p>Upload your Pitch</p>
                        </label>

                        <div className="file_upd">
                          <div className="file_upd_inner">
                            <div className="file-data-box">
                              <div className="file-upload">
                                <div className="file-upload-box">
                                  <input
                                    type="file"
                                    id="fileupload"
                                    className="file-upload-input"
                                    accept=".pdf"
                                    // {...register("files", {
                                    //   required: true,
                                    // })}
                                    onChange={(e) =>
                                      setImageField(e.target.files[0])
                                    }
                                  />
                                  <p>
                                    Drag and drop or{" "}
                                    <span className="file-link">
                                      Choose your file
                                    </span>
                                  </p>
                                </div>

                                {errors.fileupload && (
                                  <span style={{ color: "red" }}>
                                    This field is required
                                  </span>
                                )}
                              </div>

                              {selectedfile !== "" ? (
                                <div className="file-atc-box">
                                  <div
                                    className="file-preview"
                                    style={{
                                      maxHeight: "170px",
                                      overflow: "hidden",
                                    }}
                                  >
                                    {selectedfile.filetype ===
                                    "application/pdf" ? (
                                      <Document
                                        file={selectedfile.filedata}
                                        key={selectedfile.id}
                                        className="pdf-document"
                                      >
                                        <Page
                                          pageNumber={1}
                                          width={250}
                                          renderAnnotationLayer={false}
                                          renderTextLayer={false}
                                          key={selectedfile.id}
                                        />
                                      </Document>
                                    ) : (
                                      <div className="file-image">
                                        <img
                                          src={selectedfile.fileimage}
                                          alt=""
                                        />
                                      </div>
                                    )}
                                  </div>
                                  {/* <div className="file-detail">
                                                                        <h6>{selectedfile.filename}</h6>
                                                                    </div> */}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <input className="button " type="submit" value="Submit" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
