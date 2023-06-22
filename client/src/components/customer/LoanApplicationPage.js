import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../../context/UserContext'

const LoanApplicationPage = () => {

  //Toutes les infos nécessaires pour un prêt + message d'erreur
  const [interestRate, setInterestRate] = useState('');
  const [loanDuration, setLoanDuration] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  //const [feesAndCosts, setFeesAndCosts] = useState('');
  const [interestType, setInterestType] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [repaymentOptions, setRepaymentOptions] = useState('');
  const [insuranceAndGuarantees, setInsuranceAndGuarantees] = useState('');
  const [description, setDescription] = useState('');
  const [bankOption, setBankOption] = useState('');
  const [errorMessage, setErrorMessage] = useState()

  //Info de l'utilisateur venant du contextUtilisateur
  const { userData } = useContext(UserContext)

  //Nom de tous les states
  const stateValues = {
    interestRate,
    loanDuration,
    loanAmount,
    //feesAndCosts,
    interestType,
    monthlyIncome,
    repaymentOptions,
    insuranceAndGuarantees,
    bankOption
  };

  //Banques valides
  const [banks, setBanks] = useState(null)

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
  }, [])

  const handleSelectOptionChange = (event) => {
    setBankOption(event.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    //Permet de transfomer un objet en paire clé valeur
    let emptyStates = Object.entries(stateValues)
    //Exemple : 
    /* for(const [key,value] of emptyStates){
      console.log("clé",`${key}`, "valeur ", `${value}`)
    } */

    emptyStates = emptyStates.filter(([unused, value]) => value === "")
    // unusued permet de se rappeler qu'on ingore la clé. On s'intéresse uniquement aux valeurs du tableau.
    //Filtre les states : si la valeur est "" alors on garde dans la liste

    emptyStates = emptyStates.map(([stateName, unused]) => stateName)
    //Puis on map, on garde uniquement les noms des états précédemments filtrés
    //On obtient donc un tableau avec seuelemnt les états vides

    //S'il y a au moins un champ vide
    if (emptyStates.length !== 0) {
      setErrorMessage(`Les champs suivants sont vides : ${emptyStates.join(', ')}`) //Concatène les empty states avec ", espace"
      return
    } else {
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          interestRate: interestRate,
          loanDuration: loanDuration,
          loanAmount: loanAmount,
          //feesAndCosts: feesAndCosts,
          interestType: interestType,
          monthlyIncome: monthlyIncome,
          repaymentOptions: repaymentOptions,
          insuranceAndGuarantees: insuranceAndGuarantees,
          description: description,
          //bankOption: bankOption,
          ID_user: userData.ID_user
        })
      }
      fetch('/customer/newLoan', options)
      .then(response => response.json())
      .then(data => {
        console.log(data)
      }).catch(error => {
    
        console.log(error)
      })
    }
    
  }

  return (
    <div>
      <h1>Formulaire de demande de prêt</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Taux d'intérêt :
          <input type="number" step="0.01" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
        </label>
        <label>
          Durée du prêt :
          <input type="number" value={loanDuration} onChange={(e) => setLoanDuration(e.target.value)} />
        </label>
        <label>
          Montant du prêt :
          <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
        </label>
        {/* <label>
          Frais et coûts :
          <input type="text" value={feesAndCosts} onChange={(e) => setFeesAndCosts(e.target.value)} />
        </label> */}
        <label>
          Type de taux d'intérêt :
          <select value={interestType} onChange={(e) => setInterestType(e.target.value)}>
            <option value="">Sélectionnez un type de taux</option>
            <option value="fixe">Taux fixe</option>
            <option value="variable">Taux variable</option>
          </select>
        </label>
        <label>
          Revenu mensuel
          <input type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(e.target.value)} />
        </label>
        <label>
          Options de remboursement :
          <input type="text" value={repaymentOptions} onChange={(e) => setRepaymentOptions(e.target.value)} />
        </label>
        <label>
          Assurances et garanties :
          <input type="text" value={insuranceAndGuarantees} onChange={(e) => setInsuranceAndGuarantees(e.target.value)} />
        </label>
        <label>
        Description :
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
        <select
          value={bankOption}
          onChange={handleSelectOptionChange}
        >
          <option value="s">Sélectionner une Banque</option>
          {banks && banks.map((bank, index) => (
            <option key={index} value={bank.Name}>
              {bank.Name}
            </option>
          ))}
        </select>
        <button type="submit" onClick={handleSubmit}>Soumettre</button>
      </form>
      {errorMessage !== "" && (
        <div>
          <p className="text-red-500">{errorMessage}</p>
        </div>
      )}
    </div>
  );
};


export default LoanApplicationPage;
