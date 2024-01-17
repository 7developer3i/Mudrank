import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./style/otp.css";
import "./style/dealterm.css";
import "./style/document.css";
import "./style/explorer.css";
import "./style/subscription.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import WebsiteState from "./websitecontext/websiteState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <WebsiteState>
        <App />
      </WebsiteState>
    </Provider>
  </React.StrictMode>
);
