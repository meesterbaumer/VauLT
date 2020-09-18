import React, { useState, useEffect } from "react";

export const UnitContext = React.createContext();

export const UnitProvider = (props) => {
  const [unitOptions, setUnits] = useState([]);

  const getUnits = () => {
    return fetch("http://localhost:8088/units")
      .then((r) => r.json())
      .then(setUnits);
  };

  return (
    <UnitContext.Provider
      value={{
        unitOptions,
        getUnits,
      }}
    >
      {props.children}
    </UnitContext.Provider>
  );
};