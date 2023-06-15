import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../authentification/AuthContext";
import { login, setHttpOnlyCookie } from "../authentification/login";
import bcrypt from "bcryptjs";

//TODO : Credit expresse en gros
//TODO : image mettre en grand sur le pourcentage
//TODO : rencentrer credit express

const LoginPage = () => {
  const { setIsLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (e) => {
    //Permet d'éviter le comportement de base du formulaire
    e.preventDefault();

    //Cryptage du mdp
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const encryptedPassword = bcrypt.hashSync(password, salt);

    // Vérification de l'utilisateur
    login(email, password).then((data) => {
      for (let key in data) {
        if (data[key] === "Identifiants invalides") {
          alert("identifiants invalides");
          return;
        }
      }

      let token = data.token;

      //On stocke le token en local, mais aussi dans un cookie HTTP only
      localStorage.setItem("token", token);
      setHttpOnlyCookie("token", token, new Date(Date.now() + 3600 * 1000)); // expiration dans 1 heure (en millisecondes)

      //On met le contexte login à true, et on se déplace sur la page voulue
      setIsLoggedIn(true);
      navigate("/contact");
    });
  };

  return (
    <div class="md:flex flex-row">
      <div class="basis-2/5">
        <div class="flex gap-x-4">
          <img
            className="h-10 w-auto flex-none rounded-full bg-gray-50"
            src="logo.png"
            alt="logo credit express"
          />
          <p className="text-sm font-semibold leading-6 text-gray-900 my-auto">
            Credit Express
          </p>
        </div>
        <div>
          
        </div>
        <form onSubmit={handleLogin} class="block p-3 my-auto">
          <div class="m-3">
            <label htmlFor="email">Email : </label>
            <input
              type="text"
              id="email"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-800 sm:text-sm sm:leading-6"
              value={email}
              placeholder="Votre nom"
              onChange={handleEmailChange}
            />
          </div>
          <div class="m-3">
            <label htmlFor="password">Password : </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Votre mot de passe"
              class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div class="flex flex-col">
            <Link to="/signin" class="text-blue-400">
              New in Credit Express
            </Link>
            <button
              class="bg-gradient-to-r from-cyan-300 via-blue-500 to-violet-300 rounded-full text-white px-4 py-2 hover:text-black my-3"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <div class="basis-2/3">
        <img class="" src="wallpaper.png" alt="wallpaper" />
      </div>
    </div>
  );
};

export default LoginPage;
