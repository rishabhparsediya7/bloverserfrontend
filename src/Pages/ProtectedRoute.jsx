import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  let location = useLocation();
  const { uuid, email, verified } = localStorage;
  if (location.pathname === "/update-password" && uuid && email && verified)
    return children;
  if (!localStorage.getItem("access_token")) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  if (!localStorage.getItem("uuid")) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
