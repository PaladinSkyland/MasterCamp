import React, { useEffect, useState } from "react";



const AllLoanApplicationsPage = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState('')
    const [allLoans, setAllLoans] = useState("")
    const [onlyBankLoan, setOnlyBankLoan] = useState("")
    const [showBank, setShowBank] = useState(false)

    const [requestHandled, setRequestHandled] = useState(false)

    const storedToken = localStorage.getItem("token")


    const openPopup = (loan) => {
        setSelectedLoan(loan)
        setIsOpen(true);
    };

    const closePopup = () => {
        setSelectedLoan("")
        setIsOpen(false);
    };




    const fetchAllLoans = async () => {
        let options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${storedToken}`
            }
        }

        await fetch('/employee/allLoans', options)
            .then(response => response.json())
            .then(data => {
                setAllLoans(data)
            })
    }

    const fetchBankLoans = async () => {
        let options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${storedToken}`
            }
        }

        await fetch('/employee/myBankLoans', options)
            .then(response => response.json())
            .then(data => {
                setOnlyBankLoan(data)
            })
    }

    const takeRequest = async (loan,status) => {
        const options = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${storedToken}`
            },
            body: JSON.stringify({
                ID_application: loan.ID_application,
                status: status
            })
        }
        await fetch('/employee/takeRequest', options)

    }

    const updateLoanStatus = async (id) => {
        try {
            const response = await fetch("/employee/updateLoanStatus", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ID_application: id
                })
            });
        } catch (error) {
            console.log(error)
        }
    }

    const createConversation = async (id) => {
        try {
            const response = await fetch("/employee/createConversation", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                    "Content-Type": "application/json",   
                },
                body: JSON.stringify({
                    ID_application: id
                })
            });
        } catch (error){
            console.log(error)
        }
    }

    //Lors du chargement de la page, faire : 
    useEffect(() => {
        fetchAllLoans()
        fetchBankLoans()
    }, [requestHandled])

    const handleRequest = async (event, loan,status) => {
        console.log("j'appuis sur bouton")
        console.log(new Date())
        event.stopPropagation()
        await takeRequest(loan,status)
        setRequestHandled(!requestHandled)
        if (status === "Accepted") {
            console.log("si accépté")
            console.log(new Date())
            await updateLoanStatus(loan.ID_application)
            console.log(new Date())
            await createConversation(loan.ID_application)
        }
    }


    //Test pour voir si tous les loans sont bien retournés
    return (
        <div>
            <button onClick={() => setShowBank(!showBank)}>
                switch
            </button>
            {showBank == true ? (
                <div>
                    {allLoans ? (
                        <div>
                            <div className="w-3/4 m-auto">
                                {allLoans.map((loan, index) => (
                                    <div className="shadow-md my-5 p-6 flex flex-row text-xl justify-between hover:bg-blue-100" onClick={() => openPopup(loan)}>
                                        <div className=" flex flex-row gap-x-10">
                                            <p className="w-40" key={`application-${loan.ID_application}`}>Demande n° {loan.ID_application} :</p>
                                            <p className="w-80" key={`amount-${loan.ID_application}`}>Montant : {loan.Amount}€</p>
                                        </div>
                                        <div className="flex flex-row gap-x-10">
                                            <svg onClick={(event) => handleRequest(event, loan, "Accepted")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            <svg onClick={(event) => handleRequest(event, loan, "Rejected")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>



                                    </div>
                                ))}

                                <div>
                                    {isOpen && (
                                        <div className="border-4 ">
                                            <div className="w-3/5 h-3/5 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-200">
                                                {/* Mettre et styliser toutes les infos de la demande, pour l'instant je met juste tout en vrac*/}
                                                <p>{selectedLoan.ID_application}</p>
                                                <p>Nom du client : {selectedLoan.Name} {selectedLoan.FirstName}</p>
                                                <p>Montant demandé : {selectedLoan.Amount}</p>
                                                <p>Taux d'intérêt : {selectedLoan.interestRate}%, {selectedLoan.interestType}</p>
                                                <p>Durée du prêt : {selectedLoan.Duration}</p>
                                                <p>Revenus mensuels : {selectedLoan.MonthlyIncome}</p>
                                                <p>Options de remboursements {selectedLoan.RepaymentOptions}</p>
                                                <p>Assurance et garanties : {selectedLoan.InsuranceAndGuarantees}</p>
                                                <p>Description : {selectedLoan.Description}</p>
                                                <p>Date de la demande {selectedLoan.Creation_date}</p>

                                                {/* Styliser aussi fermer popup */}
                                                <button onClick={closePopup}>Fermer</button>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>

                        </div>
                    ) : (null)}
                </div>) :

                (<div>
                    {onlyBankLoan ? (
                        <div>
                            <div className="w-3/4 m-auto">
                                {onlyBankLoan.map((loan, index) => (
                                    <div className="shadow-md my-5 p-6 flex flex-row text-xl justify-between hover:bg-blue-100" onClick={() => openPopup(loan)}>
                                        <div className=" flex flex-row gap-x-10">
                                            <p className="w-40" key={`application-${loan.ID_application}`}>Demande n° {loan.ID_application} :</p>
                                            <p className="w-80" key={`amount-${loan.ID_application}`}>Montant : {loan.Amount}€</p>
                                        </div>
                                        <div className="flex flex-row gap-x-10">
                                            <svg onClick={(event) => handleRequest(event, loan, "Accepted")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            <svg onClick={(event) => handleRequest(event, loan, "Rejected")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>



                                    </div>
                                ))}

                                <div>
                                    {isOpen && (
                                        <div className="border-4 ">
                                            <div className="w-3/5 h-3/5 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-200">
                                                {/* Mettre et styliser toutes les infos de la demande, pour l'instant je met juste tout en vrac*/}
                                                <p>{selectedLoan.ID_application}</p>
                                                <p>Nom du client : {selectedLoan.Name} {selectedLoan.FirstName}</p>
                                                <p>Montant demandé : {selectedLoan.Amount}</p>
                                                <p>Taux d'intérêt : {selectedLoan.interestRate}%, {selectedLoan.interestType}</p>
                                                <p>Durée du prêt : {selectedLoan.Duration}</p>
                                                <p>Revenus mensuels : {selectedLoan.MonthlyIncome}</p>
                                                <p>Options de remboursements {selectedLoan.RepaymentOptions}</p>
                                                <p>Assurance et garanties : {selectedLoan.InsuranceAndGuarantees}</p>
                                                <p>Description : {selectedLoan.Description}</p>
                                                <p>Date de la demande {selectedLoan.Creation_date}</p>

                                                {/* Styliser aussi fermer popup */}
                                                <button onClick={closePopup}>Fermer</button>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>

                        </div>
                    ) : (null)}
                    </div>)
            }

        </div>
    )
}




export default AllLoanApplicationsPage