import React, {useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import bcrypt from 'bcryptjs';



const Login = () => {

  const { isLoggedIn, login, logout } = useContext(AuthContext);
  const navigate = useNavigate()
 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (e) => {
    console.log(isLoggedIn)
    e.preventDefault();

    //encryption on submit
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const encryptedPassword = bcrypt.hashSync(password, salt);

    //test, to remove/modify later
    console.log(password)
    console.log(encryptedPassword)

    const test = bcrypt.compareSync(password, encryptedPassword)

    if (test) {
      console.log("success")
      login({name: username, password: encryptedPassword})
      navigate('/contact', {replace: true})
    }
    else {
      console.log("failure")
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