import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = Boolean(localStorage.getItem("user"));

  // Log authentication status for debugging
  console.log("PrivateRoute - isAuthenticated:", isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
