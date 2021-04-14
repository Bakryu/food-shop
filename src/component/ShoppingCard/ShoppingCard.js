import React from "react";
import Button from "../Button";
import errorButton from "../../images/errorButton.svg";
import arrowRight from "../../images/arrowRight.svg";
import closeCardButton from "../../images/closeCardButton.svg";
import "./shoppingCard.css";

export default function ShoppingCard({
  cardData,
  setIsOpenModal,
  priceDecor,
  setUserData,
  userData,
  formInValid,
  handleReviewName,
  handleReviewNumber,
  handleSubmit,
}) {
  const { nameError, numberError } = formInValid;
  const { category, productName, price } = cardData;
  return (
    <div className="shopping-card" onClick={(event) => event.stopPropagation()}>
      <img
        className="shopping-card__close-button"
        src={closeCardButton}
        alt="close button"
        onClick={() => setIsOpenModal(false)}
      />

      <span className="card__category ">{category}</span>
      <span className="card__name shopping-card__name ">{productName}</span>
      <div className="">
        <img className="card__price-currency" src={priceDecor} alt="currency" />
        <span className="card__price">{price}</span>
      </div>
      <form
        className="shopping-card__form"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <ul className="shopping-card__input-list">
          <li className="sopping-card__input-grope">
            {nameError && (
              <img
                className="input-grope__error-image"
                src={errorButton}
                alt="error"
              />
            )}
            <input
              className={`sopping-card__input ${
                nameError && `sopping-card__input_red`
              } ${nameError === "" && `sopping-card__input_green`}`}
              type="text"
              placeholder="name"
              onBlur={handleReviewName}
              value={userData.name}
              onChange={({ target }) => {
                setUserData((prevState) => {
                  return {
                    name: target.value.split(" ").join(""),
                    number: prevState.number,
                  };
                });
              }}
            />
            <span className="shopping-card_error-massage">{nameError}</span>
          </li>
          <li className="sopping-card__input-grope">
            {numberError && (
              <img
                className="input-grope__error-image"
                src={errorButton}
                alt="error"
              />
            )}
            <input
              className={`sopping-card__input ${
                numberError && `sopping-card__input_red`
              } ${numberError === "" && `sopping-card__input_green`}`}
              type="text"
              placeholder="number"
              onBlur={handleReviewNumber}
              onChange={({ target }) => {
                setUserData((prevState) => {
                  return {
                    name: prevState.name,
                    number: target.value.split(" ").join(""),
                  };
                });
              }}
              value={userData.number}
            />
            <span className="shopping-card_error-massage">{numberError}</span>
          </li>
        </ul>

        <Button
          buttonStyle="button_big"
          buttonValue="Order"
          buttonDecorPath={arrowRight}
          buttonType="submit"
        />
      </form>
    </div>
  );
}
