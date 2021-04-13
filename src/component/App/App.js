import React, { useState, useEffect } from "react";
import getData from "../../services/dataService";
import Card from "../Card";
import Modal from "../Modal";
import Button from "../Button";
import { textDecorName } from "../../helpers";
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
  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  const productList = data.map(({ category, name, price }) => {
    return (
      <Card
        key={name}
        category={category}
        productName={textDecorName(name)}
        price={price}
        setIsOpenModal={setIsOpenModal}
        setSelectCard={setSelectCard}
      />
    );
  });

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
      />
    </div>
  );
}

export default App;
