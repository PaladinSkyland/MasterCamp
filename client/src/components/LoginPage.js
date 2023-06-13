import React, {useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../authentification/AuthContext';
import {login, setHttpOnlyCookie}  from '../authentification/login'

const LoginPage = () => {

  const { setIsLoggedIn, isLoggedIn, logout } = useContext(AuthContext);
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

    // Vérification de l'utilisateur
    login(username, password).then(result => {
      let token = result
      localStorage.setItem('token', token);
      setHttpOnlyCookie('token', token, new Date(Date.now() + (3600 * 1000))); // expiration dans 1 heure (en millisecondes)
      setIsLoggedIn(true)
    })
    
    e.preventDefault();
  };

  const logoutt = () => {
    logout()
  }

  const testfunction = () => {

      console.log('function de test')
      console.log(isLoggedIn)
      if(isLoggedIn){
        navigate('/contact')
      }else{
        console.log('vtf')  
      }
      

  }
  
  return (
    <div>
      <h1>Page d'accueil</h1>
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
    <button onClick={testfunction}>Test</button>
    <button onClick={logoutt}>logout</button>
    </div>
    
  );
};

export default LoginPage;