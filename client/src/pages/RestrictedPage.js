// src/pages/RestrictedPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RestrictedPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Access Denied</h2>
      <p>You must be logged in to access this page.</p>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate('/login')} style={{ margin: '10px' }}>
          Login
        </button>
        <button onClick={() => navigate('/register')} style={{ margin: '10px' }}>
          Register
        </button>
        <button onClick={() => navigate('/')} style={{ margin: '10px' }}>
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default RestrictedPage;
