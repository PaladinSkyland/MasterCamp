import React from "react";
import { useNavigate } from "react-router-dom";



const ComponentLogoNavBar = (props) => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-row gap-x-4" onClick={() => navigate("/home")}>
        <img
            className="h-10 w-13 flex-none my-auto"
            src="../logo.png"
            alt="logo credit express"
        />
        <p className="text-lm font-semibold leading-6 text-gray-900 my-auto">
            Credit Express
        </p>
        </div>
  );
};

export default ComponentLogoNavBar;
