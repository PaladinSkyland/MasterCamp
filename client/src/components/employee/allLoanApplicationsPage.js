import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";

const allLoanApplicationsPage = () => {

    //Import des données de l'utilisateur connecté
    const {userData} = useContext(UserContext)

    //Lors du chargement de la page, faire : 
    /* useEffect(() => {
        fetch('/loan/getAllLoans')
    }, []) */
    return (
        <div>
            <p>test</p>
        </div>
    )
}

export default allLoanApplicationsPage