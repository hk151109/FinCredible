import React from 'react';
import Navbar from '../components/Navbar'; // Import the new PreNavbar component
import Headlines from '../components/Headlines'; // Import Headlines component
import FinanceNews from '../components/FinanceNews';
import './PreHome.css';

export default function PreHome() {
  return (
    <div className="main-container">
      <div className="page-frame">
        <Navbar />
        {/* Centered Headlines Section */}
        <div className="hcontent-section">
          <div className="headlines-wrapper">
          <div className="finance-news-section">
              <FinanceNews />
            </div>
            <div className="headlines-section">
              <Headlines />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
