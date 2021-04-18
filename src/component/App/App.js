import React, { useState } from "react";
import useGetData from "../../hooks/useGetData";
import Card from "../Card";
import Modal from "../Modal";
import Button from "../Button";
import ShoppingCard from "../ShoppingCard";
import Input from "../Input";
import Spinner from "../Spinner";
import { formValidators } from "../../helpers/checkValidation";
import priceDecor from "../../images/priceDecor.svg";
import errorImage from "../../images/errorImage.svg";
import "./app.css";


const defaultUserData = {
  name: "",
  number: "",
};

function App() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectCard, setSelectCard] = useState({
    category: "Fruits",
    productName: "Orange Juice",
    price: 22,
  });
  const [userData, setUserData] = useState(defaultUserData);
  const [formInValid, setFormValid] = useState(defaultUserData);
  const { data, isDataLoaded } = useGetData();
  const { name, number } = userData;

  const handleCardClick = (card) => {
    setSelectCard(card);
    setIsOpenModal(true);
  };

  const resetState = () => {
    setIsOpenModal(false);
    setUserData(defaultUserData);
    setFormValid(defaultUserData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    for (const field in userData) {
      if (formInValid[field]) {
        errors[field] = formInValid[field];
      }
      if (userData[field] === "") {
        errors[field] = "This field in required";
      }
    }
    if (!Object.keys(errors).length) {
      console.log(userData);
      resetState();
      return;
    } else {
      setFormValid((prevState) => ({ ...prevState, ...errors }));
    }
  };

  const handleSetError = ({ target: { name, value } }) => {
    const checkFuncs = formValidators[name];
    for (let i = 0; i < checkFuncs.length; i++) {
      const checkResult = checkFuncs[i](value);
      if (checkResult) {
        setFormValid((prevState) => {
          return {
            ...prevState,
            [name]: checkResult,
          };
        });
        break;
      }
    }
  };

  const handleChange = ({ target: { value, name } }) => {
    setUserData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    setFormValid((prevState) => {
      return {
        ...prevState,
        [name]: null,
      };
    });
  };

  const chooseCheapProduct = () => {
    const cheapProduct = data.reduce((cheapProduct, product) => {
      if (product.price <= cheapProduct.price) {
        return product;
      }
      return cheapProduct;
    }, data[0]);
    handleCardClick(cheapProduct);
  };

  if (!isDataLoaded) {
    return <Spinner />;
  }

  return (
    <div
      className={`content-wrapper ${isOpenModal && "content-wrapper_hidden"}`}
    >
      <div className="card-list">
        {data.map(({ category, name, price }) => {
          return (
            <Card
              key={name}
              category={category}
              productName={name}
              price={price}
              onClick={handleCardClick}
            />
          );
        })}
      </div>
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
            error={formInValid.name}
            errorImage={errorImage}
            onBlur={handleSetError}
            inputValue={name}
            onChange={handleChange}
            placeholder="name"
            name="name"
          />
          <Input
            error={formInValid.number}
            errorImage={errorImage}
            onBlur={handleSetError}
            inputValue={number}
            onChange={handleChange}
            placeholder="number"
            name="number"
          />
        </ShoppingCard>
      </Modal>
    </div>
  );
}

export default App;
