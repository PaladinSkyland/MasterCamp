import React, { useContext, useEffect } from "react";
import ComponentLogo from "./Logo";
import { UserContext } from "../context/UserContext";

const NavBar = () => {
  const { getOnglets } = useContext(UserContext);
  useEffect(() => {
    const onglets = getOnglets();
  }, []);

  return (
    <div className="h-16 flex justify-between shadow-md">
      <ComponentLogo />
      <ul className=" ml-3 flex flex-row gap-x-1">
        <li className="my-auto">test</li>
        <li className="my-auto">test2</li>
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
