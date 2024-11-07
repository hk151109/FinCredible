// MasterContainer.js
import React, { useState, useEffect } from 'react';
import { getCurrentStocks } from '../services/ApiServices';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import "./PortfolioPage.css";
import StockMarketContainer from './StockMarketContainer';
import PortfolioContainer from "./PortfolioContainer";
import { fetchedData } from '../components/stockMarketComponents/fetchedData';
import SideBar from '../components/sharedComponents/SideBar';
import Navbar from '../components/Navbar';

import AuthPage from "./Login"; 
import ForgetPwPage from "./ForgetPw"; 
import ResetPwPage from "./ResetPw";
import HomePage from "./Home";
import Accounts from "./Accounts";
import PreHome from './PreHome';
import AboutUs from './AboutUsPage';
import PrePersonalFinancePage from './PrePersonalFinancePage';
import NewsPage from './NewsPage';
import TrackerPage from './TrackerPage';
import PersonalFinancePage from './PersonalFinancePage';
import MFcalculatorPage from './personalfinancecomponents/MFcalculatorPage';
import FDcalculatorPage from './personalfinancecomponents/FDcalculatorPage';
import SIPcalculatorPage from './personalfinancecomponents/SIPCalculatorPage';
import PortfolioPage from './PortfolioPage';
import MLPredictionPage from './MLPredictionPage';
import SuggestionPage from './SuggestionPage';
import RestrictedPage from './RestrictedPage'; // Import the Restricted page
import PrivateRoute from '../components/PrivateRoute'; // PrivateRoute component
import "react-toastify/dist/ReactToastify.css";
import AnalyticsPage from './AnalyticsPage';

import RecommendPage from './RecommendPage';

const MasterContainer = () => {
    const [apiData, setApiData] = useState(fetchedData);
    const [historicalPrices, setHistoricalPrices] = useState(null);

    useEffect(() => {
        getCurrentStocks()
            .then(data => setApiData(data));
    }, []);

    const handleHistPrices = (histPricesObject) => {
        setHistoricalPrices(histPricesObject);
    };

    return (
        // <div className="page-wrapper">
            <Router>
                
                <div className="content-frame">
                    <div className="sidebar-content-container">
                        <div className="main">
                            <Routes>
                                <Route exact path='/portfolio' element={<PortfolioContainer apiData={apiData} />} />
                                <Route path='/stockmarket' element={<StockMarketContainer stocks={apiData} handleHistPrices={handleHistPrices} />} />
                                <Route path='/analytics' element={<StockMarketContainer stocks={apiData} handleHistPrices={handleHistPrices} />} />
                                
                                {/* Public Routes */}
                                <Route path="/" element={<PreHome />} />
                                <Route path="/about-us" element={<AboutUs />} />
                                <Route path="/pre-personal-finance" element={<PrePersonalFinancePage />} />
                                <Route path="/fd-calculator" element={<FDcalculatorPage />} />
                                <Route path="/mf-calculator" element={<MFcalculatorPage />} />
                                <Route path="/sip-calculator" element={<SIPcalculatorPage />} />

                                
                                {/* Authentication Routes */}
                                <Route path="/login" element={<AuthPage />} />
                                <Route path="/ForgetPw" element={<ForgetPwPage />} />
                                <Route path="/ResetPw/:token" element={<ResetPwPage />} />

                                {/* Protected Routes */}
                                <Route path="/home" element={<HomePage />} />
                                <Route path="/accounts" element={<Accounts />} />
                                <Route path="/tracker" element={<TrackerPage />} />
                                <Route path="/news" element={<NewsPage />} />
                                <Route path="/personal-finance" element={<PersonalFinancePage />} />
                                <Route path='/portfolio' element={<PortfolioPage />} />
                                <Route path='/MLPredictionPage' element={<MLPredictionPage />} />
                                <Route path='/recommend' element={<RecommendPage />} />


                                {/* Restricted Route */}
                                <Route path="/restricted" element={<RestrictedPage />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </Router>
        // </div>
    );
}

export default MasterContainer;
