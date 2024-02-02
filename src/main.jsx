import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import Navbar from "./components/Navbar.jsx";
import "./styles/index.css";
import "./styles/reset.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Navbar />
    <App />
  </React.StrictMode>
);
