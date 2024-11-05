import React, { useState, useEffect } from 'react';
import { getCurrentStocks } from '../services/ApiServices';
import './StockMarketPage.css'; // Make sure this CSS file is created
import NavBar from '../components/Navbar';
import StockMarketContainer from '../components/StockMarketContainer';
import { fetchedData } from '../components/stockMarketComponents/fetchedData';
import SideBar from '../components/sharedComponents/SideBar';

const StockMarketPage = () => {
  const [apiData, setApiData] = useState(fetchedData);
  const [historicalPrices, setHistoricalPrices] = useState(null);

  useEffect(() => {
    getCurrentStocks()
      .then((data) => setApiData(data))
      .catch((err) => console.error('Error fetching stock data', err));
  }, []);

  const handleHistPrices = (histPricesObject) => {
    setHistoricalPrices(histPricesObject);
  };

  return (
    <div className="main-container">
      <div className="page-frame">
        <NavBar />
        <div className="smcontent-section">
          <div className="sidebar-wrapper">
            <div className="sidebar-section">
              <SideBar />
            </div>
          </div>
          <div className="stockmarket-wrapper">
            <div className="stockmarket-section">
              <StockMarketContainer stocks={apiData} handleHistPrices={handleHistPrices} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockMarketPage;
