import React, { useState, useEffect } from "react";

export const CollectionContext = React.createContext();

export const CollectionProvider = (props) => {
  const [collectionOptions, setCollections] = useState([]);

  const getCollections = () => {
    return fetch("http://localhost:8088/collections")
      .then((r) => r.json())
      .then(setCollections);
  };

  return (
    <CollectionContext.Provider
      value={{
        collectionOptions,
        getCollections,
      }}
    >
      {props.children}
    </CollectionContext.Provider>
  );
};