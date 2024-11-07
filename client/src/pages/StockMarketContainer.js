// StockMarketContainer.js
import React, { useState, useEffect } from 'react';
import StockMarketList from '../components/stockMarketComponents/StockMarketList';
import StockMarketSearch from '../components/stockMarketComponents/StockMarketSearch';
import StockItemDetails from '../components/stockMarketComponents/StockItemDetails';
import FavouriteStock from '../components/stockMarketComponents/FavouriteStock';
import { Row, Col } from 'react-bootstrap';
import './StockMarketContainer.css';
import { apikey } from '../services/apikey';
import { fetchedStockDetails, fetchedStockPrices } from '../components/stockMarketComponents/fetchedData';

// If you have a Navbar and Sidebar component, import them
import Navbar from '../components/Navbar';
import SideBar from '../components/sharedComponents/SideBar';

const StockMarketContainer = ({ stocks, handleHistPrices, historicalPrices }) => {
  const [searchedStockSymbol, setSearchedStockSymbol] = useState(null);
  const [stockFavourites, setStockFavourites] = useState([]);
  const [stockDetails, setStockDetails] = useState(null);
  const [stockPrices, setStockPrices] = useState(null);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedStockSymbol]);

  const historicStockPrice = (stockClosePrices) => {
    const hist30dayPrices = [];
    if (stockClosePrices && stockClosePrices.length > 0) {
      stockClosePrices.forEach((stockPrice) => {
        hist30dayPrices.push(stockPrice.close);
      });
    }
    handleHistPrices({
      symbol: searchedStockSymbol,
      prices: hist30dayPrices,
    });
  };

  const handleSearchedStock = (stockName) => {
    setSearchedStockSymbol(stockName);
  };

  const addToFavourites = (favourite) => {
    setStockFavourites([favourite, ...stockFavourites]);
  };

  const displayFavourites = stockFavourites.map((favourite, index) => (
    <FavouriteStock
      favourite={favourite}
      key={index}
      stockPrices={stockPrices}
    />
  ));

  return (
    <div className="app-container">
      <div className="page-wrapper">
        <div className="top-navbar">
          {/* Include your Navbar component or content here */}
          {/* If you have a Navbar component: */}
          <Navbar />
        </div>
        <div className="content-wrapper">
          <div className="main-content">
            {/* Main content starts here */}
            <div className="stockmarket-container">
              <Row>
                <Col>
                  <StockMarketSearch
                    stocks={stocks}
                    handleSearchedStock={handleSearchedStock}
                  />
                </Col>
              </Row>
              <Row>
                {searchedStockSymbol && stockDetails && stockPrices ? (
                  <Col>
                    <StockItemDetails
                      symbol={searchedStockSymbol}
                      handleHistPrices={handleHistPrices}
                      historicalPrices={historicalPrices}
                      addToFavourites={addToFavourites}
                      stockPrices={stockPrices}
                      stockDetails={stockDetails}
                    />
                  </Col>
                ) : null}
              </Row>
              {displayFavourites}
              <Row>
                <Col>
                  <StockMarketList stocks={stocks} />
                </Col>
              </Row>
            </div>
            {/* Main content ends here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockMarketContainer;
