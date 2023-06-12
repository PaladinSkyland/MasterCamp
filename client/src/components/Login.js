import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";


const Login = () => {
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
      <h1>Page d'accueil</h1>
      <Link to="/contact">Aller à la page de contact</Link>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username : </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
