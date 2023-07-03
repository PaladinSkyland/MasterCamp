import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const storedToken = localStorage.getItem("token")

  const [userData, setUserData] = useState("")

  useEffect(()=> {
    if (storedToken != null) {
      fetch("/home", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        });
    }    
  }, [])

  const getOnglets = () => {

    
    
    const type = userData.UserType;

    switch (type) {
      case "customer":
        return [["Demande de prêt","loanApplication"], ["Mes demandes","myLoans"], ["Mes fichiers", "fileUpload"]];                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
      case "employee":
        return [["Demandes","loanApplications"], ["Suivi demandes","myLoans"]];
      case "admin":
        return [["Validation employés", "employee"], ["Validation banques", "bank"]]
    }
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, getOnglets }}>
      {children}
    </UserContext.Provider>
  );
};
