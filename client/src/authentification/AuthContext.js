import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);


  const logout = () => {
    setIsLoggedIn(false);
    setUser(null)
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, setIsLoggedIn, isLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};