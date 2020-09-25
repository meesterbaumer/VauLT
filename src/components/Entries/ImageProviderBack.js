import React, { useState } from "react";

export const ImageBackContext = React.createContext();

export const ImageBackProvider = (props) => {
  const [loadingBack, setLoadingBack] = useState(false);
  const [imageURLBack, setImageURLBack] = useState("");

  const uploadImageBack = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append(`file`, files[0]);
    data.append(`upload_preset`, `vaultapp`);
    setLoadingBack(true);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/meesterbaumer/image/upload`,
      {
        method: `POST`,
        body: data,
      }
    );
    await res.json().then((parsedObj) => {
      setImageURLBack(parsedObj.url);
      setLoadingBack(false);
    });
  };
  return (
    <ImageBackContext.Provider
      value={{
        uploadImageBack,
        loadingBack,
        setLoadingBack,
        imageURLBack,
        setImageURLBack,
      }}
    >
      {props.children}
    </ImageBackContext.Provider>
  );
};