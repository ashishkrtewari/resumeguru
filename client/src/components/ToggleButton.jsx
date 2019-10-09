import React from "react";

export default function ToggleButton(props) {
  return (
    <button className="ml-auto button" type="button">{props.switch ? "ON" : "OFF"}</button>
  )
}