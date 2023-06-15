import React, {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../authentification/AuthContext';
import {login, setHttpOnlyCookie}  from '../authentification/login'
import bcrypt from 'bcryptjs';


const LoginPage = () => {

  const { setIsLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate()
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }; 

  const handleLogin =  (e) => {

    //Permet d'éviter le comportement de base du formulaire
    e.preventDefault();

    //Cryptage du mdp
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const encryptedPassword = bcrypt.hashSync(password, salt);

    // Vérification de l'utilisateur
    login(email, password).then(data => {

      for (let key in data){
        if (data[key] === "Identifiants invalides"){
          alert("identifiants invalides") 
          return
        }
      }

      let token = data.token

      //On stocke le token en local, mais aussi dans un cookie HTTP only
      localStorage.setItem('token', token);
      setHttpOnlyCookie('token', token, new Date(Date.now() + (3600 * 1000))); // expiration dans 1 heure (en millisecondes)

      //On met le contexte login à true, et on se déplace sur la page voulue
      setIsLoggedIn(true)
      navigate('/contact')
      
    })
  };

  const HandleLogout = () => {
    logout()
  }
  
  return (
    <div>
      <h1>Page d'accueil</h1>
      <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="email">email : </label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={handleEmailChange}
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
    <button onClick={HandleLogout}>logout</button>
    </div>
    
  );
};

export default LoginPage;