import React, { useContext, useEffect } from "react";
import { MetalContext } from "./MetalProvider";
import { MetalApiTestContext } from "../MetalAPI/MetalApiTestProvider";
import { Metal } from "./Metal";
import "./Metal.css";

export const MetalList = () => {
  const { metals, getMetals } = useContext(MetalContext);
  const { metalTestValue } = useContext(MetalApiTestContext);

  useEffect(() => {
    getMetals();
  }, []);
  console.log(metals);
  console.log(metalTestValue);

  const CollectionWeight = metals.map(metal => {
    return metal.weight
  })
  console.log(CollectionWeight)
  
  let collectionWeightTotal = 0
  for (const piece of CollectionWeight) {
    collectionWeightTotal = collectionWeightTotal + piece
  }
  console.log(collectionWeightTotal)
  
  
  
  console.log(metalTestValue[0].timestamp)
  // const rate = value.timestamp
  // console.log(rate)
  // test
  
  
  return (
    <>
      <div className="ValueContainer">
        <div className="collectionHeader">Collection</div>
  <div className="collectionValue">{collectionWeightTotal}</div>
        <div className="collectionUpdate">timestamp goes here</div>
      </div>
      <div className="metals">
        {metals.map((m) => {
          return <Metal key={m.id} metal={m} metalValue={metalTestValue} />;
        })}
      </div>
    </>
  );
};
