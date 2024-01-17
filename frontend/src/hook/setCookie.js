import Cookies from "js-cookie";


const SetCookie = (cookiename, userin) => {
   Cookies.set(cookiename, userin, {
     expires:1, //1 day
     secure:true,
     sameSite:"Strict",
     path:"/"
   });
};

export default SetCookie;