// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/login',
        { username, password },
        { withCredentials: true } // Allows cookies to be sent and received
      );

      if (response.status === 200) {
        const { token } = response.data;
        login(token);
        navigate('/home');
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Invalid credentials. Please check your username and password.');
      } else {
        setError('Login failed. Please try again later.');
      }
      console.error('Login error:', err.response?.data || err.message);
    }
  };

  // Redirects the user to Google authentication
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/users/auth/google';
  };

  return (
    <div className="login-form-container">
      <h2>Welcome to Fincredible</h2>
      <p>Log in to your account</p>
      {error && <p className="login-error">{error}</p>}
      <form className="login-form" onSubmit={handleLogin}>
        <div className="login-input-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="login-input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="login-button" type="submit">Log in</button>
      </form>
      <p>or</p>
      <button className="google-login-button" onClick={handleGoogleLogin}>
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
        Log in with Google
      </button>
    </div>
  );
};

export default LoginForm;
