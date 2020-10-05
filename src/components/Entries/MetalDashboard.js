// this component allows you to edit the individual metal entry that displays to the DOM

import React from "react";
import "../Dashboard/MetalDashboard.css";

export const Metal = ({ metal, metalValue }) => {

  const rates = metalValue.rates;
  const correctRate = 1 / rates.XAG;

  return (
    <>
      <div className="singleMetal">
        <div className="metal__nameDash">Name: {metal.name}</div>
        <div className="metal__weightDash">
          Weight: {metal.weight} {metal.unit.name}
        </div>
        <div className="metal__qtyDash">qty: {metal.qty}</div>
        <div className="metal__currentValueDash">
          Current Value:<br></br> ${" "}
          {parseFloat(correctRate * metal.weight).toFixed(2)}
        </div>
        <br></br>
        <div className="metal__profitDash">
          Profit: $ <br></br>{" "}
          {parseFloat(correctRate * metal.weight).toFixed(2)}
        </div>
      </div>
    </>
  );
};
