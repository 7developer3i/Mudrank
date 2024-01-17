import AuthContext from "./AuthContext.js";
import { useState } from "react";

export default function AuthState(props) {
  // Token get for All APIS
  const [accessToken, setAccessToken] = useState(null);
  const [resendDisabled, setResendDisabled] = useState(false); // Initially, the resend button is enabled

  //    states
  const [Signin, setSignIn] = useState();
  const [Signinphonenumber, setSignInPhoneNumber] = useState();
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [currentVarifyPage, setCurrentVarifyPage] = useState(false);
  const [newInvestor_user_id, setNewInvestor_User_Id] = useState(null);

  const [info_page_show, setInfo_Page_SHow] = useState(false);
  const [profile_card, setProfile_Card] = useState(false);
  const [mergeData, setMergeData] = useState([]);

  //fetch data on frontend
  const [startup_data, setStartup_Data] = useState([]);
  const [startup_high_lights, setStartup_High_Lights] = useState([]);
  const [selected_index, setSelected_Index] = useState(null);

  // edit purpose
  const [auth_startup_data, setAuth_Startup_Data] = useState([]);
  const [auth_high_lights, setAuth_High_Lights] = useState([]);

  //Get startup document data and store in array
  const [startup_document, setStartup_Documents] = useState([]);

  // Toast Message Every response
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState("Overview");

  //Save Investor Id And Startups Id for Investment model
  const [investment_data, setInvestment_Data] = useState({
    investorId: "",
    startupId: "",
    amount: "",
  });

  // bank details data
  const [bankData, setBankData] = useState(null);
  const [filterData, setFilterData] = useState([]);

  // subscription success messege
  const [showSucessMessage, setShowSuccessMessage] = useState(null);
  const [showError, setShowError] = useState(null);

  // token save admin
  const [Adminid, setId] = useState("");
  const [adminid, setAdminid] = useState("");
  const [dashboardtoken, setDashboardtoken] = useState("");
  const [customerData, setCustomerData] = useState([]);
  const [adminStartData, setAdminStartData] = useState("");
  const [paymentData, setPaymentData] = useState("");
  const [kycData, setKycData] = useState("");
  const [BankdetailsData, setBankDetailsData] = useState("");
  const [investorData, setInvestorData] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [records, setRecords] = useState([]);
  const [companysearch, setCompanysearch] = useState("");
  const [companyrecords, setCompanyRecords] = useState([]);
  const [paymentSearch, setPaymentSearch] = useState("");
  const [paymentrecords, setPaymentRecords] = useState([]);
  const [kycsearch, setKycSearch] = useState("");
  const [kycrecords, setKycRecords] = useState([]);
  const [adminsearch, setAdminsearch] = useState("");
  const [adminrecords, setAdminRecords] = useState([]);
  const [banksearch, setBankSearch] = useState("");
  const [bankrecords,setBankRecords] = useState([]);
  const [userData, setUserData]= useState("")
  const [nameStore,setNameStore] = useState("")
  const [loading, setLoading] = useState(false);
  const [usertableData,setUsertableData] = useState("")
  const [userinvestor,setUserinvestor] = useState("")
  const [openaddadminmodal,setOpenaddadminmodal] = useState(false)
  const [addname,setAddname] = useState("")
  const [addemail,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [role,setRole] = useState("")
  const [totalamount,setTotalamount] = useState("")
  const [customerlength,setCustomerlength] = useState('')
  const [superadminrole,setSuperadminrole] = useState("")
  const [openpopmodal,setOpenpopmodal] = useState(false)
  const [popopmessage,setPopopmessage] = useState("")
  const [status,setStatus] = useState("")
  const [highlights, setHighlights] = useState([]);
  const [files, setFiles] = useState([]);
  const [docsType, setdocsType] = useState("");
  const [userDatatwo,setUserDatatwo] = useState("")
  const [superadmin,setSuperadmin] = useState("")
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [nomineeName,setNomineeName]= useState("")
  const [nomineeDateofBith,setNomineeDateofBirth] = useState("")
  const [nomineeparent,setNomineeParent] = useState("")
  const [nomineerelation,setNomineerealtion] = useState("")
  const [nomineenumber,setContactNumber] = useState("")
  const [nomineeid,setNomineeid] = useState("")
  const [generaldetails,setGeneraldetails] = useState("")
  const [generalemail,setGeneralemail] = useState("")
  const [bankname,setBankname] = useState("")
  const [accountnum,setAccountnum] = useState("")
  const [ifsccode,setIfsccode] = useState("")
 

  return (
    <AuthContext.Provider
      value={{
        bankname,setBankname,accountnum,setAccountnum,
        ifsccode,setIfsccode,
        generalemail,setGeneralemail,
        generaldetails,setGeneraldetails,
        nomineeid,setNomineeid,
        nomineenumber,setContactNumber,
        nomineerelation,setNomineerealtion,
        nomineeparent,setNomineeParent,
        nomineeDateofBith,setNomineeDateofBirth,
        nomineeName,setNomineeName,
        superadmin,setSuperadmin,
        selectedDocuments, setSelectedDocuments,
        userDatatwo,setUserDatatwo,
        mergeData,setMergeData,
        docsType, setdocsType,
        files, setFiles,
        highlights, setHighlights,
        status,setStatus,
        popopmessage,setPopopmessage,
        openpopmodal,setOpenpopmodal,
        superadminrole,setSuperadminrole,
        totalamount,setTotalamount,
        customerlength,setCustomerlength,
        password,setPassword,
        role,setRole,
        addname,setAddname,
        addemail,setEmail,
        openaddadminmodal,setOpenaddadminmodal,
        userinvestor,setUserinvestor,
        usertableData,setUsertableData,
        loading, setLoading,
        nameStore,setNameStore,
        userData, setUserData,
        bankrecords,setBankRecords,
        banksearch, setBankSearch,
        adminrecords,
        setAdminRecords,
        adminsearch,
        setAdminsearch,
        kycrecords,
        setKycRecords,
        kycsearch,
        setKycSearch,
        paymentrecords,
        setPaymentRecords,
        paymentSearch,
        setPaymentSearch,
        companyrecords,
        setCompanyRecords,
        companysearch,
        setCompanysearch,
        searchTerm,
        setSearchTerm,
        records,
        setRecords,
        investorData,
        setInvestorData,
        BankdetailsData,
        setBankDetailsData,
        kycData,
        setKycData,
        paymentData,
        setPaymentData,
        adminStartData,
        setAdminStartData,
        customerData,
        setCustomerData,
        data,
        setData,
        dashboardtoken,
        setDashboardtoken,
        adminid,
        setAdminid,
        Adminid,
        setId,
        bankData,
        setAccessToken,
        accessToken,
        resendDisabled,
        setResendDisabled,
        setBankData,
        setShowError,
        showError,
        setShowSuccessMessage,
        showSucessMessage,
        toast,
        setCurrentVarifyPage,
        setSignInPhoneNumber,
        Signinphonenumber,
        setLoggedInUserId,
        loggedInUserId,
        setNewInvestor_User_Id,
        newInvestor_user_id,
        currentVarifyPage,
        setToast,
        message,
        setMessage,
        Signin,
        investment_data,
        setInvestment_Data,
        startup_document,
        setStartup_Documents,
        startup_data,
        setSelected_Index,
        selected_index,
        auth_high_lights,
        setAuth_High_Lights,
        startup_high_lights,
        auth_startup_data,
        setAuth_Startup_Data,
        setSignIn,
        setInfo_Page_SHow,
        setProfile_Card,
        profile_card,
        info_page_show,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
