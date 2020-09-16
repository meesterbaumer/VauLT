import React, { useContext, useEffect } from "react"
import { MetalApiTestContext } from "./MetalApiTestProvider";

export const MetalApiGetter = () => {
  const { metalTestValue, getTestValue } = useContext(MetalApiTestContext)

  useEffect(() => {
    getTestValue()
  }, [])
  console.log(metalTestValue)
}