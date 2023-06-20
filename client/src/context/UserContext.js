import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState("");

  const getOnglets = () => {
    const type = userData.UserType;

    switch (type) {
      case "customer":
        return [["Demande de prêt","loanApplication"], ["Mes demandes","myLoans"]];
      case "employee":
        return [["Demandes","loanApplications"], ["Suivi demandes","myLoans"]];
      case "admin":
        return [["Validation employés", "employee"], "Validation banques", "bank"]
    }
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, getOnglets }}>
      {children}
    </UserContext.Provider>
  );
};
