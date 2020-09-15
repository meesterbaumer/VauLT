import React, { useState, useEffect } from "react"
import apiKey from "../../Settings"

export const MetalApiContext = React.createContext()

export const MetalApiProvider = (props) => {
  const [metalValue, setValue] = useState([])

  const getValue = () => {
    return fetch(`https://metals-api.com/api/latest/?access_key=${apiKey.metalKey}&base=USD&symbols=XAU,XAG,XPD,XPT,XRH`)
    .then(r => r.json())
    .then(setValue)
  }
  return (
    <MetalApiContext.Provider value={{
      metalValue, getValue
    }}>
      {props.children}
    </MetalApiContext.Provider>
  )
}