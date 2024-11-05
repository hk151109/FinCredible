import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

// Importing the SVGs from the assets folder (adjust paths as necessary)
import homeIcon from '../assets/home-icon.svg';  // Home icon SVG

export default function PreNavbar() {
  const navigate = useNavigate();

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
        <li><Link to="/about-us">About Us</Link></li>
        <li><Link to="/pre-personal-finance">Personal Finance</Link></li>
        <li><Link to="/login">Join Us Now </Link></li>
      </ul>
      <div className="navbar-buttons">
        {/* Home icon */}
        <button className="icon-button" onClick={() => handleNavigation('/')}>
          <img
            src={homeIcon}  // Using the imported Home SVG file
            alt="Home"
            className="navbar-icon"
          />
        </button>
      </div>
    </nav>
  );
}
