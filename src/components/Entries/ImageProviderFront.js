import React, { useState } from "react";

export const ImageFrontContext = React.createContext();

export const ImageFrontProvider = (props) => {
  const [loadingFront, setLoadingFront] = useState(false);
  const [imageURLFront, setImageURLFront] = useState("");

  const uploadImageFront = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append(`file`, files[0]);
    data.append(`upload_preset`, `vaultapp`);
    setLoadingFront(true);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/meesterbaumer/image/upload`,
      {
        method: `POST`,
        body: data,
      }
    );
    await res.json().then((parsedObj) => {
      setImageURLFront(parsedObj.url);
      setLoadingFront(false);
    });
  };
  return (
    <ImageFrontContext.Provider
      value={{
        uploadImageFront,
        loadingFront,
        setLoadingFront,
        imageURLFront,
        setImageURLFront,
      }}
    >
      {props.children}
    </ImageFrontContext.Provider>
  );
};
