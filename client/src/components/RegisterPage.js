import React, { useState } from "react";

const RegisterPage = () => {
  //const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [userfirstname, setUserfirstname] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleUserfirstnameChange = (event) => {
    setUserfirstname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setemail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Récupérez les valeurs du formulaire pour les envoyer au serveur
        username: username,
        userfirstname: userfirstname,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Gérer la réponse du serveur ici
        console.log(data);
      })
      .catch((error) => {
        // Gérer les erreurs ici
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Page de sign in</h1>

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
          <label htmlFor="userfirstname">FirstName : </label>
          <input
            type="text"
            id="userfirstname"
            value={userfirstname}
            onChange={handleUserfirstnameChange}
          />
        </div>
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
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default RegisterPage;
