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
  const pieceProfit = correctRate - metal.purchasedPrice
  console.log(pieceProfit)

  return (
    <>
      {/* Flippy Metals */}

      <div className="singleMetal">
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front metal">
              <img
                className="metal__imageFront"
                src={metal.imageFront}
                style={{ height: `150px` }}
                alt=""
              ></img>
            </div>
            <div class="flip-card-back">
              <img
                className="metal__imageBack"
                src={metal.imageBack}
                style={{ height: `150px` }}
                alt=""
              ></img>
            </div>
          </div>
        </div>

        <div class="flip-cardDetails">
          <div class="flip-card-innerDetails">
            <div class="flip-card-frontDetails metalDetails">
              <div className="metal__name">{metal.name}</div>
              <div className="metal__weight">
                Weight: {metal.weight} {metal.unit.name}
              </div>
              <div className="metal__qty">qty: {metal.qty}</div>
            </div>
            <div class="flip-card-backDetails">
              <div className="metal__currentValue">
                Current Value:<br></br>${" "}
                {parseFloat(correctRate * metal.weight * metal.qty).toFixed(2)}
              </div>
              <br></br>
              <div className="metal__currentValue">
                Profit:<br></br>${" "}
                {parseFloat(pieceProfit * metal.weight * metal.qty).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
       
        <div className="editDeleteButtonContainer">
          <button
            className="metal--edit"
            onClick={() => {
              props.push(`/collection/edit/${metal.id}`);
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
      </div>
    </>
  );
};
