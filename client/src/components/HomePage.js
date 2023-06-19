import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  

  const { userData, setUserData } = useContext(UserContext)
  
  const returnHome = () => {
    navigate("/", { replace: true });
  };
  const storedToken = localStorage.getItem("token");

    useEffect(() => {
      if(storedToken != null){
      fetch('/home', {
        headers: {
          'Authorization': `Bearer ${storedToken}`
        }
      }).then(response => 
        response.json()
      ).then(data => {
        setUserData(data)
      })
    }
    }, [])

    //console.log(userData)


  

  return (
    /* Si connecté */
    userData ? (
    <div>
      <h1>Bienvenue {userData.Name}, {userData.UserType} </h1>
      <button onClick={returnHome}>retour</button>
    </div> ) 
    
    : 
    /* Sinon */ 
    (<div>
      <h1> non connecté</h1>
    </div>)
  );
};

export default HomePage;
