import React, { useState, useEffect } from "react";

export const CollectionContext = React.createContext();

export const CollectionProvider = (props) => {
  const [collectionOptions, setCollections] = useState([]);

  const getCollections = () => {
    return fetch("http://localhost:8088/collections")
      .then((r) => r.json())
      .then(setCollections);
  };

  const addCollections = (collection) => {
    return fetch("http://localhost:8088/collections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(collection),
    }).then(getCollections);
  };

  return (
    <CollectionContext.Provider
      value={{
        collectionOptions,
        getCollections,
        addCollections,
      }}
    >
      {props.children}
    </CollectionContext.Provider>
  );
};
