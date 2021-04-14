import React, { useState, useEffect } from "react";
import getData from "../../services/dataService";
import Card from "../Card";
import Modal from "../Modal";
import Button from "../Button";
import ShoppingCard from "../ShoppingCard";
import { textDecorName } from "../../helpers/textDecor";
import {
  arrayHandleReviewName,
  arrayHandleReviewNumber,
} from "../../helpers/checkValidation";
import priceDecor from "../../images/priceDecor.svg";
import "./app.css";

const defaultFormInValid = {
  nameError: null,
  numberError: null,
};
const defaultUserData = {
  name: "",
  number: "",
};

function App() {
  const [data, setData] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [selectCard, setSelectCard] = useState({
    category: "Fruits",
    productName: "Orange Juice",
    price: 22,
  });
  const [userData, setUserData] = useState(defaultUserData);

  const [formInValid, setFormValid] = useState(defaultFormInValid);
  const { name, number } = userData;
  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  const handleCardClick = (card) => {
    setSelectCard(card);
    setIsOpenModal(true);
  };

  const resetState = () => {
    setIsOpenModal(false);
    setUserData(defaultUserData);
    setFormValid(defaultFormInValid);
  };
  const handleSubmit = () => {
    let hasError = false;
    handleReviewName();
    handleReviewNumber();
    for (const field in formInValid) {
      if (formInValid[field]) {
        hasError = true;
      }
    }
    if (!hasError) {
      console.log(name, number);
    }
    resetState();
  };
  const handleReviewName = () => {
    let error = "";
    arrayHandleReviewName.forEach((func) => {
      if (func(name)) {
        error = func(name);
      }
    });
    setFormValid((prevState) => {
      return { ...prevState, nameError: error };
    });
  };
  const handleReviewNumber = () => {
    let error = "";
    arrayHandleReviewNumber.forEach((func) => {
      if (func(number)) {
        error = func(number);
      }
    });
    setFormValid((prevState) => {
      return { ...prevState, numberError: error };
    });
  };

  const chooseCheapProduct = () => {
    let cheapProduct = {};
    let cheapPrice = 0;
    data.forEach(({ category, name, price }) => {
      if (price >= cheapPrice) {
        cheapProduct = { category, productName: name, price };
      }
    });
    setSelectCard(cheapProduct);
    setIsOpenModal(true);
  };

  const productList = data.map(({ category, name, price }) => {
    return (
      <Card
        key={name}
        category={category}
        productName={textDecorName(name)}
        price={price}
        onClick={handleCardClick}
      />
    );
  });
  return (
    <div className="content-wrapper">
      <div className="card-list"> {productList}</div>
      <Button
        buttonStyle="button_middle"
        buttonValue="Buy cheapest"
        handleChange={chooseCheapProduct}
      />

      <Modal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        setUserData={setUserData}
        userData={userData}
        cardData={selectCard}
        formInValid={formInValid}
        handleReviewName={handleReviewName}
        handleReviewNumber={handleReviewNumber}
        handleSubmit={handleSubmit}
      >
        <ShoppingCard
          cardData={selectCard}
          setIsOpenModal={setIsOpenModal}
          priceDecor={priceDecor}
          setUserData={setUserData}
          userData={userData}
          formInValid={formInValid}
          handleReviewName={handleReviewName}
          handleReviewNumber={handleReviewNumber}
          handleSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
}

export default App;
