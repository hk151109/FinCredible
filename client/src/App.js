import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthPage from "./pages/Login"; 
import ForgetPwPage from "./pages/ForgetPw"; 
import ResetPwPage from "./pages/ResetPw";
import HomePage from "./pages/Home";
import Accounts from "./pages/Accounts";
import PreHome from './pages/PreHome';
import AboutUs from './pages/AboutUsPage';
import SuggestionPage from './pages/SuggestionPage';
import PrePersonalFinancePage from './pages/PrePersonalFinancePage';
import NewsPage from './pages/NewsPage';
import TrackerPage from './pages/TrackerPage';
import PersonalFinancePage from './pages/PersonalFinancePage';
import MFcalculatorPage from './pages/personalfinancecomponents/MFcalculatorPage';
import FDcalculatorPage from './pages/personalfinancecomponents/FDcalculatorPage';
import SIPcalculatorPage from './pages/personalfinancecomponents/SIPCalculatorPage';
import MLPredictionPage from './pages/MLPredictionPage';
import RestrictedPage from './pages/RestrictedPage'; // Import the Restricted page
import PrivateRoute from './components/PrivateRoute'; // PrivateRoute component
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Routes>
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
        <Route path="/suggestions" element={<PrivateRoute element={<SuggestionPage />} />} />
        <Route path="/ml-prediction" element={<PrivateRoute element={<MLPredictionPage />} />} />

        {/* Restricted Route */}
        <Route path="/restricted" element={<RestrictedPage />} />
      </Routes>
    </Router>
  );
}

export default App;
