// import axios from "axios";

// const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
// const BASE_URL = "https://www.alphavantage.co/query";

// export const fetchMarketData = async (functionType, symbol) => {
//   const url = `${BASE_URL}?function=${functionType}&symbol=${symbol}&apikey=${API_KEY}`;
//   try {
//     const response = await axios.get(url);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching market data (${functionType}):`, error);
//     throw error;
//   }
// };

// export const fetchSectorPerformance = async () => {
//   const url = `${BASE_URL}?function=SECTOR&apikey=${API_KEY}`;
//   try {
//     const response = await axios.get(url);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching sector performance data:", error);
//     throw error;
//   }
// };

// export const fetchCommodityData = async (symbol) => {
//   const url = `${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;
//   try {
//     const response = await axios.get(url);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching commodity data for ${symbol}:`, error);
//     throw error;
//   }
// };

// export const fetchBigStocksData = async (symbols) => {
//   const requests = symbols.map(symbol =>
//     axios.get(`${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`)
//   );
//   try {
//     const responses = await Promise.all(requests);
//     return responses.map(response => response.data);
//   } catch (error) {
//     console.error("Error fetching big stocks data:", error);
//     throw error;
//   }
// };
