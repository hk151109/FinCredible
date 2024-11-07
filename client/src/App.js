import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from "./pages/Login"; 
import ForgetPwPage from "./pages/ForgetPw"; 
import ResetPwPage from "./pages/ResetPw";
import HomePage from "./pages/Home";
import Accounts from "./pages/Accounts";
import PreHome from './pages/PreHome';
import AboutUs from './pages/AboutUsPage';
import PrePersonalFinancePage from './pages/PrePersonalFinancePage';
import NewsPage from './pages/NewsPage';
import TrackerPage from './pages/TrackerPage';
import PersonalFinancePage from './pages/PersonalFinancePage';
import MFcalculatorPage from './pages/personalfinancecomponents/MFcalculatorPage';
import FDcalculatorPage from './pages/personalfinancecomponents/FDcalculatorPage';
import SIPcalculatorPage from './pages/personalfinancecomponents/SIPCalculatorPage';
import PortfolioPage from './pages/PortfolioPage';
import MLPredictionPage from './pages/MLPredictionPage';
import SuggestionPage from './pages/SuggestionPage';
import RestrictedPage from './pages/RestrictedPage'; // Import the Restricted page
import PrivateRoute from './components/PrivateRoute'; // PrivateRoute component
import "react-toastify/dist/ReactToastify.css";
import AnalyticsPage from './pages/AnalyticsPage';

function App() {
  return (
    <>
      <PortfolioPage />
    </>
  );
}

export default App;
