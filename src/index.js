import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Vault } from "./components/Vault";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Vault />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
