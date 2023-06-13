import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    console.log(userData)
    setIsLoggedIn(true);
    setUser(userData)

  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null)
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};