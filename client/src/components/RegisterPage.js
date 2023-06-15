import React, {useState} from 'react'


const RegisterPage = () => {
  //const navigate = useNavigate()
 
  const [username, setUsername] = useState('');
  const [userfirstname, setUserfirstname] = useState('');
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [radiobutton, setRadiobutton] = useState('');
  const [employeebankrep, setemployeebankrep] = useState(null);
  const [selectedbankOption, setSelectedbankOption] = useState('');
 
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

  const handleSelectOptionChange = (event) => {
    setSelectedbankOption(event.target.value);
  };

  const handleRadiobuttonChange = (event) => {
    console.log(event.target.value);
    if ((event.target.value === "employee")&&(employeebankrep === null)) {
      fetch("/getBanks")
      .then(response => response.json())
      .then(data => {
        // Gérer la réponse du serveur ici
          setemployeebankrep(data);
          console.log(data);
      })
      .catch(error => {
        // Gérer les erreurs ici
        console.error(error);
      });
};

    setRadiobutton(event.target.value);
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    
    if (radiobutton !== "employee") {
      fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // Récupérez les valeurs du formulaire pour les envoyer au serveur
          username: username,
          userfirstname: userfirstname,
          email: email,
          password: password,
        })
      })
        .then(response => response.json())
        .then(data => {
  
          // Gérer la réponse du serveur ici
          console.log(data);
        })
        .catch(error => {
          
          // Gérer les erreurs ici
          console.error(error);
        });
    }
    else if (radiobutton === "employee") {

    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // Récupérez les valeurs du formulaire pour les envoyer au serveur
        username: username,
        userfirstname: userfirstname,
        email: email,
        password: password,
        type: "employee",
        bankref: selectedbankOption
      })
    })
      .then(response => response.json())
      .then(data => {

        // Gérer la réponse du serveur ici
        console.log(data);
      })
      .catch(error => {
        
        // Gérer les erreurs ici
        console.error(error);
      });
    }
  };
  
  return (
    <div>
      <h1>Page de sign in</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="radio">
          <label>
            <input type="radio" name="role" value="client" onChange={handleRadiobuttonChange} defaultChecked />
            Client
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" name="role" value="employee" onChange={handleRadiobuttonChange} />
            Employé
          </label>
        </div>        


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

      {radiobutton === "employee" && employeebankrep && (
        <div>
          <h2>Réponse du serveur :</h2>
          <select value={selectedbankOption} onChange={handleSelectOptionChange}>
            <option value="">Sélectionner une option</option>
            {employeebankrep.map((bank, index) => (
              <option key={index} value={bank.Name}>{bank.Name}</option>
            ))}
          </select>
        </div>
      )}
    </form>

    </div>
    
  );
};

export default RegisterPage;