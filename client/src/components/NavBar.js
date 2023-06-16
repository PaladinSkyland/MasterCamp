import React from "react";
import ComponentLogo from "./Logo"; 

const NavBar = () => {
    return (
      <div className="flex">
        <ComponentLogo />
        <ul className=" ml-3">
          <li>test</li>
          <li>test2</li>
        </ul>
      </div>
    );
  };

export default NavBar