import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const HomePage = () => {
  const banque = ["Bank1", "Bank2", "Bank3", "Bank4", "Bank5", "Bank6"];
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);

  const storedToken = localStorage.getItem("token");

  useEffect(() => {
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
  });

  return (
    /* Si connecté */
    userData ? (
      <div>
        <NavBar />
        <div className="m-3">
          <h1 className="">Bienvenue {userData.Name}</h1>
          <h2>Vous etes connecté en tant que {userData.UserType}</h2>
        </div>
        <div className="w-full">
          <h1>Voici les banques disponibles :</h1>
          <div className="flex flex-row gap-x-10">
            {banque.map((onglet, index) => (
              <p className="" key={index} onClick={() => navigate("/login")}>
                {onglet}
              </p>
            ))}
          </div>
        </div>
      </div>
    ) : (
      /* Sinon */
      <div>
        <h1> Page erreur 401</h1>
      </div>
    )
  );
};

export default HomePage;
