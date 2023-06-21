import React, {useContext, useEffect, useState } from "react";
import {UserContext} from '../../context/UserContext'

const LoanApplicationPage = () => {
  const [interestRate, setInterestRate] = useState('');
  const [loanDuration, setLoanDuration] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [feesAndCosts, setFeesAndCosts] = useState('');
  const [interestType, setInterestType] = useState('');
  const [repaymentCapacity, setRepaymentCapacity] = useState('');
  const [repaymentOptions, setRepaymentOptions] = useState('');
  const [insuranceAndGuarantees, setInsuranceAndGuarantees] = useState('');
  const [bankOption, setBankOption] = useState('');
  const [errorMessage, setErrorMessage] = useState()

  //const {userData} = useContext(UserContext)

  const stateValues = {
    interestRate,
    loanDuration,
    loanAmount,
    feesAndCosts,
    interestType,
    repaymentCapacity,
    repaymentOptions,
    insuranceAndGuarantees,
    bankOption
  };

  const [banks, setBanks] = useState(null)

  useEffect(() => {
    fetch("/authentification/getBanks")
        .then((response) => response.json())
        .then((data) => {
          setBanks(data);
          console.log(data);
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

    emptyStates = emptyStates.filter(([unused,value]) => value === "") 
    // unusued permet de se rappeler qu'on ingore la clé. On s'intéresse uniquement aux valeurs du tableau.
    //Filtre les states : si la valeur est "" alors on garde dans la liste

    emptyStates = emptyStates.map(([stateName,unused]) => stateName)
    //Puis on map, on garde uniquement les noms des états précédemments filtrés
    //On obtient donc un tableau avec seuelemnt les états vides
    
    //S'il y a au moins un champ vide
    if(emptyStates.length !== 0){
      setErrorMessage(`Les champs suivants sont vide : ${emptyStates.join(', ')}`) //Concatène les empty states avec ", espace"
      return
    }else{
      /* fetch('/customer/newLoan', options)
      .then(response => response.json())
      .then(data => {
        console.log(data)
      }).catch(error => {s
        console.log(error)
      }) */
    }

  };


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
        <label>
          Frais et coûts :
          <input type="text" value={feesAndCosts} onChange={(e) => setFeesAndCosts(e.target.value)} />
        </label>
        <label>
          Type de taux d'intérêt :
          <select value={interestType} onChange={(e) => setInterestType(e.target.value)}>
            <option value="">Sélectionnez un type de taux</option>
            <option value="fixe">Taux fixe</option>
            <option value="variable">Taux variable</option>
          </select>
        </label>
        <label>
          Capacité de remboursement :
          <input type="number" value={repaymentCapacity} onChange={(e) => setRepaymentCapacity(e.target.value)} />
        </label>
        <label>
          Options de remboursement :
          <input type="text" value={repaymentOptions} onChange={(e) => setRepaymentOptions(e.target.value)} />
        </label>
        <label>
          Assurances et garanties :
          <input type="text" value={insuranceAndGuarantees} onChange={(e) => setInsuranceAndGuarantees(e.target.value)} />
        </label>
        <select
          value=""
          onChange={handleSelectOptionChange}
        >
          <option value="">Sélectionner une Banque</option>
          {banks &&banks.map((bank, index) => (
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
