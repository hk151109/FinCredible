
import React, { useEffect, useState } from "react";
import { deleteShares, getHeldShares, postNewShareAdd } from "../services/PortfolioServices";
import PortfolioSharesList from "../components/portfolioComponents/PortfolioSharesList";
import ChartHoldingsByCompany from "../components/sharedComponents/ChartHoldingsByCompany";
import ColumnChartPortfolioPerformance from "../components/sharedComponents/ColumnChartPortfolioPerformance";
import './PortfolioContainer.css'
import SideBar from '../components/sharedComponents/SideBar';
import Navbar from '../components/Navbar';

const PortfolioContainer = ({apiData}) => {

    const [heldShares, setHeldShares] = useState([]);
    const [sharesWithPrice, setSharesWithPrice] = useState([]);
    const [portfolioTotals, setPortfolioTotals] = useState({})

    useEffect(() => {
        getHeldShares()
        .then(shares => setHeldShares(shares))
    }, [])

    useEffect(() => {
        const portfolioCurrentPrices =
            heldShares.map((company) => {
            return (
                {
                ...company,
                currentPrice: apiData.filter(stock => stock.symbol === company.symbol)
                                .map((stock) => {
                                        return stock.price
                                    })[0]
                }
            )
            })        
        setSharesWithPrice(portfolioCurrentPrices)
    }, [heldShares, apiData])

    useEffect(() => {
        const portfolioTotalPaid = Number(
            sharesWithPrice
            .map(holding => holding.avgPurchasePrice * holding.numberOfShares)
            .reduce((previous, current) => {return (previous + current)}, 0)
            .toFixed(2)
        )

        const portfolioTotalValue = Number(
            sharesWithPrice
            .map(holding => holding.currentPrice * holding.numberOfShares)
            .reduce((previous, current) => {return (previous + current)}, 0)
            .toFixed(2)
        )
        
        const newPortfolioTotals = {
            paid: portfolioTotalPaid,
            value: portfolioTotalValue
        }
        setPortfolioTotals(newPortfolioTotals)        
    }, [sharesWithPrice])

    //REMOVE ALL SHARES IN A PARTICULAR COMPANY
    const removeHeldSharesInCompany = (id) => {
        const temp = heldShares.map(shares => shares);
        const indexToDelete = temp.map(shares => shares._id).indexOf(id);
        temp.splice(indexToDelete, 1);
        setHeldShares(temp);
    }

    //REMOVE SOME SHARES IN A PARTICULAR COMPANY

    const removeSomeSharesInCompany = (id, updatedShareNumber) => {
        const updatedHeldSharesIndex = heldShares.findIndex(heldShare => heldShare._id === id)
        const updatedHeldShares = [...heldShares]
        updatedHeldShares[updatedHeldSharesIndex].numberOfShares = updatedShareNumber
        setHeldShares(updatedHeldShares)
    }

    //ADD A SHARE IN A STOCK WE DO NOT HAVE IN OUR PORTFOLIO
    const addNewShares = (newShares) => {
        postNewShareAdd(newShares)
        .then(savedNewShares => setHeldShares([...heldShares, savedNewShares]))
    }

    //ADD MORE SHARES TO CURRENT HOLDING IN PARTICULAR STOCK

    const addSomeSharesInCompany = (id, numShares, avgPrice ) => {
        const updatedHeldSharesIndex = heldShares.findIndex(heldShare => heldShare._id === id)
        const updatedHeldShares = [...heldShares]
        updatedHeldShares[updatedHeldSharesIndex].numberOfShares = numShares
        updatedHeldShares[updatedHeldSharesIndex].avgPurchasePrice = avgPrice
        setHeldShares(updatedHeldShares)

    }

    return (
        <div className="app-container">
            <div className="page-wrapper">
                <div className="top-navbar">
                    <Navbar />
                </div>
                <div className="content-wrapper">
                    <aside className="sidebar">
                        <SideBar />
                    </aside>
                    <main className="main-content">
                        <PortfolioSharesList 
                            heldShares={sharesWithPrice} 
                            removeHeldSharesInCompany={removeHeldSharesInCompany} 
                            removeSomeSharesInCompany={removeSomeSharesInCompany} 
                            addSomeSharesInCompany={addSomeSharesInCompany} 
                        />
                        <ChartHoldingsByCompany sharesData={sharesWithPrice} />
                        <ColumnChartPortfolioPerformance 
                            portfolioData={sharesWithPrice} 
                            portfolioTotals={portfolioTotals} 
                        />
                    </main>
                </div>
            </div>
        </div>
    );
}
 
export default PortfolioContainer;
