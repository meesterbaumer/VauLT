import React, { useState, useEffect } from "react";

export const MetalContext = React.createContext();

export const MetalProvider = (props) => {
  const [metals, setMetals] = useState([]);

  const getMetals = () => {
    return fetch("http://localhost:8088/metals?_expand=metalType&_expand=pieceType&_expand=unit&_expand=collection&_expand=user")
      .then((r) => r.json())
      .then(setMetals);
  };

  console.log("hi")

  return (
    <MetalContext.Provider
      value={{
        metals,
        getMetals,
      }}
    >
      {props.children}
    </MetalContext.Provider>
  );
};