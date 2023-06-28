import React, {useState, useEffect} from "react";
import NavBar from "../NavBar";
const storedToken = localStorage.getItem("token");


const BankPage = () => {

    const [bankListPending, setBankListPending] = useState([]);
    const [bankListPendingLength, setBankListPendingLength] = useState(bankListPending.length)

    const [bankListAccepted, setBankListAccepted] = useState([]);
    const [bankListAcceptedLength, setBankListAcceptedLength] = useState(bankListPending.length)

    useEffect(() => {
        const fetchBankPending = async () => {
            try {
                const response = await fetch("/admin/getBanksPending", {
                    method: "GET",
                    headers: {
                    Authorization: `Bearer ${storedToken}`,
                    "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                setBankListPending(data);
            } catch (error) {
                console.error("Une erreur s'est produite :", error);
            }
        };
        fetchBankPending();
        const fetchBankAccepted = async () => {
            try {
                const response = await fetch("/admin/getBanksAccepted", {
                    method: "GET",
                    headers: {
                    Authorization: `Bearer ${storedToken}`,
                    "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                setBankListAccepted(data);
            } catch (error) {
                console.error("Une erreur s'est produite :", error);
            }
        };
        fetchBankAccepted();

    }, [bankListPendingLength, bankListAcceptedLength]);

    const validateBank = async (id) => {
        setBankListPendingLength(bankListPendingLength - 1)
        const response = fetch("/admin/changeBankStatus", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ID_bank: id
            })
        });
    }

    const deleteBank = async (id) => {
        const toDel = bankListAccepted.filter((bank) => {
            return bank.ID_bank === id
        })

        if (toDel.Status === "Accepted") {
            setBankListAcceptedLength(bankListAcceptedLength - 1)
        } else {
            setBankListPendingLength(bankListPendingLength -1)
        }
        const response = fetch("/admin/deleteBank", {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ID_bank: id
            })
        });
        
    }

    return bankListPending ? 
        (
        
        <div>
            <NavBar/>
            <ul>   
            {bankListPending.map((bank, index) => (
                <li
                key = {index}
                >
                    {bank.Name}
                    {bank.Status}


                <button onClick={ () => validateBank(bank.ID_bank)}>Validate</button>

                <button onClick={ () => deleteBank(bank.ID_bank)}>Delete</button>

                </li>
                
            ))
            }
            </ul>
            <br></br>
            <br></br><br></br><br></br>
            <ul>   
            {bankListAccepted.map((bank, index) => (
                <li
                key = {index}
                >
                    {bank.Name}
                    {bank.Status}


                <button onClick={ () => deleteBank(bank.ID_bank)}>Delete</button>
                </li>
                
            ))
            }
            </ul>  
        </div> ) : (  <p>non</p>)
            
};


export default BankPage;