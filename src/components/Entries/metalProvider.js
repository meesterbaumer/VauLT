import React, { useState, useEffect } from "react"

export const MetalContext = React.createContext()

export const MetalProvider = (props) => {
  const [metals, setMetals] = useState([])

  const getMetals = () => {
    return fetch("http://localhost:8088/metals")
    .then(r => r.json())
    .then(setMetals)
  }


  return (
    <MetalContext.Provider value={{
      metals, getMetals
    }}>
      {props.children}
    </MetalContext.Provider>
  )
}

