import React from "react";
import Button from "../Button";
import arrowRight from "../../images/arrowRight.svg";
import priceDecor from "../../images/priceDecor.svg";
import "./card.css";

export default function Card() {
  return (
    <div className="card_style">
      <span className="card__category">Drinks</span>
      <span className="card__name">Orange Juice</span>
      <div className="card__price-section">
        <div>
          <img
            className="card__price-currency"
            src={priceDecor}
            alt="currency"
          />
          <span className="card__price">14.99</span>
        </div>

        <Button
          buttonStyle={"button_small"}
          buttonValue={"Order"}
          buttonDecorPath={arrowRight}
        />
      </div>
    </div>
  );
}
