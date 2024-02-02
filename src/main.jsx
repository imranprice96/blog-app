import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "./styles/reset.css";
import Router from "./components/Router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
