import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./Vault.css";
import { MetalApiTestProvider } from "./MetalAPI/MetalApiTestProvider";

export const Vault = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("vault_user")) {
          return (
            <>
              <div className="logoContainer">
                <img
                  src={require("../Images/VauLT_LOGO.png")}
                  className="vaultLogo"
                  alt="vaultLogo"
                />
              </div>

              {/* <MetalApiTestProvider> */}
                <NavBar />
                <ApplicationViews />
              {/* </MetalApiTestProvider> */}
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login" render={(props) => <Login {...props} />} />
    <Route path="/register" render={(props) => <Register {...props} />} />
  </>
);
