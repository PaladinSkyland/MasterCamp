import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import NavBar from "../NavBar";
import { FooterComponent, FeatureComponent} from "./WelcomePage";

const HomePage = () => {
  const { userData } = useContext(UserContext);


  return (
    /* Si connecté */
    userData ? (
      <div>
        <NavBar />
        <div className="min-h-screens">
      <div
        className="flex-grow flex items-center justify-center bg-cover bg-center h-1/2"
        style={{ backgroundImage: "url('../wallpaper.png')" }}
      >
        <div className="flex flex-col items-center gap-3 rounded-md shadow-md bg-white m-20 p-10">
          <h1 className="text-6xl font-mono text-center text-black">
            Bienvenue
          </h1>
          <h1 className="text-6xl font-mono text-center text-black">
            {userData.LastName}
          </h1>
          <button
            className="btn-primary"
            onClick={() => console.log("Get Started")}
          >
            Get Started
          </button>
        </div>
      </div>
      <FeatureComponent />
      <FooterComponent />
      </div>
      </div>
    ) : (
      null
    )
  );
};

export default HomePage;
