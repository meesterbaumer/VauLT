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

  const userMetals = metals.filter((m) => {
    return m.userId === parseInt(localStorage.vault_user)
  })
  console.log(userMetals)

  const CollectionWeight = userMetals.map((metal) => {
    return metal.weight;
  });
  console.log(CollectionWeight);

  let collectionWeightTotal = 0;
  for (const piece of CollectionWeight) {
    collectionWeightTotal = collectionWeightTotal + piece;
  }
  console.log(collectionWeightTotal);

  console.log(metalTestValue.rates.XAG);
  console.log(parseInt(localStorage.vault_user))


  return (
    <>
      <div className="collectionContainer">
        <div className="collectionValue">
          <div className="collectionHeader">Collection Value</div>
          <div className="collectionWorth">
            ${" "}
            {parseFloat(
              metalTestValue.rates.XAG * 1000 * collectionWeightTotal
            ).toFixed(2)}
          </div>
          <div className="collectionUpdate">
            Data current as of{" "}
            {new Date(metalTestValue.timestamp * 1000).toLocaleString(
              "en-US"
            )}
          </div>
        </div>
      </div>

      <div className="metals">
        {userMetals.map((m) => {
          return <Metal key={m.id} metal={m} metalValue={metalTestValue} />;
        })}
      </div>
    </>
  );
};