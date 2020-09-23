import React, { useRef } from "react";

export const RenderModal = () => {
  const testDialog = useRef()

  const modalTrigger = () => {
    // e.preventDefault()

    testDialog.current.showModal()
  }
  modalTrigger()

  return (
    <>
      <dialog
        className="dialog dialog--newCollection"
        ref={testDialog}
      >
      <div>hi</div>
      <div>hi</div>

      </dialog>
    </>
  );
};
