import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState("");

  const getOnglets = () => {
    const type = userData.UserType;

    switch (type) {
      case "customer":
        return ["Demande de prêt", "Mes demandes"];
      case "employee":
        return ["Demandes", "Suivi demandes"];
    }
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, getOnglets }}>
      {children}
    </UserContext.Provider>
  );
};
