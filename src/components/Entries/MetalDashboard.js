// this component allows you to edit the individual metal entry that displays to the DOM

import React from "react";
import "../Dashboard/MetalDashboard.css";

export const Metal = ({ metal, metalValue }) => {

  const rates = metalValue.rates;
  const correctRate = 1 / rates.XAG;

  return (
    <>
      <div className="singleMetalDash">
        <div className="metal nameDash">Name: {metal.name}</div>
        <div className="metal weightDash">
          Weight: {metal.weight} {metal.unit.name}
        </div>
        <div className="metal qtyDash">qty: {metal.qty}</div>
        <div className="metal currentValueDash">
          Current Value: ${" "}
          {parseFloat(correctRate * metal.weight).toFixed(2)}
        </div>
        <div className="metal profitDash">
          Profit: ${" "}
          {parseFloat(correctRate * metal.weight).toFixed(2)}
        </div>
      </div>
    </>
  );
};
