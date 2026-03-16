import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import GeneralProvider from "./hooks/GeneralContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GeneralProvider>
    <App />
  </GeneralProvider>
);
