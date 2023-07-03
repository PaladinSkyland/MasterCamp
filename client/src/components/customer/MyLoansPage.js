import React, {useState, useEffect} from "react";
import NavBar from "../NavBar";
import { Link} from "react-router-dom";

const MyLoansPage = () => {
    
    const [myLoanList, setMyLoanList] = useState([]);
    const [refresh, setRefresh] = useState(false)
    const storedToken = localStorage.getItem("token");
   

    const deleteLoan = async (myLoan) => {
      try{
        await fetch("/customer/deleteLoan", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`
          },
          body: JSON.stringify({
            ID_application: myLoan.ID_application
          })
        })
      setRefresh(!refresh)
      }catch (error){
        console.error("Une erreur s'est produite :", error);
      }
    }

    useEffect(() => {
        const fetchLoan = async () => {
            try {
                const response = await fetch("/customer/getMyLoans", {
                    method: "GET",
                    headers: {
                    Authorization: `Bearer ${storedToken}`,
                    "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                setMyLoanList(data);
            } catch (error) {
                console.error("Une erreur s'est produite :", error);
            }
        };
        fetchLoan();
    }, [refresh])

    return (
        <div className="container mx-auto px-4">
        <NavBar />
        <div className="mt-8">
          {myLoanList.length > 0 ? (
            <ul className="space-y-4">
              {myLoanList.map((myLoan, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-200 rounded-lg py-2 px-4">
                  <div>
                    <span className="font-bold">{myLoan.ID_application}</span>
                    <span>{myLoan.Status}</span>
                    <span>{myLoan.Creation_date}</span>
                  </div>
                  {myLoan.Status == "Accepted" ? (<Link
                    to={`/conversation?application=${myLoan.ID_application}`}
                    className="bg-blue-500 text-white w-28 px-4 py-2 rounded-lg text-center"
                  >
                     Voir
                  </Link>) : (<div className="w-28 text-white px-4 py-2 bg-red-500 rounded-lg text-center" onClick={() => deleteLoan(myLoan)}>
                                Supprimer
                              </div>)}
                  
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">Aucune demande de prêt</p>
          )}
        </div>
      </div>
      );
};

export default MyLoansPage;