import React, { useContext, useEffect } from "react";
import ComponentLogo from "./Logo";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { getOnglets } = useContext(UserContext);

  const onglets = getOnglets();
  const navigate = useNavigate();

  return (
    <div className="h-16 flex justify-between shadow-md">
      <ComponentLogo />
      <ul className=" ml-3 flex flex-row gap-x-3 items-center">
        {onglets.map((onglet, index) => (
          <li
            className="hover:bg-sky-100 p-2 rounded-md"
            key={index}
            onClick={() => navigate("/login")}
          >
            {onglet}
          </li>
        ))}
        <img
          className="h-12 w-13 flex-none my-auto hover:bg-sky-100 rounded-full"
          src="profile.png"
          alt="profile image"
          onClick={() => navigate("/account")}
        />
      </ul>
    </div>
  );
};

export default NavBar;
