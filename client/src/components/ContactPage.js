import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <Link to="/">Faire une demandes</Link>
      <Link to="/contact">Mes demandes</Link>
      <Avatar img="https://www.w3schools.com/howto/img_avatar.png" />
    </div>
  );
};

const Avatar = (props) => {
  return (
    <div className="Avatar" class="bg-sky-500 hover:bg-sky-700">
      <img src={props.img} alt="avatar" />;
    </div>
  );
};

const ContactPage = () => {
  return (
    <div>
      <NavBar />
      {/* Contenu de la page de contact */}
    </div>
  );
};

export default ContactPage;
