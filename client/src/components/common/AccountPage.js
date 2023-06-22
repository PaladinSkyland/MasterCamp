import NavBar from "../NavBar";
import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContext";

const AccountPage = () => {
  const { userData, setUserData } = useContext(UserContext);
  const {logout} = useContext(AuthContext)

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
      <button onClick={logout}>deco</button>
    </div>
  ) : (
    /* Sinon */
    <div>
      <h1> non connecté</h1>
    </div>
  );
};

export default AccountPage;
