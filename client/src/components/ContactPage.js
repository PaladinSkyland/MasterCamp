import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const ContactPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const returnHome = () => {
    console.log("home");
    navigate("/", { replace: true });
  };

  return (
    <div>
      <h1>Page de contact {user.name}</h1>
      <button onClick={returnHome}>retour</button>
      {/* Contenu de la page de contact */}
    </div>
  );
};

export default ContactPage;
