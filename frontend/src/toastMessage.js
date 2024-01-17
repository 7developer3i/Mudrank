import React, { useState, useContext } from "react";
import AuthContext from "./context/AuthContext";

const ToastMessage = () => {

  const [time, setTime] = useState(null);
  const Authcontext = useContext(AuthContext);
  const { toast, message, setToast } = Authcontext

  const getTimeDifference = (start, end) => {
    const diff = Math.abs(end - start);
    const minutes = Math.floor(diff / 1000 / 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return `${minutes} minutes and ${seconds} seconds ago`;
  };

  return (
    <div className="p-3 m-0 border-0 bd-example">
      <div className={`toast fade ${toast ? 'show' : 'hide'}`} role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header">
          <svg className="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#007aff"></rect></svg>
          <strong className="me-auto">Mudrank</strong>
          <small>11second ago</small>
          <button type="button" onClick={()=>setToast(!toast)} className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div className="toast-body">
          Wlcome to Mudrank, {message}
        </div>
      </div>
    </div>
  );
};

export default ToastMessage;
