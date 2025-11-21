import React, { useEffect } from "react";

function Alert({ message, type = "success", duration = 3000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 text-white rounded-lg shadow-lg text-sm font-medium ${colors[type]} animate-fade-in-down`}
    >
      {message}
    </div>
  );
}

export default Alert;
