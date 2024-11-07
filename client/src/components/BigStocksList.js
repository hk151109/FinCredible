import React from "react";

const BigStocksList = ({ stocks }) => {
  return (
    <div>
      <h3>Big Stocks List</h3>
      <ul>
        {stocks.map(stock => (
          <li key={stock["Global Quote"]["01. symbol"]}>
            {stock["Global Quote"]["01. symbol"]}: ${stock["Global Quote"]["05. price"]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BigStocksList;
