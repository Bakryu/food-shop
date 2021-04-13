import React from "react";
import "./button.css";

export default function Button({
  buttonStyle,
  buttonValue,
  buttonDecorPath,
  handleChange,
}) {
  return (
    <button
      className={`button_global-style ${buttonStyle}`}
      onClick={handleChange}
    >
      {buttonValue}
      <img className="button__decor" src={buttonDecorPath} />
    </button>
  );
}
