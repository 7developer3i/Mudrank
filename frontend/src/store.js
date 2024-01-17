import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./feature/navbaraction/navbarSlice.js";
import apiDataReducer from "./feature/dashboard/admindetails/fetchdataSlice.js";
import viewReducer from "./feature/dashboard/admindetails/view/viewSlice.js";
import dashboard_Navbar_Reducer from "./feature/dashboard/admindetails/navbar/navbarSlice.js";
import registerReducer from "./feature/actions/subscriptionreducer/reducer.js";
import formReducer from "./feature/investor/formSlice.js";
import formDataFetchReducer from "./feature/investor/formDataFetch.js";
import subscriptionReducer from "./feature/actions/subscriptionreducer/reducer.js";
import createKYCReducer from "./feature/kycsteps/action.js";
import createProfileReducer, { bankDetailsReducer } from "./feature/investor-profile/profileAction.js";
import investorProfileDataReducer from "./feature/investor-profile/fetchProfileData.js";
import dashboardInvestorDataReducer from "./feature/dashboard/investors/investorDataSlice.js"
import InvestmentReducer from "./feature/dashboard/investments/investmenstSlice.js";
import blogReducer from "./feature/website/blogs/blogSlice.js";
import h_customerReducer from "./feature/website/happy-customer/customerSlice.js";
import fundraisingReducer from "./feature/website/fundraising/fundraisingSlice.js";
import completedstartupReducer from './feature/website/completedstartup/startupSlice.js';
import privacyReducer from "./feature/website/privacy/privacySlice.js";
import aboutReducer from "./feature/website/about/aboutSlice.js";
import browseReducer from "./feature/website/browse/browseSlice.js";
import faqReducer from "./feature/website/faq/faqSlice.js";
import frequentlyReducer from "./feature/website/frequentlyasked/frequentlySlice.js";
import curatedReducer from "./feature/website/curedpage/curedSlice.js";
// import curedReducer from './feature/website/cured/curedSlice.js'



export const store = configureStore({
    reducer:{
        navbar_page:navbarReducer,
        apiData:apiDataReducer,
        viewPageData:viewReducer,
        dashboard_navbar:dashboard_Navbar_Reducer,
        register_role:registerReducer,
        investor_form:formReducer,
        fetch_investor_data:formDataFetchReducer,
        subscription_page:subscriptionReducer,
        kyc_steps:createKYCReducer,
        profile_details:createProfileReducer,
        bank_details:bankDetailsReducer,
        investor_profile_datails:investorProfileDataReducer,
        dashboardUserData:dashboardInvestorDataReducer,
        dashboardInvestments:InvestmentReducer,
        blog:blogReducer,
        hcustomer:h_customerReducer,
        fundraising:fundraisingReducer,
        completedstartup :completedstartupReducer,
        privacy:privacyReducer,
        about:aboutReducer,
        browse:browseReducer,
        faq:faqReducer,
        freq:frequentlyReducer,
        curated:curatedReducer
    }
})