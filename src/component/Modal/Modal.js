import React from "react";
import { createPortal } from "react-dom";
import ShoppingCard from "../ShoppingCard";
import "./modal.css";
import priceDecor from "../../images/priceDecor.svg";

export default function Modal({
  isOpenModal,
  setIsOpenModal,
  cardData,
  setUserData,
  userData,
  formInValid,
  handleReviewName,
  handleReviewNumber,
  handleSubmit
}) {
  if (isOpenModal) {
    return createPortal(
      <div
        className="modal"
        onClick={() => {
          setIsOpenModal(false);
        }}
      >
        <ShoppingCard
          priceDecor={priceDecor}
          cardData={cardData}
          setIsOpenModal={setIsOpenModal}
          setUserData={setUserData}
          userData={userData}
          formInValid={formInValid}
          handleReviewName={handleReviewName}
          handleReviewNumber={handleReviewNumber}
          handleSubmit={handleSubmit}
        />
      </div>,
      document.getElementById("modal-root")
    );
  }
  return null;
}
