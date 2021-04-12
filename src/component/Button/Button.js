import React from "react";
import "./button.css";

export default function Button({ buttonStyle, buttonValue, buttonDecorPath }) {
  return (
    <button className={`button_global-style ${buttonStyle}`}>
      {buttonValue}
      <img className="button__decor" src={buttonDecorPath} />
    </button>
  );
}
