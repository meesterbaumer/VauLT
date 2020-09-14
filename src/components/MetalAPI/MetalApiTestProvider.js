import React, { useState, useEffect } from "react";

export const MetalApiTestContext = React.createContext();

export const MetalApiTestProvider = (props) => {
  const [metalTestValue, setTestValue] = useState([]);

  const getTestValue = () => {
    return fetch("http://localhost:8089/metalApiData")
      .then((r) => r.json())
      .then(setTestValue);
  };
  return (
    <MetalApiTestContext.Provider
      value={{
        metalTestValue,
        getTestValue,
      }}
    >
      {props.children}
    </MetalApiTestContext.Provider>
  );
};
