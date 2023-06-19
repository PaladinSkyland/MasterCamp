import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import NavBar from "./NavBar";

const HomePage = () => {

  const { userData, setUserData } = useContext(UserContext);

  const storedToken = localStorage.getItem("token");

  useEffect(() => {
    fetch('/home', {
      headers: {
        'Authorization': `Bearer ${storedToken}`
      }
    }).then(response =>
      response.json()).then(data => {
      console.log(data)
      localStorage.setItem('token',data.newToken)
      setUserData(data)
    })  
  }, [])

  return (
    /* Si connecté */
    userData ? (
      <div>
        <NavBar />
        <div>
          <h1>
            Bienvenue {userData.Name}, {userData.UserType}{" "}
          </h1>
        </div>
      </div>
    ) : (
      /* Sinon */
      <div>
        <h1> non connecté</h1>
      </div>
    )
  );
};

export default HomePage;
