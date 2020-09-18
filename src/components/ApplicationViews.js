import React from "react";
import { Route } from "react-router-dom";
import { MetalProvider } from "./Entries/MetalProvider";
import { MetalList } from "./Entries/MetalList";
import { Dashboard } from "./Dashboard/Dashboard";
import { MetalApiTestProvider } from "./MetalAPI/MetalApiTestProvider";
import { UnitProvider } from "./Units/UnitProvider";
// test
export const ApplicationViews = (props) => {
  return (
    <>
      {/* Render the location list when http://localhost:3000/ */}
      <Route exact path="/">
        <Dashboard />
      </Route>

      <MetalApiTestProvider>
        <UnitProvider>
          <MetalProvider>
            <Route exact path="/collection">
              <MetalList />
            </Route>
          </MetalProvider>
        </UnitProvider>
      </MetalApiTestProvider>

      <Route
        path="/logout"
        render={(props) => {
          localStorage.removeItem("vault_user");
          props.history.push("/login");
        }}
      />
    </>
  );
};
