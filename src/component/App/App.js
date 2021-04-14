import React, { useState, useEffect } from "react";
import getData from "../../services/dataService";
import Card from "../Card";
import Modal from "../Modal";
import Button from "../Button";
import ShoppingCard from "../ShoppingCard";
import Input from "../Input";
import Spinner from "../Spinner";
import { textDecorName } from "../../helpers/textDecor";
import {
  arrayHandleReviewName,
  arrayHandleReviewNumber,
} from "../../helpers/checkValidation";
import priceDecor from "../../images/priceDecor.svg";
import errorImage from "../../images/errorImage.svg";
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
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectCard, setSelectCard] = useState({
    category: "Fruits",
    productName: "Orange Juice",
    price: 22,
  });
  const [userData, setUserData] = useState(defaultUserData);
  const [formInValid, setFormValid] = useState(defaultFormInValid);

  useEffect(() => {
    getData().then((data) => {
      setData(data);
      setIsDataLoaded(true);
    });
  }, []);

  const { name, number } = userData;

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
      if (formInValid.nameError !== null) {
        console.log(name, number);
        resetState();
      }
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

  const setUserName = (target) => {
    setUserData((prevState) => {
      return {
        ...prevState,
        name: target.value.split(" ").join(""),
      };
    });
    setFormValid((prevState) => {
      return {
        ...prevState,
        nameError: null,
      };
    });
  };

  const setUserNumber = (target) => {
    setUserData((prevState) => {
      return {
        ...prevState,
        number: target.value.split(" ").join(""),
      };
    });
    setFormValid((prevState) => {
      return {
        ...prevState,
        numberError: null,
      };
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

  if (!isDataLoaded) {
    return <Spinner />;
  }

  return (
    <div className="content-wrapper">
      <div className="card-list"> {productList}</div>
      <Button
        buttonStyle="button_middle"
        buttonValue="Buy cheapest"
        handleChange={chooseCheapProduct}
      />

      <Modal isOpenModal={isOpenModal} setIsOpenModal={resetState}>
        <ShoppingCard
          cardData={selectCard}
          setIsOpenModal={resetState}
          priceDecor={priceDecor}
          handleSubmit={handleSubmit}
        >
          <Input
            error={formInValid.nameError}
            errorImage={errorImage}
            handleReview={handleReviewName}
            inputValue={name}
            setData={setUserName}
            placeholder="name"
          />
          <Input
            error={formInValid.numberError}
            errorImage={errorImage}
            handleReview={handleReviewNumber}
            inputValue={number}
            setData={setUserNumber}
            placeholder="number"
          />
        </ShoppingCard>
      </Modal>
    </div>
  );
}

export default App;
