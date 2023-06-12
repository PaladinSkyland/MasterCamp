import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
// TODO: import le logo depuis la source
import imageSrc from "./logo.png";

//TODO : un composant pour l'input
function test(props) {
  return (
    <div>
      <h1>test</h1>
    </div>
  );
}

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
      <div className="Logo">
        <img src={imageSrc} alt="ImageLogo" />
        <p>CreditExpress</p>
      </div>
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
        <Link to="/SignIn">New in Credit Express</Link>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
