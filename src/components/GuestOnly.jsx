// src/components/GuestOnly.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function GuestOnly({ children }) {
  const token = localStorage.getItem("auth_token");
  if (token) {
    // jika sudah login, redirect ke dashboard
    return <Navigate to="/" replace />;
  }
  return children;
}
