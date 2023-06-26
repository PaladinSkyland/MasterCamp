import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";

const AllLoanApplicationsPage = () => {

    //Import des données de l'utilisateur connecté
    const { userData } = useContext(UserContext)
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
                    <div className="shadow-md my-5 p-6 flex flex-row text-xl justify-between hover:bg-blue-100" onClick={() => console.log("test")}>
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
            </div>

        </div>
    ) : (<p> non </p>)
}




export default AllLoanApplicationsPage