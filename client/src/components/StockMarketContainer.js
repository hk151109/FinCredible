import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StockMarketList from './stockMarketComponents/StockMarketList';
import StockMarketSearch from './stockMarketComponents/StockMarketSearch';
import { Row, Col } from 'react-bootstrap';
import './StockMarketContainer.css';
import { apikey } from '../services/apikey';

const StockMarketContainer = ({ stocks, handleHistPrices, historicalPrices }) => {
  const [searchedStockSymbol, setSearchedStockSymbol] = useState(null);
  const [stockFavourites, setStockFavourites] = useState([]);
  const [stockDetails, setStockDetails] = useState(null);
  const [stockPrices, setStockPrices] = useState(null);
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    if (searchedStockSymbol) {
      const url1 = `https://financialmodelingprep.com/api/v3/profile/${searchedStockSymbol}?apikey=${apikey}`;
      fetch(url1)
        .then((data) => data.json())
        .then((data) => setStockDetails(data[0]));

      const url2 = `https://financialmodelingprep.com/api/v3/historical-price-full/${searchedStockSymbol}?timeseries=65&apikey=${apikey}`;
      fetch(url2)
        .then((data) => data.json())
        .then((data) => {
          setStockPrices(data.historical);
          historicStockPrice(data.historical);
        });
    }
  }, [searchedStockSymbol]);

  const historicStockPrice = (stockClosePrices) => {
    const hist30dayPrices = stockClosePrices.map((price) => price.close);
    handleHistPrices({
      symbol: searchedStockSymbol,
      prices: hist30dayPrices,
    });
  };

  const handleSearchedStock = (stockName) => {
    setSearchedStockSymbol(stockName);
  };

  const addToFavourites = (favourite) => {
    setStockFavourites((prevFavourites) => [favourite, ...prevFavourites]);
    navigate(`/stockmarket/${favourite.symbol}`); // Redirect to new page
  };

  return (
    <div className="stockmarket-container">
      <Row className="stockmarket-search-row">
        <Col>
          <StockMarketSearch handleSearchedStock={handleSearchedStock} />
        </Col>
      </Row>

      <Row className="stockmarket-favourites-row">
        <Col>
          {stockFavourites.map((favourite, index) => (
            <div key={index} onClick={() => addToFavourites(favourite)}>
              <h3>{favourite.companyName}</h3>
              {/* Any additional details for each favourite stock can be added here */}
            </div>
          ))}
        </Col>
      </Row>

      <Row className="stockmarket-list-row">
        <Col>
          <StockMarketList stocks={stocks} addToFavourites={addToFavourites} />
        </Col>
      </Row>
    </div>
  );
};

export default StockMarketContainer;
