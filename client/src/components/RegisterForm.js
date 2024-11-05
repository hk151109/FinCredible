import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== retypePassword) {
      setError('Passwords do not match. Please try again.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        name,
        username,
        email,
        password,
      });

      if (response.status === 201) {
        navigate('/'); // Redirect to pre-logged-in home page upon successful registration
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', err.response?.data || err.message);
    }
  };

  const handleGoogleRegister = () => {
    // Redirect to the backend route for Google OAuth
    window.location.href = 'http://localhost:5000/api/users/auth/google';
  };

  return (
    <div className="login-form-container">
      <h2>Register</h2>
      <p>Create a new account</p>
      {error && <p className="login-error">{error}</p>}
      <form className="login-form" onSubmit={handleRegister}>
        <div className="login-input-group">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="login-input-group">
          <input
            type="password"
            placeholder="Retype Password"
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Register</button>
      </form>
      <div className="login-or">or</div>
      <button onClick={handleGoogleRegister} className="google-login-button">
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
        Register with Google
      </button>
    </div>
  );
};

export default RegisterForm;
