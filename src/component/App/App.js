import React, { useState, useEffect } from "react";
import getData from "../../services/dataService";
import Card from "../Card";
import { textDecorName } from "../../helpers";
import "./app.css";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  const productList = data.map(({ category, name, price }) => {
    return (
      <Card
        category={category}
        productName={textDecorName(name)}
        price={price}
      />
    );
  });
  return <div className="content-wrapper">
    <div className="card-list"> {productList}</div>
   </div>;
}

export default App;
