import React, {useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {login, setHttpOnlyCookie}  from '../authentification/login'
import bcrypt from 'bcryptjs';


const LoginPage = () => {
  const { setIsLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messagealert, setmessagealert] = useState("");


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
          setmessagealert("Identifiants invalides");
          return;
        }
      }

      let token = data.token;

      //On stocke le token en local, mais aussi dans un cookie HTTP only
      localStorage.setItem("token", token);
      setHttpOnlyCookie("token", token, new Date(Date.now() + 3600 * 1000)); // expiration dans 1 heure (en millisecondes)

      //On met le contexte login à true, et on se déplace sur la page voulue
      setIsLoggedIn(true);
      navigate("/home");
    });
  };

  return (
    <div className="md:flex h-screen overflow-y-hidden">
      <div className="flex gap-x-4 absolute top-4 left-4">
        <img
          className="h-10 w-13 flex-none rounded-full bg-gray-50"
          src="logo.png"
          alt="logo credit express"
        />
        <p className="text-lm font-semibold leading-6 text-gray-900 my-auto">
          Credit Express
        </p>
      </div>
      <div className="md:w-1/2 justify-center flex flex-col h-full">
        <div className="flex justify-center">
          <form
            onSubmit={handleLogin}
            className="grid grid-cols-1 gap-4 rounded-md shadow-md p-10"
          >
            <div className="">
              <label htmlFor="email">Email : </label>
              <input
                type="text"
                id="email"
                className="block rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-800 sm:text-sm sm:leading-6"
                value={email}
                placeholder="Votre nom"
                onChange={handleEmailChange}
              />
            </div>
            <div className="">
              <label htmlFor="password">Password : </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Votre mot de passe"
                className="block rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {messagealert !== "" && (
                <div>
                  <p className="text-red-500">{messagealert}</p>
                </div>
              )}


            <div className="grid">
              <Link to="/register" className="text-blue-400">
                New in Credit Express
              </Link>
              <button
                className="bg-gradient-to-r from-cyan-300 via-blue-500 to-violet-300 rounded-full text-white px-4 py-2 hover:text-black my-3 w-1/8"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="md:w-2/3">
        <img
          className="w-full h-full object-cover"
          src="wallpaper.png"
          alt="wallpaper"
        ></img>
      </div>
    </div>
  );
};

export default LoginPage;
