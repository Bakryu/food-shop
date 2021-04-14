import React from "react";
import Button from "../Button";
import priceDecor from "../../images/priceDecor.svg";
import "./card.css";

export default function Card({ category, productName, price, onClick }) {
  return (
    <div className="card_style">
      <span className="card__category">{category}</span>
      <span className="card__name">{productName}</span>
      <div className="card__price-section">
        <div>
          <img
            className="card__price-currency"
            src={priceDecor}
            alt="currency"
          />
          <span className="card__price">{price}</span>
        </div>

        <Button
          buttonStyle={"button_small"}
          buttonValue={"Buy"}
          handleChange={() => {
            onClick({ category, productName, price });
          }}
        />
      </div>
    </div>
  );
}
