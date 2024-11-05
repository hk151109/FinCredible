import React from 'react';
import PreNavbar from '../components/PreNavbar'; // Import the new PreNavbar component
import AboutUs from '../components/AboutUs'; // Import LoginForm component
import './Style.css';

export default function LoginPage() {
  return (
    <div className="login-main-container">
      <div className="login-page-frame">
        <PreNavbar />
        {/* Centered Login Form Section */}
        <div className="login-content-section">
          <div className="login-wrapper">
            <div className="login-form-section">
              <AboutUs />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
