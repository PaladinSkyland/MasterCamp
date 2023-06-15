import React, { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({ children }) => {

    const [userData, setUserData] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
    };

    return (
    <UserContext.Provider value={{ userData, setUserData, setIsLoggedIn, isLoggedIn, logout}}>
      {children}
    </UserContext.Provider>
    )
}