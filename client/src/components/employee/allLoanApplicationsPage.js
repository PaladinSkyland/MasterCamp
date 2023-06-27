import React, { useEffect, useState } from "react";

const AllLoanApplicationsPage = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState ('')

    const openPopup = (loan) => {
        setSelectedLoan(loan)
        setIsOpen(true);
    };

    const closePopup = () => {
        setSelectedLoan("")
        setIsOpen(false);
    };

    const storedToken = localStorage.getItem("token")
    const [allLoans, setAllLoans] = useState("")

    let options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${storedToken}`
        }
    }

    const fetchAllLoans = async () => {
        await fetch('/employee/allLoans', options)
            .then(response => response.json())
            .then(data => {
                setAllLoans(data)
            })
    }

    //Lors du chargement de la page, faire : 
    useEffect(() => {
        fetchAllLoans()
        console.log(allLoans)
    }, [])


    //Test pour voir si tous les loans sont bien retournés
    return allLoans ? (
        <div>
            <div className="w-3/4 m-auto">
                {allLoans.map((loan, index) => (
                    <div className="shadow-md my-5 p-6 flex flex-row text-xl justify-between hover:bg-blue-100" onClick={() => openPopup(loan)}>
                        <div className=" flex flex-row gap-x-10">
                            <p className="w-40" key={index}>Demande n° {loan.ID_application} :</p>
                            <p className="w-80" key={index}>Montant : {loan.Amount}€</p>
                        </div>
                        <div className="flex flex-row gap-x-10">
                            <svg onClick={(event) => { event.stopPropagation(); console.log("test2"); }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
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
    ) : (<p> non </p>)
}




export default AllLoanApplicationsPage