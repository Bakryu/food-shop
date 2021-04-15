import React from "react";
import "./input.css";

const getInputClassName = (errorText) => {
  if (errorText) {
    return "input_red";
  }
  if (errorText === "") {
    return "input_green";
  }
};

export default function Input({
  error,
  errorImage,
  onBlur,
  inputValue,
  onChange,
  placeholder,
  name,
}) {
  const inputStyle = `input  ${getInputClassName(error, inputValue)}`;

  return (
    <li className="input__grope">
      {error && (
        <img className="input__error-image" src={errorImage} alt="error" />
      )}
      <input
        className={inputStyle}
        type="text"
        placeholder={placeholder}
        onBlur={onBlur}
        value={inputValue}
        onChange={onChange}
        name={name}
      />
      <span className="input__error-massage">{error}</span>
    </li>
  );
}
