import React, { useState, useEffect } from "react";

export const MetalContext = React.createContext();

export const MetalProvider = (props) => {
  const [metals, setMetals] = useState([]);

  const getMetals = () => {
    return fetch(
      "http://localhost:8088/metals?_expand=metalType&_expand=pieceType&_expand=unit&_expand=collection&_expand=user"
    )
      .then((r) => r.json())
      .then(setMetals);
  };

  const addMetals = (metal) => {
    return fetch("http://localhost:8088/metals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(metal),
    }).then(getMetals);
  };

  return (
    <MetalContext.Provider
      value={{
        metals,
        getMetals,
        addMetals,
      }}
    >
      {props.children}
    </MetalContext.Provider>
  );
};
