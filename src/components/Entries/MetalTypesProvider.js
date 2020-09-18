import React, { useState, useEffect } from "react";

export const MetalTypesContext = React.createContext();

export const MetalTypesProvider = (props) => {
  const [metalTypes, setMetalTypes] = useState([]);

  const getMetalTypes = () => {
    return fetch("http://localhost:8088/metalTypes")
      .then((r) => r.json())
      .then(setMetalTypes);
  };

  return (
    <MetalTypesContext.Provider
      value={{
        metalTypes,
        getMetalTypes,
      }}
    >
      {props.children}
    </MetalTypesContext.Provider>
  );
};