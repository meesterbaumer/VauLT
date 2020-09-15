import React, { useContext, useEffect } from "react";
import { MetalContext } from "./MetalProvider";
import { MetalApiTestContext } from "../MetalAPI/MetalApiTestProvider";
import { Metal } from "./Metal";
import "./Metal.css";

export const MetalList = () => {
  const { metals, getMetals } = useContext(MetalContext);
  const { metalTestValue, getTestValue } = useContext(MetalApiTestContext);

  useEffect(() => {
    getTestValue().then(getMetals);
  }, []);
  console.log(metals);
  console.log(metalTestValue);

  const CollectionWeight = metals.map(metal => {
    return metal.weight
  })
  console.log(CollectionWeight)
  const collectionWeightTotal = 0
  


  return (
    <>
      <div className="ValueContainer">
        <div className="collectionHeader">Collection</div>
        <div className="collectionValue">Collection Value goes here</div>
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
