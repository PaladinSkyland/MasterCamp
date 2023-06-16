import React, { useContext, useEffect } from "react";
import ComponentLogo from "./Logo";
import { UserContext } from "../context/UserContext";

const NavBar = () => {

  const {getOnglets} = useContext(UserContext)

  const onglets = getOnglets()
  
  
  return (
    <div className="h-16 flex justify-between shadow-md">
      <ComponentLogo />
      <ul className=" ml-3 flex flex-row gap-x-1">
        {onglets.map((onglet, index) => (
          <li className="my-auto" key={index}>{onglet}</li>
        ))}
        <img
          className="h-12 w-13 flex-none my-auto"
          src="profile.png"
          alt="profile image"
        />
      </ul>
    </div>
  );
};

export default NavBar;
