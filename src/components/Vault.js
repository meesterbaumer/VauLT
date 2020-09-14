import React from "react";
import { MetalList } from "./Entries/MetalList";
import { MetalProvider } from "./Entries/MetalProvider";
import "./Vault.css";
import { MetalApiTestProvider } from "./MetalAPI/MetalApiTestProvider";

export const Vault = () => (
  <>
    <h1>VauLT</h1>
    <MetalApiTestProvider>
      <MetalProvider>
        <MetalList />
      </MetalProvider>
    </MetalApiTestProvider>
  </>
);
