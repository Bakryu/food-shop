import React from "react";
import "./button.css";

export default function Button({
  buttonStyle,
  buttonValue,
  buttonDecorPath,
  handleChange,
  buttonType
}) {
  return (
    <button
      type={buttonType}
      className={`button_global-style ${buttonStyle}`}
      onClick={handleChange}
    >
      {buttonValue}
      <img className="button__decor" src={buttonDecorPath} />
    </button>
  );
}
