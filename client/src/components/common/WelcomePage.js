import React from "react";
import { useNavigate } from "react-router-dom";

import ComponentLogo from "../Logo";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="md:flex h-screen overflow-y-hidden justify-center">
      <div className="flex flex-row gap-x-4 absolute top-4 left-4">
        <ComponentLogo />
      </div>
      <div className="justify-center flex flex-col h-full items-center">
        <div className="flex justify-center">
          <div className="flex flex-col rounded-md shadow-md p-20 items-center gap-10">
            <h1 className="text-6xl font-mono">
              Bienvenue sur Credit Expresss
            </h1>
            <button
              className="btn-primary"
              onClick={() => navigate("/authentification/login")}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
