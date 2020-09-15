import React, { useContext, useEffect } from "react";
import { MetalContext } from "./MetalProvider";
import { MetalApiTestContext } from "../MetalAPI/MetalApiTestProvider";
import { Metal } from "./Metal";
import "./Metal.css";

export const MetalList = () => {
  const { metals, getMetals } = useContext(MetalContext);
  const { metalTestValue, getTestValue } = useContext(MetalApiTestContext);

  useEffect(() => {
    getMetals();
    getTestValue();
  }, []);
  console.log(metals);
  console.log(metalTestValue);
  return (
    <div className="metals">
      {metals.map((m) => {
        return <Metal key={m.id} metal={m} metalValue={metalTestValue} />;
      })}
    </div>
  );
};
