import React, { useState } from "react";
import axios from "axios";
import md5 from "md5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import "./AuthPage.css"; // Updated to plain CSS

function AuthPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [signin, setSignin] = useState(false);

  const notifyError = (message) => {
    toast.error(message);
  };

  const ToggleSign = (event) => {
    event.preventDefault();
    setSignin(!signin);
    setFormData({ username: "", email: "", password: "" });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Requesting: http://localhost:8080/api/${signin ? "register" : "login"}`);

    if (signin && !formData.username.trim()) {
      notifyError("Username cannot be empty");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      notifyError("Enter a valid email address");
      return;
    }

    if (formData.password.length < 8) {
      notifyError("Password must be at least 8 characters long");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/${!signin ? "login" : "register"}`,
        formData
      );
      const { user } = response.data;
      delete user.password;
      user.profilePicture = `https://www.gravatar.com/avatar/${md5(user.email)}?d=identicon`;

      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/home";
    } catch (error) {
      console.error("Authentication error:", error);
      notifyError(error.response?.data.message || "An error occurred");
    }
  };

  const handleGoogleLogin = (event) => {
    event.preventDefault();
    window.location.href = "http://localhost:8080/auth/google";
  };

  return (
    <div className="login-form-container">
      <ToastContainer />
      <div>
        <h2>{signin ? "Welcome to Fincredible - Sign Up" : "Welcome to Fincredible - Log In"}</h2>
        <form onSubmit={handleSubmit} className="login-form">
          {signin && (
            <div className="login-input-group">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Username"
                required
              />
            </div>
          )}
          <div className="login-input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="login-input-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="login-button">
            {signin ? "Sign Up" : "Log In"}
          </button>
        </form>
        <button className="google-login-button" onClick={handleGoogleLogin}>
          <FcGoogle /> {signin ? "Sign up with Google" : "Log in with Google"}
        </button>
        <button className="login-toggle-button" onClick={ToggleSign}>
          {signin ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}

export default AuthPage;
