import React, {useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../authentification/AuthContext';
import {login}  from '../authentification/login'

const LoginPage = () => {

  //const { isLoggedIn, login, logout } = useContext(AuthContext);
  const navigate = useNavigate()
 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit =  (e) => {

    var token
    login(username, password).then(result => {
      token = result
    })

    console.log('le token,',token)
    

      /* fetch('/protected', {
        headers: {Authorization: `Bearer ${token}`}
      }) */
    
    e.preventDefault();
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

export default LoginPage;