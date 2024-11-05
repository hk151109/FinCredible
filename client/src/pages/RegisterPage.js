import React from 'react';
import PreNavbar from '../components/PreNavbar'; // Import the new PreNavbar component
import RegisterForm from '../components/RegisterForm'; // Import RegisterForm component
import './Style.css';

export default function LoginPage() {
  // Inline styles as a JavaScript object
  const loginWrapperStyle = {
    width: '50%',
    height: '40%',
    display: 'flex',
    justifyContent: 'center',
  };

  return (
    <div className="login-main-container">
      <div className="login-page-frame">
        <PreNavbar />
        {/* Centered Login Form Section */}
        <div className="login-content-section">
          <div className="login-wrapper" style={loginWrapperStyle}>
            <div className="login-form-section">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
