import React from "react";
import { createPortal } from "react-dom";
import "./modal.css";

export default function Modal(props) {
  if (props.isOpenModal) {
    return createPortal(
      <div
        className="modal"
        onClick={() => {
          props.setIsOpenModal(false);
        }}
      >
        {props.children}
      </div>,
      document.getElementById("modal-root")
    );
  }
  return null;
}
