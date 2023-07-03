import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import NavBar from "../NavBar";

const LoanApplicationPage = () => {
  //Toutes les infos nécessaires pour un prêt + message d'erreur
  const [interestRate, setInterestRate] = useState("");
  const [loanDuration, setLoanDuration] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  //const [feesAndCosts, setFeesAndCosts] = useState('');
  const [interestType, setInterestType] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [repaymentOptions, setRepaymentOptions] = useState('');
  const [description, setDescription] = useState('');
  const [bankOption, setBankOption] = useState('');
  const [errorMessage, setErrorMessage] = useState()

  //Info de l'utilisateur venant du contextUtilisateur
  const { userData } = useContext(UserContext);
  const storedToken = localStorage.getItem("token");


  //Nom de tous les states
  const stateValues = {
    interestRate,
    loanDuration,
    loanAmount,
    interestType,
    monthlyIncome,
    repaymentOptions,
  };

  //Banques valides
  const [banks, setBanks] = useState(null);



  //Chargé une seule fois au début de la page pour récupérer les banques valides
  useEffect(() => {
    fetch("/authentification/getBanks")
      .then((response) => response.json())
      .then((data) => {
        setBanks(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSelectOptionChange = (event) => {
    setBankOption(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Permet de transfomer un objet en paire clé valeur
    let emptyStates = Object.entries(stateValues);
    //Exemple :
    /* for(const [key,value] of emptyStates){
      console.log("clé",`${key}`, "valeur ", `${value}`)
    } */

    emptyStates = emptyStates.filter(([unused, value]) => value === "");
    // unusued permet de se rappeler qu'on ingore la clé. On s'intéresse uniquement aux valeurs du tableau.
    //Filtre les states : si la valeur est "" alors on garde dans la liste

    emptyStates = emptyStates.map(([stateName, unused]) => stateName);
    //Puis on map, on garde uniquement les noms des états précédemments filtrés
    //On obtient donc un tableau avec seuelemnt les états vides

    //S'il y a au moins un champ vide
    if (emptyStates.length !== 0) {
      setErrorMessage(
        `Les champs suivants sont vides : ${emptyStates.join(", ")}`
      ); //Concatène les empty states avec ", espace"
      return;
    } else {
      let options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          interestRate: interestRate,
          loanDuration: loanDuration,
          loanAmount: loanAmount,
          interestType: interestType,
          monthlyIncome: monthlyIncome,
          repaymentOptions: repaymentOptions,
          bankOption: bankOption,
          description: description,
        }),
      };
      fetch("/customer/newLoan", options)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setErrorMessage(data.error);
          }else if (data.success) {
            setErrorMessage(data.success);
            setTimeout(() => {
              window.location.href = '/customer/myLoans';
            }, 1000);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return userData ? (
    <div>
      <NavBar />
      <div className="w-full">
        <h1 className="text-blue-500 text-3xl flex items-center justify-center m-8">
          Formulaire de demande de prêt
        </h1>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="flex flex-wrap gap-2 m-4 justify-center ">
            <label className="flex flex-col justify-center items-center border-2 hover:border-blue-100 mx-4 p-4 w-80">
              <svg
                className="w-10 h-10 m-2 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                />
              </svg>
              <span className="mt-2 text-center">Taux d'intérêt maximum (%):</span>
              <input
                type="number"
                step="0.01"
                value={interestRate}  
                onChange={(e) => setInterestRate(e.target.value)}
                className="m-2"
              />
            </label>
            <label className="flex flex-col justify-center items-center border-2 hover:border-blue-100 mx-4 p-4 w-80">
              <svg
                className="w-10 h-10 m-2 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="mt-2 text-center">Durée du prêt (mois):</span>
              <input
                type="number"
                step="0.01"
                value={loanDuration}
                onChange={(e) => setLoanDuration(e.target.value)}
                className="m-2"
              />
            </label>
            <label className="flex flex-col justify-center items-center border-2 hover:border-blue-100 mx-4 p-4 w-80">
              <svg
                className="w-10 h-10 m-2 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z"
                />
              </svg>
              <span className="mt-2 text-center">Montant du prêt (€):</span>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="m-2"
              />
            </label>
            <label className="flex flex-col justify-center items-center border-2 hover:border-blue-100 mx-4 p-4 w-80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 m-2 text-blue-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                />
              </svg>
              <span className="mt-2 text-center">Type de taux d'intérêt</span>
              <select
                className="m-2"
                value={interestType}
                onChange={(e) => setInterestType(e.target.value)}
              >
                <option value="">Sélectionnez un type de taux</option>
                <option value="fixe">Taux fixe</option>
                <option value="variable">Taux variable</option>
              </select>
            </label>
            <label className="flex flex-col justify-center items-center border-2 hover:border-blue-100 mx-4 p-4 w-80">
              <svg
                className="w-10 h-10 m-2 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>
              <span className="mt-2 text-center">Revenu mensuel (€) :</span>
              <input
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                className="m-2"
              />
            </label>
            <label className="flex flex-col justify-center items-center border-2 hover:border-blue-100 mx-4 p-4 w-80">
              <svg
                className="w-10 h-10 m-2 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                />
              </svg>
              <span className="mt-2 text-center">
                Options de remboursement :
              </span>
              <input
                type="text"
                value={repaymentOptions}
                onChange={(e) => setRepaymentOptions(e.target.value)}
                className="m-2"
              />
            </label>
           {/*  <label className="flex flex-col justify-center items-center border-2 hover:border-blue-100 mx-4 p-4 w-80">
              <svg
                className="w-10 h-10 m-2 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
              <span className="mt-2 text-center">
                Assurances et garanties :
              </span>
              <input
                type="text"
                value={insuranceAndGuarantees}
                onChange={(e) => setInsuranceAndGuarantees(e.target.value)}
                className="m-2"
              />
            </label> */}
            <label className="flex flex-col justify-center items-center border-2 hover:border-blue-100 mx-4 p-4 w-80">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 m-2 text-blue-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                />
              </svg>

              <span className="mt-2 text-center">Description: </span>
              <textarea
                className="resize-none m-4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            
          </div>
          <select
              className="flex flex-col mt-4 w-1/3 m-auto"
              value={bankOption}
              onChange={handleSelectOptionChange}
            >
              <option value="">Toutes les banques</option>
              {banks &&
                banks.map((bank, index) => (
                  <option key={index} value={bank.Name}>
                    {bank.Name}
                  </option>
                ))}
            </select>
          {errorMessage !== "" && (
            <div>
              <p className="text-red-500">{errorMessage}</p>
            </div>
          )}
          <button
            className="btn-primary w-1/2 my-32"
            type="submit"
            onClick={handleSubmit}
          >
            Soumettre
          </button>
        </form>
      </div>
    </div>
  ) : (
    null
  );
};

export default LoanApplicationPage;
