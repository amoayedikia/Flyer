import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.css";
import Amplify, { Auth } from "aws-amplify";
const awsconfig = {
  REGION: "ap-southeast-2",
  USER_POOL_ID: "ap-southeast-2_VpEXKsnLb",
  APP_CLIENT_ID: "6k5k7urfk4ak4806pcbidj0edr"
};
Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: awsconfig.REGION,
    userPoolId: awsconfig.USER_POOL_ID,
    userPoolWebClientId: awsconfig.APP_CLIENT_ID
  }
});
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
