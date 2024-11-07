// page.js
import React from 'react'; 
import Navbar from '../components/Navbar'; // Import the Navbar component
import PredictionChart from '../components/PredictionChart'; // Import PredictionChart component
import './MLPredictionPage.css'; // Ensure this imports the correct CSS file

export default function PredictionPage() {
  return (
    <div className="prediction-main-container">
      <div className="prediction-page-frame">
        <Navbar />
        {/* Centered Prediction Chart Section */}
        <div className="prediction-content-section">
          <div className="prediction-wrapper">
            <div className="prediction-form-section">
              <PredictionChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
