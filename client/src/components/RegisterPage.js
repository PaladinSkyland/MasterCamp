import React, { useState } from "react";
import { Link } from "react-router-dom";
import ComponentLogo from "./Logo.js";

const RegisterPage = () => {
  //const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [userfirstname, setUserfirstname] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [radiobutton, setRadiobutton] = useState("");
  const [employeebankrep, setemployeebankrep] = useState(null);
  const [selectedbankOption, setSelectedbankOption] = useState("");

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
    if (event.target.value === "employee" && employeebankrep === null) {
      fetch("/getBanks")
        .then((response) => response.json())
        .then((data) => {
          // Gérer la réponse du serveur ici
          setemployeebankrep(data);
          console.log(data);
        })
        .catch((error) => {
          // Gérer les erreurs ici
          console.error(error);
        });
    }

    setRadiobutton(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (radiobutton !== "employee") {
      fetch("/register", {
        method: "POST",
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
    } else if (radiobutton === "employee") {
      fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Récupérez les valeurs du formulaire pour les envoyer au serveur
          username: username,
          userfirstname: userfirstname,
          email: email,
          password: password,
          type: "employee",
          bankref: selectedbankOption,
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
    }
  };
  return (
    <div className="md:flex h-screen overflow-y-hidden">
      <div className="flex flex-row gap-x-4 absolute top-4 right-4">
        <ComponentLogo />
      </div>
      <div className="md:w-1/2 justify-center flex flex-col h-full">
        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col rounded-md shadow-md p-4"
          >
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="client"
                  onChange={handleRadiobuttonChange}
                  defaultChecked
                  className="mr-2"
                />
                Client
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="employee"
                  onChange={handleRadiobuttonChange}
                  className="mr-2"
                />
                Employé
              </label>
            </div>
            <div>
              <label htmlFor="username">LastName : </label>
              <input
                type="text"
                className="block rounded-md border-0 py-0.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-800 sm:text-sm sm:leading-6"
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
                className="block rounded-md border-0 py-0.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-800 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <label htmlFor="email">Email : </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="block rounded-md border-0 py-0.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-800 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <label htmlFor="password">Password : </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="block rounded-md border-0 py-0.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset focus:ring-blue-800 sm:text-sm sm:leading-6"
              />
            </div>
            {radiobutton === "employee" && employeebankrep && (
              <div className="">
                <select
                  value={selectedbankOption}
                  onChange={handleSelectOptionChange}
                  className="block my-3 rounded-md border-0 py-0.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-800 sm:text-sm sm:leading-6"
                >
                  <option value="">Sélectionner une option</option>
                  {employeebankrep.map((bank, index) => (
                    <option key={index} value={bank.Name}>
                      {bank.Name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="flex flex-col">
              <Link to="/login" className="text-blue-400">
                Connected to credit express
              </Link>
              <button
                className="bg-gradient-to-r from-cyan-300 via-blue-500 to-violet-300 rounded-full text-white px-4 py-2 hover:text-black my-3 w-1/8"
                type="submit"
              >
                Sing In
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

export default RegisterPage;
