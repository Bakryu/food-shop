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
}) {
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
      <form>
        <ul className="shopping-card__input-list">
          <li className="sopping-card__input-grope">
            <label className="input-grope_error" htmlFor="name">
              Error
            </label>
            <img
              className="input-grope__error-image"
              src={errorButton}
              alt="error"
            />
            <input
              className="sopping-card__input"
              type="text"
              name="name"
              placeholder="name"
              onChange={({ target }) => {
                setUserData((prevState) => {
                  return {
                    name: target.value,
                    number: prevState.number,
                  };
                });
              }}
              value={userData.name}
            />
          </li>
          <li className="sopping-card__input-grope">
            <label className="input-grope_error" htmlFor="number">
              Error
            </label>{" "}
            <img
              className="input-grope__error-image"
              src={errorButton}
              alt="error"
            />
            <input
              className="sopping-card__input"
              type="text"
              name="number"
              placeholder="number"
              onChange={({ target }) => {
                setUserData((prevState) => {
                  return {
                    name: prevState.name,
                    number: target.value,
                  };
                });
              }}
              value={userData.number}
            />
          </li>
        </ul>

        <Button
          buttonStyle="button_big"
          buttonValue="Order"
          buttonDecorPath={arrowRight}
          handleChange={() => {}}
        />
      </form>
    </div>
  );
}
