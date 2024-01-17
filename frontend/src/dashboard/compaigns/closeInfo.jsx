import React, { useContext, useEffect, useState } from "react";
import { close_Data_view_Index } from "../../feature/dashboard/admindetails/view/viewSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchDocuments } from "../../feature/dashboard/admindetails/fetchdataSlice";
import { fetchStartup_documents } from "../../feature/dashboard/admindetails/api";

const CloseInfo = () => {
  
  const Startup_data = useSelector((state) => state.apiData.close_data);
  const view_index = useSelector((state) => state.viewPageData.close_data_view_index);
  const Startup_highlights = useSelector(
    (state) => state.apiData.data_highlights
  );

  const dispatch = useDispatch();

  const [store_highlight, setStore_Highlight] = useState();

  useEffect(() => {
    if (Startup_data && Startup_highlights) {
      const startupsWithHighlights = Startup_data.result.map((startup) => {
        const startupHighlights = Startup_highlights.result.filter(
          (h) => h.startup_id === startup.id
        );
        // return {
        //   ...startup,
        //   highlights: JSON.parse(startupHighlights[0].highlight),
        // };
      });
      setStore_Highlight(startupsWithHighlights);
    }
  }, [Startup_data, Startup_highlights]);

  const fetchApi = async () => {
    
    const Id = Startup_data.result[view_index].id;
    try {
      const document = await fetchStartup_documents(Id);
      dispatch(fetchDocuments(document));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
      if (Startup_data && view_index !== null) {
        fetchApi();
      };
  },[Startup_data, view_index]);
  
  return (
    <>
      <div className="css-1xku8md">
        <div className="css-1bcp6ex">
          <section className="css-rkk4qd">
            {store_highlight && view_index !== null ? (
              <>
                <div className="MuiContainer-root MuiContainer-maxWidthLg css-1sot28n">
                  <div
                    className="MuiBox-root css-wm5u56"
                    onClick={() => dispatch(close_Data_view_Index())}
                  >
                    <div className="mobile-title-header hide_tap_highlight css-zft7h0">
                      <div>
                        <svg
                          className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1cw4hi4"
                          focusable="false"
                          aria-hidden="true"
                          viewBox="0 0 7 12"
                          width="7"
                          height="12"
                          fill="none"
                        >
                          <path
                            d="M1.22445 10.5789L1.22434 10.579L1.21766 10.5723C0.95179 10.3064 0.95179 9.87 1.21766 9.60412L4.78994 6.03184C4.94595 5.87584 4.94595 5.62193 4.78994 5.46593L1.21766 1.89365C0.95179 1.62777 0.95179 1.19133 1.21766 0.925457C1.48354 0.659584 1.91998 0.659584 2.18585 0.925457L5.75813 4.49774C6.44589 5.18549 6.44589 6.31228 5.75813 7.00004L2.18585 10.5723C2.04959 10.7086 1.87459 10.7731 1.70176 10.7731C1.52087 10.7731 1.35168 10.6976 1.22445 10.5789Z"
                            fill="#090909"
                            stroke="#090909"
                            strokeWidth="0.547896"
                          ></path>
                        </svg>
                      </div>
                      <p className="MuiTypography-root MuiTypography-body2 css-1dkkw4e">
                        Back
                      </p>
                    </div>
                  </div>
                </div>
                <div className="MuiContainer-root MuiContainer-maxWidthLg css-1sot28n">
                  <div className="css-0">
                    <div className="css-1cfdimg">
                      <div className="css-3ddzx3">
                        <div className="css-7jqt2a">
                          <img
                            src={store_highlight[view_index].logo_url}
                            alt="Detoxie"
                          />
                        </div>
                        <h5 className="MuiTypography-root MuiTypography-h5 css-1bqjxp">
                          {store_highlight[view_index].company_name}
                        </h5>
                      </div>
                      <span className="MuiTypography-root MuiTypography-subtitle css-27i1rb">
                        <svg
                          className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1cw4hi4"
                          focusable="false"
                          aria-hidden="true"
                          viewBox="0 0 14 15"
                          width="14"
                          height="15"
                          fill="none"
                        >
                          <circle
                            opacity="0.2"
                            cx="7"
                            cy="7.5"
                            r="7"
                            fill="#179942"
                          ></circle>
                          <circle cx="7" cy="7.5" r="3" fill="#179942"></circle>
                        </svg>
                        Live
                      </span>
                    </div>
                    <p className="MuiTypography-root MuiTypography-body1 css-gy5chb">
                      {store_highlight[view_index].description}
                    </p>
                    <div className="css-1ua97s">
                      <span className="MuiTypography-root MuiTypography-subtitle css-1j462f5">
                        <div>💡100% YOY growth</div>
                      </span>
                      <span className="MuiTypography-root MuiTypography-subtitle css-1j462f5">
                        <div>✨25K+ Customers</div>
                      </span>
                      <span className="MuiTypography-root MuiTypography-subtitle css-1j462f5">
                        <div>Skincare</div>
                      </span>
                    </div>
                  </div>
                  <div className="css-ndcxe4">
                    <div className="css-qbd76y">
                      <div>
                        <div className="css-1fobf8d">
                          <h5 className="MuiTypography-root MuiTypography-h5 css-1q75hs2">
                            {30 - store_highlight[view_index].slot_available}
                          </h5>
                          <span className="MuiTypography-root MuiTypography-subtitle css-17jnidb">
                            Subscribers
                          </span>
                        </div>
                        <div className="css-1fobf8d">
                          <h5 className="MuiTypography-root MuiTypography-h5 css-1q75hs2">
                            {store_highlight[view_index].funding_time_limit}{" "}
                            days
                          </h5>
                          <span className="MuiTypography-root MuiTypography-subtitle css-17jnidb">
                            Left to subscribe
                          </span>
                        </div>
                        <div className="css-1fobf8d">
                          <h5 className="MuiTypography-root MuiTypography-h5 css-1tu0tkr">
                            44.70%
                          </h5>
                          <span className="MuiTypography-root MuiTypography-subtitle css-17jnidb">
                            Of goal raised
                          </span>
                          <div className="css-obliip">
                            <span
                              className="MuiLinearProgress-root MuiLinearProgress-colorPrimary MuiLinearProgress-determinate css-7wkghw"
                              role="progressbar"
                              aria-valuenow="45"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style={{
                                width: "44.70%",
                                backgroundColor: "blue",
                              }}
                            >
                              <span
                                className="MuiLinearProgress-bar MuiLinearProgress-barColorPrimary MuiLinearProgress-bar1Determinate css-aupble"
                                //   style="transform: translateX(-55.3%);"
                              ></span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="css-6y2phc">
                        <div className="css-8yi04s">
                          <button
                            className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation css-1ke2ig0"
                            tabIndex="0"
                            type="button"
                            colour="primary"
                          >
                            Subscribe
                            <span className="MuiTouchRipple-root css-w0pj6f"></span>
                          </button>
                          <div className="css-1asn2yq">
                            <span className="MuiTypography-root MuiTypography-caption css-mf1ebj">
                              ₹5000{" "}
                              <span className="MuiTypography-root MuiTypography-caption css-12z22lc">
                                Minimum Subscription
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="css-1im9e7f">
                          <button
                            className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation css-1xtytu2"
                            tabIndex="0"
                            type="button"
                            data-id="rf-11116"
                            colour="primary"
                            //   style="cursor: help;"
                          >
                            <svg
                              className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1cw4hi4"
                              focusable="false"
                              aria-hidden="true"
                              viewBox="0 0 19 20"
                              width="19"
                              height="20"
                              fill="none"
                            >
                              <path
                                d="M18.4443 7.41625C18.4439 7.59822 18.3678 7.77156 18.2348 7.89349L11.8857 13.6982C11.7941 13.7822 11.6806 13.8373 11.5588 13.8567C11.4371 13.8762 11.3124 13.8592 11.1999 13.8079C11.0885 13.757 10.9939 13.6746 10.9275 13.5705C10.861 13.4665 10.8256 13.3451 10.8253 13.221V10.7636C8.82092 11.1869 6.9592 12.1316 5.42198 13.5052C3.88501 14.8789 2.72544 16.6344 2.05693 18.6001C2.0137 18.7259 1.93306 18.8351 1.82606 18.9125C1.71921 18.99 1.59137 19.0317 1.46013 19.0323H1.40302C1.26286 19.0199 1.13063 18.9607 1.02719 18.8638C0.923728 18.767 0.854994 18.6378 0.831611 18.4969C0.723476 17.8317 0.668347 17.1588 0.666504 16.4846C0.668205 13.5712 1.69173 10.7536 3.55337 8.53747C5.41502 6.32135 7.99307 4.85118 10.8252 4.39122V1.61135C10.8254 1.48725 10.8609 1.36589 10.9273 1.2618C10.9938 1.15771 11.0883 1.07536 11.1997 1.0244C11.3123 0.973147 11.437 0.956156 11.5587 0.975594C11.6804 0.995032 11.794 1.05017 11.8855 1.1341L18.2347 6.93885C18.3676 7.06079 18.4437 7.23413 18.4441 7.4161L18.4443 7.41625Z"
                                fill="#B5B4B1"
                              ></path>
                            </svg>
                            <span className="MuiTouchRipple-root css-w0pj6f"></span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <section className="css-1we8of8">
                      <div className="css-6oq07s">
                        <iframe
                          width="100%"
                          scrolling="no"
                          height="100%"
                          src={store_highlight[view_index].video_url}
                          title="YouTube video player"
                          frameborder="0"
                          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen=""
                        ></iframe>
                      </div>
                    </section>
                  </div>
                </div>
                <div className="MuiContainer-root MuiContainer-maxWidthLg css-1sot28n">
                  <section className="css-522cgz">
                    <p className="MuiTypography-root MuiTypography-body2 css-1c9cja6">
                      Subscriptions offered
                    </p>
                    <div className="css-8mncxq">
                      <div className="css-hki0s2">
                        <svg
                          className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1cw4hi4"
                          focusable="false"
                          aria-hidden="true"
                          viewBox="0 0 316 90"
                          width="316"
                          height="90"
                          fill="none"
                        >
                          <mask
                            id="mask0_829_21315"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="316"
                            height="90"
                            //   style="mask-type: alpha;"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8 0C3.58172 0 0 3.58171 0 7.99999V26.3415V90H1C1.00002 72.4212 13.9838 58.1708 30 58.1708H316L287.042 58.1707C303.039 58.1459 316 43.905 316 26.3415V8C316 3.58172 312.418 0 308 0H8ZM286.958 58.1707C286.638 58.1702 286.318 58.164 286 58.1522V58.1707H286.958Z"
                              fill="url(#paint0_linear_829_21315)"
                            ></path>
                          </mask>
                          <g mask="url(#mask0_829_21315)">
                            <mask
                              id="mask1_829_21315"
                              maskUnits="userSpaceOnUse"
                              x="0"
                              y="0"
                              width="316"
                              height="198"
                              // style="mask-type: alpha;"
                            >
                              <rect
                                x="0.5"
                                y="0.5"
                                width="315"
                                height="196.561"
                                rx="7.5"
                                fill="white"
                                stroke="#E6E6E6"
                              ></rect>
                            </mask>
                            <g mask="url(#mask1_829_21315)">
                              <path
                                d="M330.219 169.024L331 -9.02896C331.056 -22.7945 319.007 -33.9919 304.059 -34.0432L12.9455 -35.1219C-1.97549 -35.1733 -14.1354 -24.0786 -14.2191 -10.3131L-15 167.74L330.219 169.05V169.024Z"
                                fill="url(#paint1_linear_829_21315)"
                              ></path>
                              <g opacity="0.14">
                                <path
                                  d="M197.408 23.7927C235.394 41.2821 260.997 69.635 285.233 100.967C297.978 117.455 310.278 134.277 322.856 150.867C325.366 154.18 327.848 157.545 330.219 160.935L330.972 -9.00328C331.028 -22.7688 318.979 -33.9662 304.03 -34.0176L12.9454 -35.1219C-1.97564 -35.1733 -14.1356 -24.0786 -14.2192 -10.3131V-5.15098C56.8717 -6.10121 132.564 -6.04985 197.408 23.7927Z"
                                  fill="#00BAE3"
                                ></path>
                              </g>
                              <g opacity="0.44">
                                <path
                                  d="M304.058 -34.0176L271.706 -34.146C268.136 -7.25693 262.056 19.4781 248.307 43.5678C232.465 71.33 206.109 93.4936 174.817 105.795C139.146 119.818 98.0924 120.357 59.9114 119.407C34.4202 118.765 9.04052 115.503 -14.7494 107.388L-15.0283 167.74L330.191 169.05L330.972 -9.0033C331.027 -22.7689 318.979 -33.9662 304.03 -34.0176H304.058Z"
                                  fill="#00BAE3"
                                ></path>
                              </g>
                            </g>
                          </g>
                          <defs>
                            <linearGradient
                              id="paint0_linear_829_21315"
                              x1="299.5"
                              y1="81.7683"
                              x2="3.71315"
                              y2="16.4641"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop
                                offset="0.0296368"
                                stop-color="#3E5DCC"
                              ></stop>
                              <stop offset="1" stop-color="#6BD9FF"></stop>
                            </linearGradient>
                            <linearGradient
                              id="paint1_linear_829_21315"
                              x1="-14.5613"
                              y1="66.2408"
                              x2="330.654"
                              y2="67.7457"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#57D3FB"></stop>
                              <stop offset="1" stop-color="#205CF7"></stop>
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="css-rqgsqp">
                          <span className="MuiTypography-root MuiTypography-caption-sm css-5kc3h">
                            SUBSCRIBE FOR
                          </span>
                          <p className="MuiTypography-root MuiTypography-body1 css-xutax">
                            ₹5,000
                          </p>
                          <div className="css-1eiezm">
                            <span className="MuiTypography-root MuiTypography-caption-sm css-2gxd0r">
                              GET REWARDS
                            </span>
                            <span className="MuiTypography-root MuiTypography-caption css-ge098r">
                              Off on products{" "}
                            </span>
                            <ul className="css-1d10np2">
                              <li className="MuiTypography-root MuiTypography-caption css-1lqn0d2">
                                30% off on all products
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="css-hki0s2">
                        <svg
                          className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1cw4hi4"
                          focusable="false"
                          aria-hidden="true"
                          viewBox="0 0 316 90"
                          width="316"
                          height="90"
                          fill="none"
                        >
                          <mask
                            id="mask0_829_21315"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="316"
                            height="90"
                            //   style="mask-type: alpha;"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8 0C3.58172 0 0 3.58171 0 7.99999V26.3415V90H1C1.00002 72.4212 13.9838 58.1708 30 58.1708H316L287.042 58.1707C303.039 58.1459 316 43.905 316 26.3415V8C316 3.58172 312.418 0 308 0H8ZM286.958 58.1707C286.638 58.1702 286.318 58.164 286 58.1522V58.1707H286.958Z"
                              fill="url(#paint0_linear_829_21315)"
                            ></path>
                          </mask>
                          <g mask="url(#mask0_829_21315)">
                            <mask
                              id="mask1_829_21315"
                              maskUnits="userSpaceOnUse"
                              x="0"
                              y="0"
                              width="316"
                              height="198"
                              // style="mask-type: alpha;"
                            >
                              <rect
                                x="0.5"
                                y="0.5"
                                width="315"
                                height="196.561"
                                rx="7.5"
                                fill="white"
                                stroke="#E6E6E6"
                              ></rect>
                            </mask>
                            <g mask="url(#mask1_829_21315)">
                              <path
                                d="M330.219 169.024L331 -9.02896C331.056 -22.7945 319.007 -33.9919 304.059 -34.0432L12.9455 -35.1219C-1.97549 -35.1733 -14.1354 -24.0786 -14.2191 -10.3131L-15 167.74L330.219 169.05V169.024Z"
                                fill="url(#paint1_linear_829_21315)"
                              ></path>
                              <g opacity="0.14">
                                <path
                                  d="M197.408 23.7927C235.394 41.2821 260.997 69.635 285.233 100.967C297.978 117.455 310.278 134.277 322.856 150.867C325.366 154.18 327.848 157.545 330.219 160.935L330.972 -9.00328C331.028 -22.7688 318.979 -33.9662 304.03 -34.0176L12.9454 -35.1219C-1.97564 -35.1733 -14.1356 -24.0786 -14.2192 -10.3131V-5.15098C56.8717 -6.10121 132.564 -6.04985 197.408 23.7927Z"
                                  fill="#00BAE3"
                                ></path>
                              </g>
                              <g opacity="0.44">
                                <path
                                  d="M304.058 -34.0176L271.706 -34.146C268.136 -7.25693 262.056 19.4781 248.307 43.5678C232.465 71.33 206.109 93.4936 174.817 105.795C139.146 119.818 98.0924 120.357 59.9114 119.407C34.4202 118.765 9.04052 115.503 -14.7494 107.388L-15.0283 167.74L330.191 169.05L330.972 -9.0033C331.027 -22.7689 318.979 -33.9662 304.03 -34.0176H304.058Z"
                                  fill="#00BAE3"
                                ></path>
                              </g>
                            </g>
                          </g>
                          <defs>
                            <linearGradient
                              id="paint0_linear_829_21315"
                              x1="299.5"
                              y1="81.7683"
                              x2="3.71315"
                              y2="16.4641"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop
                                offset="0.0296368"
                                stop-color="#3E5DCC"
                              ></stop>
                              <stop offset="1" stop-color="#6BD9FF"></stop>
                            </linearGradient>
                            <linearGradient
                              id="paint1_linear_829_21315"
                              x1="-14.5613"
                              y1="66.2408"
                              x2="330.654"
                              y2="67.7457"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#57D3FB"></stop>
                              <stop offset="1" stop-color="#205CF7"></stop>
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="css-rqgsqp">
                          <span className="MuiTypography-root MuiTypography-caption-sm css-5kc3h">
                            SUBSCRIBE FOR
                          </span>
                          <p className="MuiTypography-root MuiTypography-body1 css-xutax">
                            ₹5,000
                          </p>
                          <div className="css-1eiezm">
                            <span className="MuiTypography-root MuiTypography-caption-sm css-2gxd0r">
                              GET REWARDS
                            </span>
                            <span className="MuiTypography-root MuiTypography-caption css-ge098r">
                              Exit on SAR
                            </span>
                            <ul className="css-1d10np2">
                              <li className="MuiTypography-root MuiTypography-caption css-1lqn0d2">
                                Complete 3 refferals of INR 1200 each or puchase
                                detoxie products worth 3500 and unlock exit of 1
                                SAR
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                <div className="MuiContainer-root MuiContainer-maxWidthLg css-1sot28n">
                  <section className="css-522cgz">
                    <p className="MuiTypography-root MuiTypography-body2 css-1c9cja6">
                      Highlights
                    </p>
                    <div className="css-kpmggs">
                      {store_highlight
                        ? store_highlight[view_index].highlights.map((data) => {
                            return (
                              <>
                                <div className="css-iuja8a">
                                  <div className="css-ys9osz">
                                    <img
                                      decoding="async"
                                      loading="lazy"
                                      className="remix-image"
                                      alt="Bootstrapped to INR 1cr+ revenue in FY23"
                                      src="https://tyke-startup-bucket.s3.ap-south-1.amazonaws.com/PRISTLE%20PRODUCTS%20PRIVATE%20LIMITED/startup%2C%20start%20up%2C%20business%2C%20launch%2C%20insurance%2C%20protection%403x.png"
                                      style={{
                                        minWidth: "0px",
                                        minHeight: "0px",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center center",
                                        animationDuration: "0.125s",
                                      }}
                                    />
                                  </div>
                                  <div className="css-19jzbwf">
                                    <div className="MuiTypography-root MuiTypography-body2 css-sprc4p">
                                      {data.key}
                                    </div>
                                    <div className="MuiTypography-root MuiTypography-subtitle css-1cpzlj1">
                                      {data.value}
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          })
                        : ""}
                    </div>
                  </section>
                </div>
              </>
            ) : (
              ""
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default CloseInfo;
