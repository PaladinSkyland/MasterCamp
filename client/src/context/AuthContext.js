import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()

  const logout = () => {
    navigate("/")
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ setIsLoggedIn, isLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};