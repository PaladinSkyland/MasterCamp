import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import ToggleButton from "../ToggleButton";
import { LoanDate } from "../customer/MyLoansPage";



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
        event.stopPropagation()
        await takeRequest(loan,status)
        setRequestHandled(!requestHandled)
        if (status === "Accepted") {
            await updateLoanStatus(loan.ID_application)
            await createConversation(loan.ID_application)
        }
    }


    //Test pour voir si tous les loans sont bien retournés
    return (
        <div>
            <NavBar/>
            <ToggleButton isChecked={showBank} value="Loan" handleChange={() => setShowBank(!showBank)} />
            {showBank  ? (
                <div>
                    {allLoans ? (
                        <div>
                            <div className="flex flex-col m-2">
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
                                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-75 bg-white">
                                            <div className="bg-white p-4 rounded-lg ring-blue-300 ring-2 ring-offset-2">
                                            {/* Mettre et styliser toutes les infos de la demande, pour l'instant je met juste tout en vrac*/}
                                                <div className="bg-white p-4 rounded-lg ring-blue-300 ring-2 ring-offset-2">
                                                <p className="text-lg font-bold text-blue-700">Demande de prêt n°{selectedLoan.ID_application}</p>
                                                <p>
                                                <span className="font-semibold">Nom du client :</span> {selectedLoan.Name} {selectedLoan.FirstName}
                                                </p>
                                                <p>
                                                <span className="font-semibold">Montant demandé :</span> {selectedLoan.Amount}
                                                </p>
                                                <p>
                                                <span className="font-semibold">Taux d'intérêt :</span> {selectedLoan.interestRate}%, {selectedLoan.interestType}
                                                </p>
                                                <p>
                                                <span className="font-semibold">Durée du prêt :</span> {selectedLoan.Duration}
                                                </p>
                                                <p>
                                                <span className="font-semibold">Revenus mensuels :</span> {selectedLoan.MonthlyIncome}
                                                </p>
                                                <p>
                                                <span className="font-semibold">Options de remboursements :</span> {selectedLoan.RepaymentOptions}
                                                </p>
                                                <p>
                                                <span className="font-semibold">Assurance et garanties :</span> {selectedLoan.InsuranceAndGuarantees}
                                                </p>
                                                <p>
                                                <span className="font-semibold">Description :</span> {selectedLoan.Description}
                                                </p>
                                                <p>
                                                <span className="font-semibold">Date de la demande :</span> <LoanDate date={selectedLoan.Creation_date} />
                                                </p>
                

                                                <button onClick={closePopup} className="py-2 px-4  btn-primary hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">Fermer</button>
                                                </div>
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
                                            <div className="w-1/2 h-1/2 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-3">
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
                                                <button onClick={closePopup} className="py-2 px-4  btn-primary hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >Fermer</button>
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