// this component allows you to edit the individual metal entry that displays to the DOM

import React from "react"
import "./Metal.css"

export const Metal = ({ metal }) => (
  <div className="metal">
    <div className="metal__name">{metal.name}</div>
    <div className="metal__weight">{metal.weight}</div>
<div className="metal__currentValue">Current Value goes here</div>
  </div>
)