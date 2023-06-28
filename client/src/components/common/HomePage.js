import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import NavBar from "../NavBar";
import ErrorPage from "./ErrorPage";

const HomePage = () => {
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
  }, []);

  return (
    /* Si connecté */
    userData ? (
      <div>
        <NavBar />
        <div className="m-3">
          <h1 className="text-4xl text-blue-500">Bienvenue {userData.Name}</h1>
          <h2>Vous êtes connecté en tant que {userData.UserType}</h2>
        </div>
      </div>
    ) : (
      null
    )
  );
};

export default HomePage;
