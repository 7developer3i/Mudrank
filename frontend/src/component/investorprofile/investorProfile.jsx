import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set_current_detail_page } from "../../feature/investor-profile/profileAction";
import GeneralDetail from "./generaldetailpage/generalDetail";
import BankDetails from "./bankdetailpage/bankDetails";
import NominneDetals from "./nomineedetailpage/nominneDetals";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { BaseUrl } from "../../apis/contant";

const InvestorProfilePage = () => {

  const authcontext = useContext(AuthContext);
  const { setBankData } = authcontext;

  const profile_details = useSelector((state) => state.profile_details);
  const Investor_data = useSelector((state) => state.fetch_investor_data.data);

  const dispatch = useDispatch();

  const fetchBankDetailsData = async () => {
    try {
      const response = await axios.get(`${BaseUrl.url}kyc/bank-details/${Investor_data.id}`);
      setBankData(response.data);
    } catch (error) {
      throw error
    }
  };

  useEffect(() => {
    return () => fetchBankDetailsData()
  }, []);
  return (
    <>
      <section className="explore_container subscribe_container">
        <div className="bcontainer">
          <div className="explore_inner">
            <div className="explore_cnt">
              <div className="inner_container">
                <section className="myprofile">
                  <div className="bcontainer">
                    <div className="sec_container">
                      {/* <div className="inner_img backimg" style={{ backgroundImage: `url(${banner})` }}> */}
                      <div className="inner_img backimg">
                        <div className="sec_inner">
                          <div className="sec_tt">
                            <h4 className="blk">My Profile</h4>
                          </div>

                          <div className="live_tab_lists">
                            <li
                              className={`live_items${profile_details.general_details ? " active" : ""
                                }`}
                            >
                              <a
                                // href="#tab1"
                                onClick={() =>
                                  dispatch(set_current_detail_page("general"))
                                }
                              >
                                General Details
                              </a>
                            </li>
                            <li
                              className={`live_items${profile_details.bank_details ? " active" : ""
                                }`}
                            >
                              <a
                                // href="#tab2"
                                onClick={() =>
                                  dispatch(set_current_detail_page("bank"))
                                }
                              >
                                Bank Details
                              </a>
                            </li>
                            <li
                              className={`live_items${profile_details.nominee_details ? " active" : ""
                                }`}
                            >
                              <a
                                // href="#tab3"
                                onClick={() =>
                                  dispatch(set_current_detail_page("nominee"))
                                }
                              >
                                Nominee Details
                              </a>
                            </li>
                          </div>

                          <div className="live_tab_data">
                            {profile_details.general_details && <GeneralDetail />}
                            {profile_details.bank_details && <BankDetails />}
                            {profile_details.nominee_details && <NominneDetals />}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InvestorProfilePage;
