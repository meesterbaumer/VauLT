import React from "react"
import "./Metal.css"

export const Metal = ({ metal }) => (
  <div className="metal">
    <div className="metal__name">{metal.name}</div>
  </div>
)