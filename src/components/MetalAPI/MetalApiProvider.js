import React, { useState, useEffect } from "react";
import apiKey from "../../Settings";

export const MetalApiContext = React.createContext();

export const MetalApiProvider = (props) => {
  const [metalValue, setValue] = useState({ rates: {} });

  const getValue = () => {
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://metals-api.com/api/latest/?access_key=${apiKey.metalKey}&base=USD&symbols=XAU%2CXAG%2CXPD%2CXPT%2CXRH`
    )
      .then((r) => r.json())
      .then(setValue);
  };

  useEffect(() => {
    getTestValue();
  }, []);
  console.log(metalTestValue);

  return (
    <MetalApiContext.Provider
      value={{
        metalValue,
        getValue,
      }}
    >
      {props.children}
    </MetalApiContext.Provider>
  );
};
