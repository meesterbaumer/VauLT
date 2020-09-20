import React, { useRef } from "react";


  
  export const NewCollectionButtonClicked = (e) => {
    const newCollection = useRef()
    
    e.preventDefault();
    newCollection.current.showModal()
    return (
      <>
        <dialog className="dialog--addCollection" ref={newCollection} >
          <div>hello</div>
          <div>hi</div>
          <button onClick={(e) => newCollection.current.close()}>close</button>
        </dialog>
      </>
    );
  };
  

