import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/userContext"; 

const RedirectIfLoggedIn = ({ children }) => {
  const { user } = useUser();  

  return user ? <Navigate to="/dashboard" /> : children;
};

export default RedirectIfLoggedIn;
