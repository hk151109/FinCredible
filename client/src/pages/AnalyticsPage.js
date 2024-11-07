import React, { useEffect, useState } from "react";
import { fetchMarketData, fetchSectorPerformance, fetchCommodityData, fetchBigStocksData } from "../services/api";
import NiftySensexGraph from "../components/NiftySensexGraph";
import CommoditiesGraph from "../components/CommoditiesGraph";
import BigStocksList from "../components/BigStocksList";

const AnalyticsPage = () => {
  const [niftyData, setNiftyData] = useState(null);
  const [sensexData, setSensexData] = useState(null);
  const [commoditiesData, setCommoditiesData] = useState({});
  const [bigStocks, setBigStocks] = useState([]);

  useEffect(() => {
    const loadMarketData = async () => {
      try {
        const nifty = await fetchMarketData("TIME_SERIES_DAILY", "NIFTY");
        const sensex = await fetchMarketData("TIME_SERIES_DAILY", "SENSEX");
        const gold = await fetchCommodityData("GOLD");
        const oil = await fetchCommodityData("OIL");
        const stocks = await fetchBigStocksData(["AAPL", "GOOGL", "AMZN", "MSFT"]);

        setNiftyData(nifty["Time Series (Daily)"]);
        setSensexData(sensex["Time Series (Daily)"]);
        setCommoditiesData({ gold: gold["Time Series (Daily)"], oil: oil["Time Series (Daily)"] });
        setBigStocks(stocks);
      } catch (error) {
        console.error("Error loading market data:", error);
      }
    };

    loadMarketData();
  }, []);

  return (
    <div>
      <h1>Analytics Dashboard</h1>
      <div>
        <h2>NIFTY & SENSEX</h2>
        {niftyData && <NiftySensexGraph data={niftyData} />}
        {sensexData && <NiftySensexGraph data={sensexData} />}
      </div>
      <div>
        <h2>Commodities</h2>
        {commoditiesData.gold && <CommoditiesGraph data={commoditiesData.gold} title="Gold" />}
        {commoditiesData.oil && <CommoditiesGraph data={commoditiesData.oil} title="Oil" />}
      </div>
      <div>
        <BigStocksList stocks={bigStocks} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
