import React, { useRef } from "react";

export const ShowCollectionModal = () => {
  const newCollection = useRef();

  const newCollectionButtonClicked = (e) => {
    e.preventDefault();

    newCollection.current.showModal();
  };
  return (
    <>
      <button onClick={newCollectionButtonClicked} id="button">
        click
      </button>

      <dialog className="dialog--addCollection" ref={newCollection} >
        <div>hello</div>
        <div>hi</div>
        <button onClick={(e) => newCollection.current.close()}>close</button>
      </dialog>
    </>
  );
};
