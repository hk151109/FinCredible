import React, { useEffect, useState } from "react";
import { deleteShares, getHeldShares, postNewShareAdd } from "../services/PortfolioServices";
import PortfolioSharesList from "./portfolioComponents/PortfolioSharesList";
import ChartHoldingsByCompany from "./sharedComponents/ChartHoldingsByCompany";
import ColumnChartPortfolioPerformance from "./sharedComponents/ColumnChartPortfolioPerformance";
import './PortfolioContainer.css';

const PortfolioContainer = ({ apiData }) => {

  const [heldShares, setHeldShares] = useState([]);
  const [sharesWithPrice, setSharesWithPrice] = useState([]);
  const [portfolioTotals, setPortfolioTotals] = useState({});

  // Fetch initial held shares
  useEffect(() => {
    getHeldShares()
      .then(shares => {
        setHeldShares(Array.isArray(shares) ? shares : []); // Ensure `shares` is an array
      })
      .catch(error => {
        console.error("Error fetching held shares:", error);
        setHeldShares([]); // Set to empty array on error
      });
  }, []);

  // Update shares with current prices from `apiData`
  useEffect(() => {
    if (Array.isArray(heldShares) && Array.isArray(apiData)) {
      const portfolioCurrentPrices = heldShares.map(company => {
        const matchingStock = apiData.find(stock => stock.symbol === company.symbol);
        return {
          ...company,
          currentPrice: matchingStock ? matchingStock.price : 0 // Default price if not found
        };
      });
      setSharesWithPrice(portfolioCurrentPrices);
    }
  }, [heldShares, apiData]);

  // Calculate portfolio totals (paid and value)
  useEffect(() => {
    const portfolioTotalPaid = sharesWithPrice.reduce((total, holding) => {
      return total + (holding.avgPurchasePrice * holding.numberOfShares || 0);
    }, 0).toFixed(2);

    const portfolioTotalValue = sharesWithPrice.reduce((total, holding) => {
      return total + (holding.currentPrice * holding.numberOfShares || 0);
    }, 0).toFixed(2);

    setPortfolioTotals({
      paid: Number(portfolioTotalPaid),
      value: Number(portfolioTotalValue)
    });
  }, [sharesWithPrice]);

  // Remove all shares in a particular company
  const removeHeldSharesInCompany = (id) => {
    setHeldShares(prevShares => prevShares.filter(shares => shares._id !== id));
  };

  // Remove some shares in a particular company
  const removeSomeSharesInCompany = (id, updatedShareNumber) => {
    setHeldShares(prevShares => {
      const updatedShares = [...prevShares];
      const index = updatedShares.findIndex(heldShare => heldShare._id === id);
      if (index !== -1) {
        updatedShares[index].numberOfShares = updatedShareNumber;
      }
      return updatedShares;
    });
  };

  // Add a new stock to portfolio
  const addNewShares = (newShares) => {
    postNewShareAdd(newShares)
      .then(savedNewShares => {
        setHeldShares(prevShares => [...prevShares, savedNewShares]);
      })
      .catch(error => {
        console.error("Error adding new shares:", error);
      });
  };

  // Add more shares to current holding in particular stock
  const addSomeSharesInCompany = (id, numShares, avgPrice) => {
    setHeldShares(prevShares => {
      const updatedShares = [...prevShares];
      const index = updatedShares.findIndex(heldShare => heldShare._id === id);
      if (index !== -1) {
        updatedShares[index].numberOfShares = numShares;
        updatedShares[index].avgPurchasePrice = avgPrice;
      }
      return updatedShares;
    });
  };

  return (
    <div className="portfoliocontainer">
      <PortfolioSharesList
        heldShares={sharesWithPrice}
        removeHeldSharesInCompany={removeHeldSharesInCompany}
        removeSomeSharesInCompany={removeSomeSharesInCompany}
        addSomeSharesInCompany={addSomeSharesInCompany}
      />
      <ChartHoldingsByCompany sharesData={sharesWithPrice} />
      <ColumnChartPortfolioPerformance portfolioData={sharesWithPrice} portfolioTotals={portfolioTotals} />
    </div>
  );
};

export default PortfolioContainer;
