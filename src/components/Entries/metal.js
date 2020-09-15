// this component allows you to edit the individual metal entry that displays to the DOM

import React from "react";
import "./Metal.css";

export const Metal = ({ metal, metalValue }) => {
  console.log(metalValue);
  const rates = metalValue[0].rates
  const correctRate = rates.XAG*1000
  return (
    <div className="singleMetal">
      <div className="metal__name">{metal.name}</div>
      <div className="metal__weight">{metal.weight}</div>
      <div className="metal__currentValue">{correctRate}</div>
    </div>
  );
};
