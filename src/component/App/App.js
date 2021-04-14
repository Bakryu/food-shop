import React, { useState, useEffect } from "react";
import getData from "../../services/dataService";
import Card from "../Card";
import Modal from "../Modal";
import Button from "../Button";
import { textDecorName } from "../../helpers/textDecor";
import {
  arrayHandleReviewName,
  arrayHandleReviewNumber,
} from "../../helpers/handleReview";
import "./app.css";

function App() {
  const [data, setData] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [selectCard, setSelectCard] = useState({
    category: "Fruits",
    productName: "Orange Juice",
    price: 22,
  });
  const [userData, setUserData] = useState({
    name: "",
    number: "",
  });

  const [formInValid, setFormValid] = useState({
    nameError: null,
    numberError: null,
  });
  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  const { name, number } = userData;
  const handleCardClick = (card) => {
    setSelectCard(card);
    setIsOpenModal(true);
  };
  const handleSubmit = () => {
    let hasError = false;
    handleReviewName();
    handleReviewNumber();
    for (const field in formInValid) {
      // console.log(field);
      if (formInValid[field]) {
        hasError = true;
      }
    }
    if (!hasError) {
      console.log(name, number);
    }
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
      />
    </div>
  );
}

export default App;
