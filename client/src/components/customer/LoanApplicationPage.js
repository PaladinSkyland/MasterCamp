import React, {useState } from "react";
import { useNavigate } from "react-router-dom";

const LoanApplicationPage = () => {
  const navigate = useNavigate();
  const [interestRate, setInterestRate] = useState('');
  const [loanDuration, setLoanDuration] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [feesAndCosts, setFeesAndCosts] = useState('');
  const [interestType, setInterestType] = useState('');
  const [repaymentCapacity, setRepaymentCapacity] = useState('');
  const [repaymentOptions, setRepaymentOptions] = useState('');
  const [insuranceAndGuarantees, setInsuranceAndGuarantees] = useState('');
  const [flexibility, setFlexibility] = useState('');
  const [lenderReputation, setLenderReputation] = useState('');
  

  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Effectuer des actions supplémentaires avec les valeurs des champs
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
        <label>
          Flexibilité :
          <input type="text" value={flexibility} onChange={(e) => setFlexibility(e.target.value)} />
        </label>
        <label>
          Réputation du prêteur :
          <input type="text" value={lenderReputation} onChange={(e) => setLenderReputation(e.target.value)} />
        </label>
        <button type="submit">Soumettre</button>
      </form>
    </div>
  );
};

export default LoanApplicationPage;
