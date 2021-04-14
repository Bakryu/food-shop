import React from "react";
import "./input.css";

export default function Input({
  error,
  errorImage,
  handleReview,
  inputValue,
  setData,
  placeholder,
}) {
  return (
    <li className="input__grope">
      {error && (
        <img className="input__error-image" src={errorImage} alt="error" />
      )}
      <input
        className={`input ${error && `input_red`} ${
          error === "" && `input_green`
        }`}
        type="text"
        placeholder={placeholder}
        onBlur={handleReview}
        value={inputValue}
        onChange={({ target }) => setData(target)}
      />
      <span className="input__error-massage">{error}</span>
    </li>
  );
}
