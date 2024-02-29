import "./style/signup.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthState from "./context/AuthState.js";
import Mainpage from "./component/Mainpage";
import { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import Info from "./dashboard/compaigns/Info";
import Startup_RegistrationForm from "./dashboard/startup-rejister/register.jsx";
import Startup_Login from "./dashboard/startup-login/login";
import SuperAdmin from "./dashboard/superadmin/admin-login/superadmin";
import Card from "./dashboard/compaigns/card";
import StartupForm from "./component/startupform/form";
import { KycForm } from "./component/kycform/kyc";
import InvestorForm from "./component/investorprofile/investorProfile";
import Registerform from "./component/investorprofile/registerform";
import NoPage from "./nopage";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ExplorePage } from "./component/homepage/Explore";
import { LoginPage } from "./dashboard/investor-login/LoginPage";
import { RegisterPage } from "./dashboard/investor-register/Register";
import { OtpVarifyPage } from "./dashboard/investor-register/OtpVarify";
import { FaqPage } from "./pages/FaqPage";
import { FaqInnerPage } from "./pages/FaqInnerPage";
import { BlogPage } from "./pages/BlogPage";
import { StartupPage } from "./pages/StartupPage";
import { PartnershipPage } from "./pages/PartnershipPage";
import { RaisePage } from "./pages/RaisePage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { RiskPage } from "./pages/RiskPage";
import { TermsPage } from "./pages/TermsPage";
import { BytesPage } from "./pages/BytesPage";
import { Detailspage } from "./dashboard/superadmin/pages/details";
import { UserValidate } from "./userValidate";
import { FaqInner } from "./component/homepage/FaqInner";
import { getModalUtilityClass } from "@mui/material";
import { Imagehtml } from './image.js'
import { Navbar } from "./component/homepage/Navbar.jsx";
import { Footer } from "./component/homepage/Footer.jsx";
import FileUploadForm from './import.js'
import Solanapay from './solana.js'
import {Rezorpay} from './rezorpay.js'



// import DashboardPage from "../src/adminDash/src/appppp.jsx";

function App() {


  useEffect(() => {
    const isAdminDashboard = window.location.pathname.includes('admin/detail-page');
    console.log(isAdminDashboard);

    // Dynamically import the appropriate CSS file
    if (!isAdminDashboard) {
      import('./css/menu_style.css').then(() => {
        console.log('Menu Style CSS loaded');
      }).catch(error => console.error('Error loading Menu Style CSS:', error));

      import('./css/style.css').then(() => {
        console.log('Regular CSS loaded');
      }).catch(error => console.error('Error loading Regular CSS:', error));

      import('./index.css').then(() => {
        console.log('Regular CSS loaded');
      }).catch(error => console.error('Error loading Regular CSS:', error));

      import('./style/otp.css').then(() => {
        console.log('Regular CSS loaded');
      }).catch(error => console.error('Error loading Regular CSS:', error));

      import('./style/dealterm.css').then(() => {
        console.log('Regular CSS loaded');
      }).catch(error => console.error('Error loading Regular CSS:', error));

      import('./style/document.css').then(() => {
        console.log('Regular CSS loaded');
      }).catch(error => console.error('Error loading Regular CSS:', error));


      import('./style/explorer.css').then(() => {
        console.log('Regular CSS loaded');
      }).catch(error => console.error('Error loading Regular CSS:', error));


      import('./style/subscription.css').then(() => {
        console.log('Regular CSS loaded');
      }).catch(error => console.error('Error loading Regular CSS:', error));
    }
  }, []);
  const clientId =
    "980782095781-do0n8t19ojpaloar2d6i7loe56dqehob.apps.googleusercontent.com";


  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      });
    }

    gapi.load("client:auth2", start);

  });



  return (
    <>
      <AuthState>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/loginpage" element={<><Navbar /><main id="main-content" className="main-content" role="main" tabIndex="-1">
              <LoginPage /><Footer /></main></>} />
            <Route path="/registerpage" element={<><Navbar /><main id="main-content" className="main-content" role="main" tabIndex="-1"><RegisterPage /><Footer /></main></>} />
            <Route path="/otpvarifypage" element={<><Navbar /><main id="main-content" className="main-content" role="main" tabIndex="-1"><OtpVarifyPage /><Footer /></main>,
            </>} />
            <Route path="/registerform" element={<Registerform />} />
            <Route path="/mainpage" element={<Mainpage />} />
            <Route path="/explorepage" element={<ExplorePage />} />
            <Route path="/info" element={<UserValidate><Info /></UserValidate>} />
            <Route path="/kyc-form" element={<UserValidate><KycForm /></UserValidate>} />
            <Route path="/startup-register" element={<Startup_RegistrationForm />} />
            <Route path="/startup-login" element={<Startup_Login />} />
            <Route path="/card" element={<UserValidate><Card /></UserValidate>} />
            <Route path="/admin/detail-page" element={<Detailspage />} />
            {/* <Route path="/admin/detail-page" element={<DashboardPage />} /> */}
            <Route path="/superadmin/login" element={<><Navbar /><main id="main-content" className="main-content" role="main" tabIndex="-1"><SuperAdmin /><Footer /></main></>} />
            <Route path="/startupform" element={<StartupForm />} />
            <Route path="investorform" element={<InvestorForm />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="*" element={<NoPage />} />
            <Route path="faq" element={<FaqPage />} />
            <Route path="faqinner" element={<FaqInnerPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="startup" element={<StartupPage />} />
            <Route path="partners" element={<PartnershipPage />} />
            <Route path="raise-capital" element={<RaisePage />} />
            <Route path="privacy-policy" element={<PrivacyPage />} />
            <Route path="risk-of-investment" element={<RiskPage />} />
            <Route path="terms-and-conditions" element={<TermsPage />} />
            <Route path="bytes" element={<BytesPage />} />
            <Route path="/image" element={<Imagehtml />} />
            <Route path="/ch" element={<FileUploadForm />} />
            <Route path="/solana" element={<Solanapay />} />
            <Route path="/rezorpay" element={<Rezorpay />} />


          </Routes>
        </BrowserRouter>
      </AuthState>
    </>
  );
}

export default App;
