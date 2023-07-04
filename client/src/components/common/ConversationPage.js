import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import NavBar from "../NavBar";
import { LoanDate } from '../customer/MyLoansPage'



const ContractElement = ({ storedToken, conversationId }) => {
  const [contractData, setContractData] = useState();

  const [amount, setAmount] = useState();
  const [interestRate, setInterestRate] = useState();
  const [duration, setDuration] = useState();
  const [interestType, setInterestType] = useState();
  const [monthlyIncome, setMonthlyIncome] = useState();
  const [repaymentOptions, setRepaymentOptions] = useState();
  const [description, setDescription] = useState();
  const [feesAndCosts, setFeesAndCosts] = useState();
  const [insuranceAndGuarantees, setInsuranceAndGuarantees] = useState();
  const { getOnglets, userData } = useContext(UserContext);


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
        setContractData(data);
      } else {
        throw new Error("Error fetching messages");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getcontract();
  }, []);

  useEffect(() => {
    if (!contractData) return;
    setAmount(contractData.Amount);
    setInterestRate(contractData.InterestRate);
    setDuration(contractData.Duration);
    setInterestType(contractData.InterestType);
    setMonthlyIncome(contractData.MonthlyIncome);
    setRepaymentOptions(contractData.RepaymentOptions);
    setDescription(contractData.Description);
    setFeesAndCosts(contractData.FeesAndCosts);
    setInsuranceAndGuarantees(contractData.InsuranceAndGuarantees);
  }, [contractData]);


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
        body: JSON.stringify({
          Amount: amount, IntersestRate: interestRate, Duration: duration, InterestType: interestType,
          MonthlyIncome: monthlyIncome, RepaymentOptions: repaymentOptions, Description: description, FeesAndCosts: feesAndCosts,
          InsuranceAndGuarantees: insuranceAndGuarantees
        }),
      });

      if (response.ok) {
        console.log("Contrat mis à jour avec succès");
        getcontract();
      } else {
        throw new Error("Erreur lors de la mise à jour du contrat");
      }
    } catch (error) {
      console.error(error);
    }
  };


  const StatusContract = async (Status) => {
    try {
      const response = await fetch(`/conversation/statuscontract/${conversationId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({ Status }),
      });

      if (response.ok) {
        console.log("Status mides à jour");
      } else {
        throw new Error("Erreur lors de la mise à jour du status");
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleAccept = async (e) => {
    e.preventDefault();
    StatusContract("Accepted")
  };


  const handleRefuse = async (e) => {
    StatusContract("Canceled");
  };


  const renderContractInfo = () => {
    return (
      <div className="p-4 rounded-lg bg-white my-4">
        <h2 className="text-2xl font-bold mb-4">Informations du contrat</h2>
        <p className="mb-2">
          <span className="font-bold">Montant :</span> {contractData.Amount}
        </p>
        <p className="mb-2">
          <span className="font-bold">Taux d'intérêt :</span> {contractData.InterestRate}%
        </p>
        <p className="mb-2">
          <span className="font-bold">Durée :</span> {contractData.Duration} mois
        </p>
        <p className="mb-2">
          <span className="font-bold">Type d'intérêt :</span> {contractData.InterestType}
        </p>
        <p className="mb-2">
          <span className="font-bold">Revenu mensuel :</span> {contractData.MonthlyIncome}
        </p>
        <p className="mb-2">
          <span className="font-bold">Options de remboursement :</span> {contractData.RepaymentOptions}
        </p>
        <p className="mb-2">
          <span className="font-bold">Description :</span> {contractData.Description}
        </p>
        <p className="mb-2">
          <span className="font-bold">Frais et coûts :</span> {contractData.FeesAndCosts}
        </p>
        <p className="mb-2">
          <span className="font-bold">Date de création :</span> <LoanDate date={contractData.Creation_date} />
        </p>
        <p className="mb-2">
          <span className="font-bold">Assurances et garanties :</span> {contractData.InsuranceAndGuarantees}
        </p>
        <p className="mb-2">
          <span className="font-bold">Statut :</span> {contractData.Status}
        </p>
        <div className="mt-4 flex space-x-2 text-white font-semibold">
          {contractData.Status !== "Accepted" && contractData.Status !== "Canceled" && (
            <button className="bg-red-500 p-2 w-1/2 hover:bg-red-400 rounded-sm" onClick={handleRefuse}>Annuler le contrat</button>
          )}
          {contractData.Status === "Progress" && (
            <button className="bg-green-500 p-2 w-1/2 hover:bg-green-400 rounded-sm" onClick={handleAccept}>Accepter le contrat</button>
          )}
        </div>

      </div>
    );
  };

  const renderEditableContractInfo = () => {
    return (
      <div className="p-4 bg-gray-100 bg-white my-3 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Informations du contrat</h2>
        <p className="flex mb-2 p-2 gap-2 flex-col">
          <span>
            <span className="font-bold">Montant :</span> {contractData.Amount}€
          </span>
          <input className="bg-white p-2 border-2 rounded-md flex-grow" type="number" placeholder={amount} onChange={handleAmountChange} />
        </p>
        <p className="flex mb-2 p-2 gap-2 flex-col">
          <span>
            <span className="font-bold">Taux d'intérêt :</span> {contractData.InterestRate}%
          </span>
          <input className="bg-white p-2 border-2 rounded-md flex-grow" type="number" placeholder={interestRate} onChange={handleInterestRateChange} />
        </p>

        <p className="flex mb-2 p-2 gap-2 flex-col">
          <span>
            <span className="font-bold">Durée :</span> {contractData.Duration} mois
          </span>
          <input className="bg-white p-2 border-2 rounded-md flex-grow" type="number" placeholder={duration} onChange={handleDurationChange} />
        </p>

        <p className="flex mb-2 p-2 gap-2 flex-col">
          <span>
            <span className="font-bold">Type d'intérêt :</span> {contractData.InterestType}
          </span>
          <input className="bg-white p-2 border-2 rounded-md flex-grow" type="text" placeholder={interestType} onChange={handleInterestTypeChange} />
        </p>

        <p className="flex mb-2 p-2 gap-2 flex-col">
          <span>
            <span className="font-bold">Revenu mensuel :</span> {contractData.MonthlyIncome}
          </span>
          <input className="bg-white p-2 border-2 rounded-md flex-grow" type="number" placeholder={monthlyIncome} onChange={handleMonthlyIncomeChange} />
        </p>

        <p className="flex mb-2 p-2 gap-2 flex-col">
          <span>
            <span className="font-bold">Options de remboursement :</span> {contractData.RepaymentOptions}
          </span>
          <input className="bg-white p-2 border-2 rounded-md flex-grow" type="text" placeholder={repaymentOptions} onChange={handleRepaymentOptionsChange} />
        </p>

        <p className="flex mb-2 p-2 gap-2 flex-col">
          <span className="font-bold">Description :</span> {contractData.Description}
        </p>

        <p className="flex mb-2 p-2 gap-2 flex-col">
          <span>
            <span className="font-bold">Frais et coûts :</span> {contractData.FeesAndCosts}
          </span>
          <input className="bg-white p-2 border-2 rounded-md flex-grow" type="text" placeholder={feesAndCosts} onChange={handleFeesAndCostsChange} />
        </p>

        <p className="flex mb-2 p-2 gap-2">
          <span className="font-bold">Date de création : </span>
          <span><LoanDate date={contractData.Creation_date} /></span>

        </p>

        <p className="flex mb-2 p-2 gap-2 flex-col">
          <span>
            <span className="font-bold">Assurances et garanties :</span> {contractData.InsuranceAndGuarantees}
          </span>
          <input className="bg-white p-2 border-2 rounded-md flex-grow" type="text" placeholder={insuranceAndGuarantees} onChange={handleInsuranceAndGuaranteesChange} />
        </p>

        <p className="flex mb-2 p-2 gap-2 flex-col">
          <span>
            <span className="font-bold">Statut : </span> {contractData.Status}
          </span>
        </p>

        <div className="mt-4 flex space-x-2 text-white font-semibold">
          <button className="bg-green-500 p-2 w-1/2 hover:bg-green-400 rounded-sm" onClick={handleSubmit}>Mettre à jour et valider le contrat</button>
          {contractData.Status !== "Accepted" && contractData.Status !== "Canceled" && (
            <button className="bg-red-500 p-2 w-1/2 hover:bg-red-400 rounded-sm" onClick={handleRefuse}>Annuler le contrat</button>
          )}
        </div>
      </div>
    );

  };

  return (userData.UserType === "employee" && contractData) ? renderEditableContractInfo(contractData) : (contractData ? renderContractInfo(contractData) : null);

}

const ChatPage = () => {
  const { conversationId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const storedToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const [myDocList, setMyDocList] = useState([]);
  const [myVisibleList, setMyVisibleList] = useState([]);
  const [toggle, setToggle] = useState(false)
  const [checkedItems, setCheckedItems] = useState([]);
  const { userData } = useContext(UserContext)


  const handleArrowClick = () => {
    navigate('/conversation/');
  };

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
    switch (fileType) {
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

  const handleClick = async (fileType) => {
    //get an identifier to know which file have been clicked
    //const fileType = event.target.value;

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

  const changeBackground = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  }

  return (
    <div className="page-container flex flex-col h-screen overflow-hidden">
      <NavBar />
      <div className="flex bg-white justify-between w-full" style={{ height: "calc(100vh - 64px)" }}>
        <div className="w-2/5 bg-gray-100 p-6 overflow-y-auto ">
          <div className="flex items-center mb-4">
            <button className="flex items-center text-blue-500 font-bold" onClick={handleArrowClick}>
              <svg className="w-6 h-6 mr-2 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour
            </button>
          </div>
          <h2 className="text-lg font-bold mb-4">Actions</h2>
          <div className="flex justify-center">
            <div className="inline-block p-3 rounded-lg bg-blue-400 hover:bg-blue-300 cursor-pointer my-4" onClick={() => setToggle(!toggle)}>
              {toggle ? "Voir le contrat" : "Voir les documents"}
            </div>
          </div>


          {toggle ? (
            <>
              {Array.isArray(myDocList) && myDocList.length > 0 ? (
                myDocList.map((doc, index) => (
                  <div key={index} className={`flex flex-row gap-4 my-3 p-2 justify-between ${checkedItems[index] ? 'bg-sky-100' : 'bg-white'}`}>
                    <p className="font-bold font-semibold">{doc.Title}</p>
                    <div className="rounded-lg">
                      <input
                        type="checkbox"
                        id={`myCheckbox-${index}`}
                        className="form-checkbox text-blue-500 h-4 w-4 rounded-lg"
                        checked={checkedItems[index]}
                        onChange={(e) => {
                          setToVisible(doc.ID_file, e.target.checked);
                          changeBackground(index);
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (<div>
                {userData.UserType == "customer" ? (<div className="font-semibold text-center my-4"> Vous n'avez importé aucun fichier pour le moment</div>) : (null)}
              </div>

              )}
              {Array.isArray(myVisibleList) && myVisibleList.length > 0 ? (
                <div className="bg-white p-2 m-4 rounded-lg">
                  {myVisibleList.map((visible, index) => (

                    <div key={index} className="py-2">
                      <p className="font-bold">{getFileLabel(visible.File_type)} :</p>
                      
                      <div className="cursor-pointer flex flex-row gap-2" onClick={() => handleClick(visible.File_type)}>
                        <p>{visible.Title}</p>
                        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
                        </svg>
                      </div>

                    </div>
                  ))}
                </div>

              ) : (
                <div>
                  {userData.UserType == "employee" ? (<div className="font-semibold text-center my-4"> Le client n'a partagé aucun document pour le moment</div>) : (null)}
                </div>

              )}
            </>
          ) : (

            <ContractElement storedToken={storedToken} conversationId={conversationId} />

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
                    className={`mb-4 ${message.Sender === "Client" ? "text-right" : "text-left"
                      }`}
                  >
                    <div
                      className={`inline-block p-2 rounded-lg ${message.Sender === "Client" ? "bg-blue-200" : "bg-gray-200"
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
