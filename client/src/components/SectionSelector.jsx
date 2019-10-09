import React from "react";
import ToggleButton from './ToggleButton';

export default function SectionSelector(props) {
  return (
    <div className="columns box">
      <h4>{props.title}</h4>
      <ToggleButton switch={props.switch}/>
    </div>
  )
}