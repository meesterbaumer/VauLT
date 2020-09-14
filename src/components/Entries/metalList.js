import React, { useContext, useEffect } from "react"
import { MetalContext } from "./metalProvider"
import { Metal } from "./metal"
import "./metal.css"

export const MetalList = () => {
  const { metals, getMetals } = useContext(MetalContext)

  useEffect(() => {
    getMetals()
  }, [])

  return (
    <div className="metals">
      {
        metals.map(m => <Metal key={m.id} metal={m} />)
      }
    </div>
  )
}

