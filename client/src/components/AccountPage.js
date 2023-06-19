import NavBar from "./NavBar";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const { userData, setUserData } = useContext(UserContext);

  return userData ? (
    <div>
      <NavBar />
      <h3>My Account</h3>
      <form>
        {Object.keys(userData).map(
          (key, index) =>
            key !== "ID_user" && (
              <div key={index}>
                <label htmlFor={key}>{key + ": "}</label>
                <input type="text" id={key} name={key} value={userData[key]} />
              </div>
            )
        )}
      </form>
    </div>
  ) : (
    /* Sinon */
    <div>
      <h1> non connecté</h1>
    </div>
  );
};

export default AccountPage;
