import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import NavBar from "../NavBar";

const HomePage = () => {
  const { userData } = useContext(UserContext);


  return (
    /* Si connecté */
    userData ? (
      <div>
        <NavBar />
        <div className="m-3">
          <h1 className="text-4xl text-blue-500">
            Bienvenue {userData.LastName}
          </h1>
          <h2>Vous êtes connecté en tant que {userData.UserType}</h2>
        </div>
      </div>
    ) : (
      null
    )
  );
};

export default HomePage;
