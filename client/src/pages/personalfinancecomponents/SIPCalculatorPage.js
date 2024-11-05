import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component for internal navigation
import Navbar from '../../components/Navbar'; // Import Navbar component
import '../PersonalFinance.css'; // Import Personal Finance styles
import SIPCalculator from './SIPCalculator';

export default function PersonalFinance() {
  return (
    <div className="main-container">
      <div className="page-frame">
        <Navbar />
        <div  className="calccontent">
        <SIPCalculator />
        </div>

          
      </div>
    </div>
  );
}
