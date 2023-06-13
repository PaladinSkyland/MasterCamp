import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const LoginPage = () => {
  const { isLoggedIn, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (e) => {
    console.log(isLoggedIn);
    e.preventDefault();

    if (username === "lucas" && password === "test") {
      console.log("reussi");
      login({ name: username, password: password });
      navigate("/contact", { replace: true });
    } else {
      console.log("fail");
    }
  };

  return (
    <div>
      <div className="flex gap-x-4">
        <img
          className="h-12 w-13 flex-none rounded-full bg-gray-50"
          src="logo.png"
          alt="logo credit express"
        />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            Credit Express
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} class="block p-3">
        <div class="m-3">
          <label htmlFor="username">Username : </label>
          <input
            type="text"
            id="username"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={username}
            placeholder="Votre nom"
            onChange={handleUsernameChange}
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
        <Link to="/signin">New in Credit Express</Link>
        <button
          class="bg-gradient-to-r
           from-blue-100 via-blue-500
            to-violet-300 rounded-full
           text-white 
           px-4 py-2

           hover:text-black"
          type="submit"
        >
          Login
        </button>
      </form>
      <div></div>
    </div>
  );
};

export default LoginPage;
