import React from "react";
import { formList } from "../lists";

export default ({ activeForm, setActiveForm }) => {
  const index = formList.indexOf(activeForm);
  let prev = false;
  let next = false;
  if (index > 0) {
    prev = formList[index - 1];
  }
  if (index < formList.length) {
    next = formList[index + 1];
  }
  return (
    <div className="display-flex">
      {prev ? (
        <button
          type="button"
          className="nav-button navbar-start button is-link"
          onClick={() => setActiveForm(prev)}
        >
          {prev} &#8678;
        </button>
      ) : (
        ""
      )}
      {next ? (
        <button
          type="button"
          className="nav-button navbar-end button is-link"
          onClick={() => setActiveForm(next)}
        >
          {next} &#8680;
        </button>
      ) : (
        ""
      )}
    </div>
  );
};
