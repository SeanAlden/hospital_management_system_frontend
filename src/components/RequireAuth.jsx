// src/components/RequireAuth.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function RequireAuth({ children }) {
  const token = localStorage.getItem("auth_token");
  if (token) {
    // set default header so nested requests work (optional)
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return children;
  }
  return <Navigate to="/login" replace />;
}
