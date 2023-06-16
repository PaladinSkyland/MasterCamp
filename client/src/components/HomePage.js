import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  

  const { userData, setUserData } = useContext(UserContext)
  
  const returnHome = () => {
    navigate("/", { replace: true });
  };
  const storedToken = localStorage.getItem("token");

  fetch('/home', {
    headers: {
      'Authorization': `Bearer ${storedToken}`
    }
  }).then(response => 
    response.json()
  ).then(data => {
    setUserData(data)
  })

  return (
    <div>
      <h1>Bienvenue {userData.Name}, {userData.UserType} </h1>
      <button onClick={returnHome}>retour</button>
    </div>
  );
};

export default HomePage;
