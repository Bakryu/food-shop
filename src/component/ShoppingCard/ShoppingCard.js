import React from "react";
import Button from "../Button";
import arrowRight from "../../images/arrowRight.svg";
import closeCardButton from "../../images/closeCardButton.svg";
import "./shoppingCard.css";

export default function ShoppingCard(props) {
  const { cardData, setIsOpenModal, priceDecor, handleSubmit } = props;

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
        <ul className="shopping-card__input-list">{props.children}</ul>

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
