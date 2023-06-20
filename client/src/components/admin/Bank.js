import React, {useState, useEffect} from "react";


const BankPage = () => {

    const [bankList, setBankList] = useState([]);
    const [bankListLength, setBankListLength] = useState(bankList.length)

    useEffect(() => {
        const fetchBank = async () => {
            try {
                const response = await fetch("/admin/getBanksPending", {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                setBankList(data);
                console.log("je suis la data", data)
            } catch (error) {
                console.error("Une erreur s'est produite :", error);
            }
        };
        fetchBank();
    }, [bankListLength]);
    console.log(bankList)

    const validateBank = async (id) => {
        console.log("je suis po gentil")
        const response = fetch("/admin/changeStatus", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ID_bank: id
            })
        });
        setBankListLength(bankListLength - 1)
    }

    return bankList ? 
        (
        
        <div>
            <ul>
                
            {bankList.map((bank, index) => (
                <li
                key = {index}
                >
                    {bank.Name}

                <button onClick={ () => validateBank(bank.ID_bank)}>C'est moi tchoupi</button>

                </li>
                
            ))
            }

            </ul> 
        </div> ) : (  <p>non</p>)
            
};


export default BankPage;