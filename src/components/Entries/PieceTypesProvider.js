import React, { useState, useEffect } from "react";

export const PieceTypesContext = React.createContext();

export const PieceTypesProvider = (props) => {
  const [pieceTypes, setPieceTypes] = useState([]);

  const getPieceTypes = () => {
    return fetch("http://localhost:8088/pieceTypes")
      .then((r) => r.json())
      .then(setPieceTypes);
  };

  return (
    <PieceTypesContext.Provider
      value={{
        pieceTypes,
        getPieceTypes,
      }}
    >
      {props.children}
    </PieceTypesContext.Provider>
  );
};