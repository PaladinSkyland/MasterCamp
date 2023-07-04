import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar';
import ToggleButton from '../ToggleButton';
import { LoanStatus } from '../customer/MyLoansPage';


const BankPage = () => {
  const [bankListPending, setBankListPending] = useState([]);
  const [bankListPendingLength, setBankListPendingLength] = useState(
    bankListPending.length
  );
  const storedToken = localStorage.getItem('token');

  const [bankListAccepted, setBankListAccepted] = useState([]);
  const [bankListAcceptedLength, setBankListAcceptedLength] = useState(
    bankListPending.length
  );

  useEffect(() => {
    const fetchBankPending = async () => {
      try {
        const response = await fetch('/admin/getBanksPending', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
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
        const response = await fetch('/admin/getBanksAccepted', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
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
    setBankListPendingLength(bankListPendingLength - 1);
    const response = fetch('/admin/changeBankStatus', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${storedToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ID_bank: id,
      }),
    });
  };

  const deleteBank = async (id) => {
    const toDel = bankListAccepted.filter((bank) => {
      return bank.ID_bank === id;
    });

    if (toDel.Status === 'Accepted') {
      setBankListAcceptedLength(bankListAcceptedLength - 1);
    } else {
      setBankListPendingLength(bankListPendingLength - 1);
    }
    const response = fetch('/admin/deleteBank', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${storedToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ID_bank: id,
      }),
    });
  };

  const [isChecked, setIsChecked] = useState(false);

  return bankListPending ? (
    <div>
      <NavBar />
      <div className="flex flex-col mx-auto select-none sm:p-4 sm:h-64 rounded-2xl">
        <div className="flex items-center justify-center">
          <ToggleButton
            isChecked={isChecked}
            value={["Banks pending", "Banks accepted"]}
            handleChange={() => setIsChecked(!isChecked)}
          />
        </div>
        {isChecked ? (
          <div className="p-2 shadow">
            {bankListAccepted.map((bank, index) => (
              <div className="flex rounded-2xl items-center" key={index}>
                <div className="w-1/3 flex flex-col py-2">
                  <p className="text-4xl">{bank.Name}</p>
                </div>
                <div className="w-1/3">
                  <LoanStatus status={bank.Status} />
                </div>
                <button
                  className="w-1/3 items-center justify-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-500"
                  onClick={() => deleteBank(bank.ID_bank)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-2 shadow">
            {bankListPending.map((bank, index) => (
              <div className="flex gap-7 items-center">
                <div className="w-1/3">
                  <p className="text-4xl">{bank.Name}</p>
                </div>
                <div className="w-1/3">
                  <p className="text-2xl">{bank.Status}</p>
                </div>
                <div
                  className="w-1/3 flex flex-row gap-4 items-center justify-center"
                  key={index}
                >
                  <button
                    className="w-full px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:bg-green-500 "
                    onClick={() => validateBank(bank.ID_bank)}
                  >
                    Validate
                  </button>
                  <button
                    className="w-full px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-500"
                    onClick={() => deleteBank(bank.ID_bank)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  ) : (
    <NavBar />
  );
};

export default BankPage;
