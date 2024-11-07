import React from 'react';
import Navbar from '../components/Navbar'; // Ensure you have a PreNavbar component
import RecommendStock from '../components/RecommendStock';
import './RecommendPage.css'; // CSS file for the RecommendPage

export default function RecommendPage() {
  return (
    <div className="recommend-main-container">
      <div className="recommend-page-frame">
        <Navbar />
        <div className="recommend-content-section">
          <div className="recommend-wrapper">
            <div className="recommend-form-section">
              <RecommendStock />
              <h6>Disclaimer: FinCredible's ML model can make mistakes. Do your own research on the recommended stocks before investing.</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

