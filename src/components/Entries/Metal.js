// this component allows you to edit the individual metal entry that displays to the DOM

import React from "react";
import "./Metal.css";

export const Metal = ({ metal, metalValue }) => {
  console.log(metalValue);
  const rates = metalValue.rates
  const correctRate = rates.XAG*1000
  return (
    <div className="singleMetal">
      <div className="metal__name">{metal.name}</div>
  <div className="metal__weight">Weight: {metal.weight} {metal.unit.name}</div>
      <div className="metal__currentValue">Current Value: $ {parseFloat(correctRate * metal.weight).toFixed(2)}</div>
    </div>
  );
};
