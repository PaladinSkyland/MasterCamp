import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar';
const storedToken = localStorage.getItem('token');

const MyLoansPage = () => {
  const [myLoanList, setMyLoanList] = useState([]);

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const response = await fetch('/customer/getMyLoans', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setMyLoanList(data);
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };
    fetchLoan();
  }, []);

  return myLoanList ? (
    <div>
      <NavBar />
      <ul>
        {myLoanList.map((myLoan, index) => (
            <li key={index}>
              <p>{console.log(myLoan)}</p>
            {myLoan.ID_application}
            {myLoan.Status}
            {Date(myLoan.Creation_date)}
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default MyLoansPage;
