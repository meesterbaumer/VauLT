import React from "react";
import { Route } from "react-router-dom";
import { MetalProvider } from "./Entries/metalProvider";
import { MetalList } from "./Entries/metalList";
import { Dashboard } from "./Dashboard/Dashboard";
import { MetalApiTestProvider } from "./MetalAPI/MetalApiTestProvider";

export const ApplicationViews = (props) => {
  return (
    <>
      {/* Render the location list when http://localhost:3000/ */}
      <Route exact path="/">
        <Dashboard />
      </Route>

      <MetalApiTestProvider>
        <MetalProvider>
          <Route exact path="/collection">
            <MetalList />
          </Route>
        </MetalProvider>
      </MetalApiTestProvider>
    </>
  );
};
