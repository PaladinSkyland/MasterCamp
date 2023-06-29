import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar';
const storedToken = localStorage.getItem('token');

const EmployeePage = () => {
  const [employeeListPending, setEmployeeListPending] = useState([]);
  const [employeeListPendingLength, setEmployeeListPendingLength] = useState(
    employeeListPending.length
  );

  const [employeeListAccepted, setEmployeeListAccepted] = useState([]);
  const [employeeListAcceptedLength, setEmployeeListAcceptedLength] = useState(
    employeeListPending.length
  );

  useEffect(() => {
    const fetchEmployeePending = async () => {
      try {
        const response = await fetch('/admin/getEmployeesPending', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setEmployeeListPending(data);
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };
    fetchEmployeePending();
    const fetchEmployeeAccepted = async () => {
      try {
        const response = await fetch('/admin/getEmployeesAccepted', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setEmployeeListAccepted(data);
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };
    fetchEmployeeAccepted();
  }, [employeeListPendingLength, employeeListAcceptedLength]);

    const validateEmployee = async (id) => {
        setEmployeeListPendingLength(employeeListPendingLength - 1)
        const response = fetch("/admin/changeEmployeeStatus", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ID_employee: id
            })
        });
    }

  const deleteEmployee = async (id) => {
    console.log('delete ' + id);
    const toDel = employeeListAccepted.filter((employee) => {
      return employee.ID_employee === id;
    });

    if (toDel.Status === 'Accepted') {
      setEmployeeListAcceptedLength(employeeListAcceptedLength - 1);
    } else {
      setEmployeeListPendingLength(employeeListPendingLength - 1);
    }
    const response = fetch('/admin/deleteEmployee', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${storedToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ID_employee: id,
      }),
    });
  };

  const [isChecked, setIsChecked] = useState(false);

  const ToggleButton = ({ isChecked }) => {
    const handleChange = () => {
      setIsChecked(!isChecked);
    };

    return (
      <label className="flex items-center m-3">
        <div
          className={`mr-3 ${
            isChecked ? 'text-blue-200' : 'text-blue-500'
          } font-bold`}
        >
          Employe in attend
        </div>
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={isChecked}
            onChange={handleChange}
          />
          <div className="w-9 h-4 bg-gray-300 rounded-full shadow-inner">
            <div
              className={`absolute left-0 top-0 transition bg-blue-500 w-4 h-4 rounded-full shadow transform ${
                isChecked ? 'translate-x-5' : 'translate-x-0'
              }`}
            ></div>
          </div>
        </div>
        <div
          className={`ml-3 ${
            isChecked ? 'text-blue-500' : 'text-blue-200'
          } font-bold`}
        >
          Employe accepted
        </div>
      </label>
    );
  };

  return employeeListPending ? (
    <div>
      <div className="flex flex-col w-full gap-5 p-2 mx-auto select-none sm:p-4 sm:h-64 rounded-2xl">
        <div className="flex items-center justify-center">
          <ToggleButton
            isChecked={isChecked}
            setIsChecked={() => {
              setIsChecked(isChecked);
            }}
          />
        </div>
        {isChecked ? (
          <div className="p-2 shadow">
            {employeeListAccepted.map((employee, index) => (
              <div className="flex rounded-2xl gap-4 items-center" key={index}>
                <div className="w-1/3 flex flex-col">
                  <p className="text-4xl">{employee.LastName}</p>
                  <p className="text-2xl">{employee.FirstName}</p>
                </div>
                <div className="w-1/3">
                  <p className="text-2xl">{employee.Email}</p>
                </div>
                <button
                  className="w-1/3 items-center justify-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-500"
                  onClick={() => deleteEmployee(employee.ID_employee)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-2 shadow">
            {employeeListPending.map((employee, index) => (
              <div className="flex rounded-2xl gap-4 items-center">
                <p>{console.log(employee)}</p>
                <div className="w-1/3 flex flex-col">
                  <p className="text-4xl">{employee.LastName}</p>
                  <p className="text-2xl">{employee.FirstName}</p>
                </div>
                <div className="w-1/3">
                  <p className="text-2xl">{employee.BankName}</p>
                </div>
                <div
                  className="w-1/3 flex flex-row gap-4 items-center justify-center"
                  key={index}
                >
                  <button
                    className="w-full px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:bg-green-500 "
                    onClick={() => validateEmployee(employee.ID_employee)}
                  >
                    Validate
                  </button>
                  <button
                    className="w-full px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-500"
                    onClick={() => deleteEmployee(employee.ID_employee)}
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
  ) : null;
};

export default EmployeePage;
