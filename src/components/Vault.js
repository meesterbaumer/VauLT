import React from "react"
import { MetalList } from "./Entries/MetalList"
import { MetalProvider } from "./Entries/MetalProvider"
import "./Vault.css"

export const Vault = () => (
    <>
        <h1>VauLT</h1>
        <MetalProvider>
          <MetalList />
        </MetalProvider>
    </>
)