import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

// Importing the SVGs from the assets folder
import homeIcon from '../assets/home-icon.svg';      // Home icon SVG
import accountIcon from '../assets/account-icon.svg'; // Account icon SVG

export default function Navbar() {
  const navigate = useNavigate(); // Correct hook for navigation

  // Function to handle navigation for buttons
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>FinCredible</h1>
      </div>
      <ul className="navbar-links">
        <li><Link to="/news">News</Link></li>
        <li><Link to="/tracker">Tracker</Link></li>
        <li><Link to="/personal-finance">Personal Finance</Link></li>
        <li><Link to="/portfolio">Portfolio</Link></li>
        <li><Link to="/analytics">Analytics</Link></li>
        <li><Link to="/MLPredictionPage">Stock Price Prediction</Link></li>
      </ul>
      <div className="navbar-buttons">
        {/* Home icon */}
        <button className="icon-button" onClick={() => handleNavigation('/home')}>
          <img
            src={homeIcon}  // Using the imported Home SVG file
            alt="Home"
            className="navbar-icon"
          />
        </button>
        {/* Accounts icon */}
        <button className="icon-button" onClick={() => handleNavigation('/accounts')}>
          <img
            src={accountIcon}  // Using the imported Accounts SVG file
            alt="Accounts"
            className="navbar-icon"
          />
        </button>
      </div>
    </nav>
  );
}
