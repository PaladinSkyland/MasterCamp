import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar';
import { Link } from 'react-router-dom';


export const LoanDate = ({ date }) => {
  const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  console.log(date)

  const today = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (formattedDate === today) {
    return (
      <span className="text-gray-500">
        Aujourd'hui à {new Date(date).getHours()}:
        {("0" + new Date(date).getMinutes()).slice(-2)}
      </span>
    );
  } else {
    return <span className="text-gray-500">{formattedDate}</span>;
  }
};

export const LoanStatus = ({ status }) => {

  switch (status) {
    case "Pending":
      return (<span
        className={`m-3 text-orange-500 bg-orange-100 font-bold p-2 rounded-full`}
      >
        {status}
      </span>)
    case "Accepted":
      return (<span
        className={`m-3 text-green-500 bg-green-100 font-bold p-2 rounded-full`}
      >
        {status}
      </span>)
    case 'Finished':
      return (<span
        className={`m-3 text-blue-500 bg-blue-100 font-bold p-2 rounded-full`}
      >
        {status}
      </span>)
    case 'Canceled':
      return (<span
        className={`m-3 text-red-500 bg-red-100 font-bold p-2 rounded-full`}
      >
        {status}
      </span>)
    default:
      return (<span
        className={`m-3 text-gray-500 bg-gray-100 font-bold p-2 rounded-full`}
      >
        {status}
      </span>)
  }
};

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

  
    const ChevronButton = ({ children }) => {
      const [isToggled, setIsToggled] = useState(true);
  
      const handleChange = () => {
        setIsToggled(!isToggled);
      };
  
      return isToggled ? (
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer"
          onClick={handleChange}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      ) : (
        <div className="flex-col items-center justify-center">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6  cursor-pointer"
            onClick={handleChange}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
            />
          </svg>
          {children}
        </div>
      );
    };

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
                    <span className="font-bold">{myLoan.Amount}€</span>
                  </div>
                </div>
                {/* <ChevronButton>
                  <div className="">
                    <span className="font-bold">
                      ID : {myLoan.ID_application}
                    </span>
                  </div>
                </ChevronButton> */}
                {myLoan.Status === 'Accepted' ? (
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
                ) : <div className="w-28 text-white px-4 py-2 bg-red-500 rounded-lg text-center cursor-pointer" onClick={() => deleteLoan(myLoan)}>
                Supprimer
              </div>}
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

export default MyLoansPage;
