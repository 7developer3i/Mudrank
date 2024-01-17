import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  close_subscription_section,
  dec_units,
  inc_units,
} from "../../feature/actions/subscriptionreducer/reducer";
import axios from "axios";
import { BaseUrl, END_POINTS } from "../../apis/contant";
import AuthContext from "../../context/AuthContext";

const Subscription = ({
  view_index,
  No_of_units,
  Startup_data,
  Investor_data,
}) => {
  const subscription_Units = useSelector(
    (state) => state.subscription_page.units
  );

  const authcontext = useContext(AuthContext);
  const { setShowSuccessMessage, setShowError } = authcontext;

  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const generateReceiptId = () => {
    const timestamp = Date.now();
    const randomId = Math.floor(Math.random() * 1000);
    return `order_${timestamp}_${randomId}`;
  };

  const initiatePayment = async () => {
    try {
      const response = await axios.post(
        `${BaseUrl.url}${END_POINTS.SUBSCRIPTION.UPI_PAYMENT}`,
        {
          amount: 10, // Amount in your currency's smallest unit (e.g., paise)
          currency: "INR",
          receipt: generateReceiptId(),
        }
      );
      setOrderId(response.data.id);
      const { amount, currency, id } = response.data;

      const options = {
        key: "rzp_test_PoyFG2osGCxJzP",
        amount: amount,
        currency: currency,
        name: "deep patel",
        description: "Payment for Order",
        order_id: id,
        handler: async function (response) {
          if (response) {
            const {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
            } = response;
            try {
              const successResponse = await axios.post(
                `${BaseUrl.url}${END_POINTS.SUBSCRIPTION.PAYMENT_CALLBACK}`,
                {
                  razorpay_order_id: razorpay_order_id,
                  razorpay_payment_id: razorpay_payment_id,
                  razorpay_signature: razorpay_signature,
                  user_id: Investor_data.id,
                }
              );
              if (successResponse.data.success === true) {
                const data = {
                  startupId: Startup_data.result[view_index].id,
                  investorId: Investor_data && Investor_data.id,
                  amount: No_of_units,
                };
                console.log(data);

                // Check if any field is empty
                if (!data.amount || !data.investorId || !data.startupId) {
                  setShowError("something error please wait");
                  return;
                }

                axios
                  .post(`${BaseUrl.url}${END_POINTS.SUBSCRIPTION.INVESTMENT}`, data)
                  .then((res) => {
                    if (res.status === 201) {
                      setShowSuccessMessage(res.data.message);
                      setShowError(null);
                      setTimeout(() => {
                        setShowSuccessMessage(null);
                      }, 2000);
                      dispatch(close_subscription_section());
                    }
                  })
                  .catch((err) => {
                    setShowError(err.response.data.message);
                    setTimeout(() => {
                      setShowError(null);
                    }, 2000);
                    setShowSuccessMessage(null);
                    dispatch(close_subscription_section());
                  });
              }
            } catch (error) {
              console.log(error);
            }
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <>
      <section className="subs_box">
        <p className="sbx_tt">Your Subscription</p>
        <p className="sbx_stt sml">No. of Units</p>
        <div className="qty_box">
          <button
            className="btn button"
            tabIndex="0"
            type="button"
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(dec_units())}
          >
            <svg
              className="svg"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 10 3"
              width="10"
              height="3"
              fill="none"
            >
              <rect width="10" height="3" rx="1.5" fill="white"></rect>
            </svg>
          </button>
          <div className="qty_input">
            <input className="" value={subscription_Units} />
          </div>
          <button
            className="btn button"
            tabIndex="0"
            type="button"
            onClick={() => dispatch(inc_units())}
          >
            <svg
              className="svg"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 10 10"
              width="10"
              height="10"
              fill="none"
            >
              <path
                d="M8.82357 3.80952H6.19048V1.17643C6.19048 0.529524 5.64714 0 5 0C4.35286 0 3.80952 0.529524 3.80952 1.17643V3.80952H1.17643C0.529524 3.80952 0 4.35286 0 5C0 5.64714 0.529524 6.19048 1.17643 6.19048H3.80952V8.82357C3.80952 9.47048 4.35286 10 5 10C5.64714 10 6.19048 9.47048 6.19048 8.82357V6.19048H8.82357C9.47048 6.19048 10 5.64714 10 5C10 4.35286 9.47048 3.80952 8.82357 3.80952Z"
                fill="white"
              ></path>
            </svg>
          </button>
        </div>
        <div className="unit_datas">
          <div className="unit_item">
            <p className="unit_tt ssl">Unit Value</p>
            <p className="unit_value sml">₹10,000</p>
          </div>
          <div className="unit_item">
            <p className="unit_tt ssl">Subscription Value</p>
            <p className="unit_value sml">₹{subscription_Units}</p>
          </div>
          <div className="unit_item">
            <p className="unit_tt ssl">
              Transaction Fees <span className="unit_tag">Waived Off</span>
            </p>
            <p className="unit_value sml">₹0</p>
          </div>
        </div>
        <div className="repayment_data">
          <div className="repayment_item">
            <div className="rpay_head">
              <p className="rpay_tt ssl">
                Repayment Date
                <div
                  title="Expected date on which you will receive the total repayment amount (subject to campaign closure date)"
                  className="rpay_icn"
                >
                  <svg
                    className="svg"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 12 12"
                    width="12"
                    height="12"
                    fill="none"
                  >
                    <circle
                      cx="5.93834"
                      cy="5.93834"
                      r="5.93834"
                      fill="#9D9D9D"
                    ></circle>
                    <rect
                      x="5.17499"
                      y="4.95386"
                      width="1.527"
                      height="4.50652"
                      rx="0.763501"
                      fill="white"
                    ></rect>
                    <circle
                      cx="5.93849"
                      cy="3.45637"
                      r="0.763501"
                      fill="white"
                    ></circle>
                  </svg>
                </div>
              </p>
            </div>
            <p className="rpay_value vsl">30 Jun 2023</p>
          </div>
          <div className="repayment_item">
            <div className="rpay_head">
              <p className="rpay_tt sml" title="Expected repayment amount">
                {" "}
                Repayment Value
                <div className="rpay_icn">
                  <svg
                    className="svg"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 12 12"
                    width="12"
                    height="12"
                    fill="none"
                  >
                    <circle
                      cx="5.93834"
                      cy="5.93834"
                      r="5.93834"
                      fill="#9D9D9D"
                    ></circle>
                    <rect
                      x="5.17499"
                      y="4.95386"
                      width="1.527"
                      height="4.50652"
                      rx="0.763501"
                      fill="white"
                    ></rect>
                    <circle
                      cx="5.93849"
                      cy="3.45637"
                      r="0.763501"
                      fill="white"
                    ></circle>
                  </svg>
                </div>
              </p>
            </div>
            <p className="rpay_value">
              ₹{subscription_Units + subscription_Units * 0.017}
            </p>
          </div>
        </div>

        <div className="wt_chk agree_chk">
          <input
            className="styled-checkbox"
            id="styled-checkbox-1"
            type="checkbox"
            defaultValue="value1"
            defaultChecked=""
          />
          <label htmlFor="styled-checkbox-1">
            <p className="sml">
              I agree to the <a href="#">Terms And Conditions</a>,
              <a href="#">Terms Of Use</a> and have read and understood the{" "}
              <a href="#">Privacy Policy</a>.
            </p>
          </label>
        </div>

        <div className="pocket_box">
          <p className="pocket_tt sml">Mudrank Pocket</p>
          <p className="pocket_bal ssl">Balance: ₹0</p>
        </div>

        <div className="single_subs_btn">
          <div className="sbtn_inner">
            <button
              onClick={initiatePayment}
              className="button bbg"
              tabIndex="0"
              type="button"
              colour="primary"
            >
              Continue to Pay
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Subscription;
