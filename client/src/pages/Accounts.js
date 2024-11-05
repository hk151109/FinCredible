import React from 'react';
import Navbar from '../components/Navbar'; // Import the new PreNavbar component
import LoginForm from '../pages/AccountsComp'; // Import LoginForm component
import './Style.css';

export default function LoginPage() {
  return (
    <div className="login-main-container">
      <div className="login-page-frame">
        <Navbar />
        {/* Centered Login Form Section */}
        <div className="login-content-section">
          <div className="login-wrapper">
            <div className="login-form-section">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
