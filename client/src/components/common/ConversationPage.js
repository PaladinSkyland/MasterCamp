import React, { useState, useEffect } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import NavBar from "../NavBar";



const ContractElement = ({ contractData, isEmployee, storedToken, conversationId }) => {
  const [amount, setAmount] = useState(contractData.Amount);
  const [interestRate, setInterestRate] = useState(contractData.InterestRate);
  const [duration, setDuration] = useState(contractData.Duration);
  const [interestType, setInterestType] = useState(contractData.InterestType);
  const [monthlyIncome, setMonthlyIncome] = useState(contractData.MonthlyIncome);
  const [repaymentOptions, setRepaymentOptions] = useState(contractData.RepaymentOptions);
  const [description, setDescription] = useState(contractData.Description);
  const [feesAndCosts, setFeesAndCosts] = useState(contractData.FeesAndCosts);
  const [insuranceAndGuarantees, setInsuranceAndGuarantees] = useState(contractData.InsuranceAndGuarantees);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleInterestRateChange = (e) => {
    setInterestRate(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handleInterestTypeChange = (e) => {
    setInterestType(e.target.value);
  };

  const handleMonthlyIncomeChange = (e) => {
    setMonthlyIncome(e.target.value);
  };

  const handleRepaymentOptionsChange = (e) => {
    setRepaymentOptions(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFeesAndCostsChange = (e) => {
    setFeesAndCosts(e.target.value);
  };

  const handleInsuranceAndGuaranteesChange = (e) => {
    setInsuranceAndGuarantees(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/conversation/sendcontrat/${conversationId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({Amount: amount,IntersestRate: interestRate,Duration: duration,InterestType: interestType,
          MonthlyIncome: monthlyIncome,RepaymentOptions: repaymentOptions,Description: description,FeesAndCosts: feesAndCosts,
          InsuranceAndGuarantees: insuranceAndGuarantees}),
      });

      if (response.ok) {
        console.log("Contrat mis à jour avec succès");
      } else {
        throw new Error("Erreur lors de la mise à jour du contrat");
      }
    } catch (error) {
      console.error(error);
    }
  };


  const renderContractInfo = (contractData) => {
    return (
      <div>
      <h2>Informations du contrat</h2>
      <p>ID contrat: {contractData.ID_contrat}</p>
      <p>Montant: {contractData.Amount}</p>
      <p>Taux d'intérêt: {contractData.InterestRate}%</p>
      <p>Durée: {contractData.Duration} mois</p>
      <p>Type d'intérêt: {contractData.InterestType}</p>
      <p>Revenu mensuel: {contractData.MonthlyIncome}</p>
      <p>Options de remboursement: {contractData.RepaymentOptions}</p>
      <p>Description: {contractData.Description}</p>
      <p>ID banque: {contractData.ID_bank}</p>
      <p>Frais et coûts: {contractData.FeesAndCosts}</p>
      <p>Date de création: {contractData.Creation_date}</p>
      <p>Assurances et garanties: {contractData.InsuranceAndGuarantees}</p>
      <p>Statut: {contractData.Status}</p>
    </div>
    );
  };

  const renderEditableContractInfo = () => {
    return (
      <div>
        <h2>Informations du contrat (Modifiable)</h2>
      <div className="contract-field">
      <p>Montant: {contractData.Amount}</p>
        <input type="number" value={amount} onChange={handleAmountChange} />
      </div>
      <div className="contract-field">
      <p>Taux d'intérêt: {contractData.InterestRate}%</p>
        <input type="number" value={interestRate} onChange={handleInterestRateChange} />
      </div>
      <div className="contract-field">
      <p>Durée: {contractData.Duration} mois</p>
        <input type="number" value={duration} onChange={handleDurationChange} />
      </div>
      <div className="contract-field">
      <p>Type d'intérêt: {contractData.InterestType}</p>
        <input type="text" value={interestType} onChange={handleInterestTypeChange} />
      </div>
      <div className="contract-field">
      <p>Revenu mensuel: {contractData.MonthlyIncome}</p>
        <input type="number" value={monthlyIncome} onChange={handleMonthlyIncomeChange} />
      </div>
      <div className="contract-field">
      <p>Options de remboursement: {contractData.RepaymentOptions}</p>
        <input
          type="text"
          value={repaymentOptions}
          onChange={handleRepaymentOptionsChange}
        />
      </div>
      <div className="contract-field">
        <p>Description: {contractData.Description}</p>
        <input type="text" value={description} onChange={handleDescriptionChange} />
      </div>
      <div className="contract-field">
      <p>Frais et coûts: {contractData.FeesAndCosts}</p>
        <input type="text" value={feesAndCosts} onChange={handleFeesAndCostsChange} />
      </div>
      <div className="contract-field">
      <p>Assurances et garanties: {contractData.InsuranceAndGuarantees}</p>
        <input
          type="text"
          value={insuranceAndGuarantees}
          onChange={handleInsuranceAndGuaranteesChange}
        />
      </div>
      <button onClick={handleSubmit}>Mettre à jour</button>
      </div>
    );
  };

  return isEmployee ? renderEditableContractInfo(contractData) : renderContractInfo(contractData);
}

const ChatPage = () => {
  const { conversationId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [contractData, setContractData] = useState(null);
  const storedToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const [myDocList, setMyDocList] = useState([]);
  const [myVisibleList, setMyVisibleList] = useState([]);



  const getcontract = async () => {
    try {
      const response = await fetch(
        `/conversation/getcontract/${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setContractData(data)
      } else {
        throw new Error("Error fetching messages");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleArrowClick = () => {
    navigate('/conversation/');
  };
  //const { userData } = useContext(UserContext);

  // Fonction pour envoyer un message
  const sendMessage = async () => {
    try {
      const response = await fetch(
        `/conversation/sendmessage/${conversationId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify({ message: newMessage }),
        }
      );
      if (response.ok) {
        setNewMessage("");
        fetchMessages();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour récupérer les messages
  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `/conversation/getmessage/${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        throw new Error("Error fetching messages");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMyVisibleDoc = async () => {
    try {
        const response = await fetch(`/conversation/getMyVisibleDoc/${conversationId}`, {
            method: "GET",
            headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        setMyVisibleList(data);
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
    }
  };

  const fetchMyDoc = async () => {
    try {
        const response = await fetch(`/conversation/getMyDoc/${conversationId}`, {
            method: "GET",
            headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        setMyDocList(data);
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
    }
  };

  const fetchDeleteFC = async (id) => {
    try {
        const response = await fetch(`/conversation/deleteFC/${conversationId}`, {
            method: "DELETE",
            headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ID_file: id,
            }),
        });
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
    }
  };


  const fetchCreateFC = async (id) => {
    try {
        const response = await fetch(`/conversation/createFC/${conversationId}`, {
            method: "POST",
            headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ID_file: id,
            }),
        });
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
    }
  };

  // Charger les messages au chargement initial
  useEffect(() => {
    fetchMessages();
    fetchMyDoc();
    fetchMyVisibleDoc()
    getcontract();
  }, []);

  // Rafraîchir les messages toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages();
    }, 5000);

    return () => clearInterval(interval);
  }, []);


  const setToVisible = (id, isChecked) => {
    if (isChecked) {
      fetchDeleteFC(id)
      fetchCreateFC(id)
    } else {
      fetchDeleteFC(id)

    }
  }

  const getFileLabel = (fileType) => {
    switch(fileType) {
      case 'avisImpot1':
        return "Avis d'imposition 1";
      case 'avisImpot2':
        return "Avis d'imposition 2";
      case 'justifIdentite': 
        return "Justificatif d'identité";
      case 'bulletinSalaire1':
        return "Bulletin de salaire 1";
      case 'bulletinSalaire2':
        return "Bulletin de salaire 2";
      case 'bulletinSalaire3':
        return "Bulletin de salaire 3";
      case 'releveBancaire1':
        return "Relevé de compte en banque 1";
      case 'releveBancaire2':
        return "Relevé de compte en banque 2";
      case 'releveBancaire3':
        return "relevé de compte en banque 3";
      case 'justifDomicile':
        return "Justificatif de domicile";
      case 'justifApportPersonnel':
        return "Justificatif de l'apport personnel";
      case 'compromisVente':
        return "Compromis de vente";
      case 'titreRetraite':
        return "Titre de retraite ou de pension";
      case 'attestationCAF':
        return "Attestation de la CAF";
      case 'attestationRevenusFonciers':
        return "Attestation de revenus fonciers";
      case 'justifSituationFamiliale':
        return "Justificatif de situation familiale";
      case 'contratTravail':
        return "Contrat de travail";
      case 'contratPret':
        return "Contrat de prêt";
      case 'avenantPret':
        return "Avenant de prêt";
      case 'tableauAmortissement':
        return "Tableau d'amortissement";
    }
  }

  const handleClick = async (event) => {
    //get an identifier to know which file have been clicked
    const fileType = event.target.value;
    
    //get the corresponding file on the server
    const response = await fetch(`/conversation/download/${fileType}/${conversationId}`, 
    {
      method: "GET", 
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    });
    if (response.ok) {
      //get the file name from the response headers
      const dispositionHeader = response.headers.get('Content-Disposition');
      const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const [, fileName] = fileNameRegex.exec(dispositionHeader);
  
      //create a blob from the response data
      const blob = await response.blob();
  
      //create a temporary download link
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = fileName;
  
      //trigger the download by programmatically clicking the link
      downloadLink.click();
  
      //clean up the temporary download link
      URL.revokeObjectURL(downloadLink.href);
      downloadLink.remove();
    } else {
      //handle error response
      console.error('Failed to download the file');
    }
  }

  return (
<div className="page-container flex flex-col h-screen overflow-hidden">
  <NavBar />
  <div className="flex justify-between bg-white w-full" style={{ height: "calc(100vh - 64px)" }}>
    <div className="w-2/5 bg-gray-100 p-6">
      <div className="flex items-center mb-4">
        <button className="flex items-center text-blue-500 font-bold" onClick={handleArrowClick}>
          <svg className="w-6 h-6 mr-2 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour
        </button>
      </div>
      <h2 className="text-lg font-bold mb-4">Actions</h2>
      <div className="inline-block p-2 rounded-lg bg-gray-200">
        <button className="btn-secondary mb-2">Partager des documents</button>
      </div>

      {Array.isArray(myDocList) && myDocList.length > 0 ? (
         myDocList.map((doc, index) => (
        <div key={index}>
          <p>{doc.Title}</p>
          <div>
            <input type="checkbox"
              id="myCheckbox"
              onChange={(e) => setToVisible(doc.ID_file, e.target.checked)}/>
          </div>
        </div>
      ))) : (null)
         }

      {Array.isArray(myVisibleList) && myVisibleList.length > 0 ? (
        myVisibleList.map((visible, index) => (
          <div key={index}> 
            <p>{visible.Title}</p>
              <button value={visible.File_type} onClick={handleClick}>
                {getFileLabel(visible.File_type)}
              </button>
          </div>
        ))
      ) : (null)}
      <div className="inline-block p-2 rounded-lg bg-gray-200">
        <button className="btn-secondary">Remplir un formulaire</button>
      </div>
      {contractData && (
        <ContractElement contractData={contractData} isEmployee={true} storedToken={storedToken} conversationId= {conversationId}  />
      )}
    </div>
    <div className="p-6 flex-grow overflow-hidden">
      {/* Titre du chat */}
      <h1 className="text-2xl font-bold mb-4">Chat</h1>
      {/* Conteneur pour les messages et le formulaire d'envoi */}
      <div className="h-full flex flex-col">
        {/* Liste des messages */}
        <div className="chat-messages overflow-y-auto flex-grow">
          {Array.isArray(messages) && messages.length > 0 ? (
            messages.slice().map((message) => (
              <div
                key={message.ID_message}
                className={`mb-4 ${
                  message.Sender === "Client" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${
                    message.Sender === "Client" ? "bg-blue-200" : "bg-gray-200"
                  } whitespace-normal break-words max-w-md`}
                >
                  <p className="text-gray-600 text-left">{message.Content}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-400">Aucun message</div>
          )}
        </div>
        {/* Formulaire d'envoi */}
        <div className="flex mb-6">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 mb-2 w-full"
          />
          <button onClick={sendMessage} className="btn-primary ml-2">
            Envoyer
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default ChatPage;
