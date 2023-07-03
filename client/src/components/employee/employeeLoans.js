import React, {useState, useEffect} from "react";
import NavBar from "../NavBar";
import { LoanDate, LoanStatus } from "../customer/MyLoansPage";
import { Link} from "react-router-dom";


const EmployeeLoanPage = () => {
    
    const [myLoanList, setMyLoanList] = useState([]);
    const storedToken = localStorage.getItem("token");

    useEffect(() => {
        const fetchLoan = async () => {
            try {
                const response = await fetch("/employee/getMyLoans", {
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
    }, [])

    return (
        <div>
        <NavBar />
        <div className="container mx-auto px-4">
        <div className="mt-8">
        {myLoanList.length > 0 ? (
          <ul className="space-y-4">
            {myLoanList.map((myLoan, index) => (
              <li
                key={index}
                className="flex items-center justify-between shadow rounded-lg py-2 px-4"
              >
                <div className="flex flex-col">
                  <LoanDate date={myLoan.Creation_date} />
                  <div className="flex flex-row m-2 space-x-4 items-center">
                    <LoanStatus status={myLoan.Status} />
                    <span className="font-bold">{myLoan.Amount}$</span>
                  </div>
                </div>
                <Link
                    to={`/conversation?application=${myLoan.ID_application}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                      />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">Aucune demande de prêt</p>
          )}
        </div>
      </div>
      </div>
      );
};

export default EmployeeLoanPage;