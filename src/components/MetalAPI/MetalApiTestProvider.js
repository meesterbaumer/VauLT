import React, { useState, useEffect } from "react";
import apiKey from "../../Settings"

export const MetalApiTestContext = React.createContext();

export const MetalApiTestProvider = (props) => {
  const [metalTestValue, setTestValue] = useState({"rates": {}});

  const getTestValue = () => {
    return fetch(`https://cors-anywhere.herokuapp.com/https://metals-api.com/api/latest/?access_key=${apiKey.metalKey}&base=USD&symbols=XAU%2CXAG%2CXPD%2CXPT%2CXRH`)
    .then((r) => r.json())
    .then(setTestValue);
  };
  useEffect(() => {
    getTestValue()
  }, [])
  console.log(metalTestValue)
  
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
// http://localhost:8089/metalApiData