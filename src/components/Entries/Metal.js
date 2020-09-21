// this component allows you to edit the individual metal entry that displays to the DOM

import React, { useContext, useRef } from "react";
import { MetalContext } from "./MetalProvider";
import "./Metal.css";

export const Metal = ({ metal, metalValue }) => {
  const { deleteMetals } = useContext(MetalContext);
  const { deleteConfirmDialog } = useRef();

  const rates = metalValue.rates;
  const correctRate = 1 / rates.XAG;

  return (
    <>
      <div className="singleMetal">
        <div className="metal__name">{metal.name}</div>
        <div className="metal__weight">
          Weight: {metal.weight} {metal.unit.name}
        </div>
        <div className="metal__currentValue">
          Current Value: $ {parseFloat(correctRate * metal.weight).toFixed(2)}
        </div>
        <button
          onClick={() => {
            deleteMetals(metal.id)
          }}
          className="metal--delete"
        >
          Delete
        </button>
      </div>
    </>
  );
};
