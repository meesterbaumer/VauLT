import React from "react";
import "./Vault.css";
import { NavBar } from "./nav/NavBar";
import { ApplicationViews } from "./ApplicationViews";

export const Vault = () => (
  <>
    <div className="logoContainer">
      <img
        src={require("../Images/VauLT_LOGO.png")}
        className="vaultLogo"
        alt="Girl in a jacket"
      />
    </div>
    <NavBar />
    
    <ApplicationViews />
  </>
);
