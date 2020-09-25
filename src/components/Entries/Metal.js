// this component allows you to edit the individual metal entry that displays to the DOM

import React, { useContext, useRef } from "react";
import { MetalContext } from "./MetalProvider";
import { MetalList, editPieceButtonClicked } from "./MetalList";
import "./Metal.css";



export const Metal = ({ metal, metalValue, props }) => {
  const { deleteMetals } = useContext(MetalContext);
  // const { deleteConfirmDialog } = useRef();

  const rates = metalValue.rates;
  const correctRate = 1 / rates.XAG;

  return (
    <>
      <div className="singleMetal">
        <div className="metal__name">{metal.name}</div>
        <div>
        <img className="metal__imageFront" src={metal.imageFront} style={{width: `100px`}} alt=""></img>
        </div>
        <div>
        <img className="metal__imageBack" src={metal.imageBack} style={{width: `100px`}} alt=""></img>
        </div>
        <div className="metal__weight">
          Weight: {metal.weight} {metal.unit.name}
        </div>
        <div className="metal__qty">
          qty: {metal.qty}
        </div>
        <div className="editDeleteButtonContainer">
        <button
          className="metal--edit"
          onClick={() => {
            props.push(`/collection/edit/${metal.id}`)
          }}
        >
          Edit
        </button>
        <button
          onClick={() => {
            deleteMetals(metal.id);
          }}
          className="metal--delete"
        >
          Delete
        </button>
        </div>
        <div className="metal__currentValue">
          Current Value: $ {parseFloat(correctRate * metal.weight).toFixed(2)}
        </div>
      </div>
    </>
  );
};
