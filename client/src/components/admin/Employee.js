import React, { useState, useEffect } from "react";
const storedToken = localStorage.getItem("token");

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
        const response = await fetch("/admin/getEmployeesPending", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
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
        const response = await fetch("/admin/getEmployeesAccepted", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
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
    setEmployeeListPendingLength(employeeListPendingLength - 1);
    const response = fetch("/admin/changeEmployeeStatus", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${storedToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ID_employee: id,
      }),
    });
  };

  const deleteEmployee = async (id) => {
    const toDel = employeeListAccepted.filter((employee) => {
      return employee.ID_employee === id;
    });

    if (toDel.Status === "Accepted") {
      setEmployeeListAcceptedLength(employeeListAcceptedLength - 1);
    } else {
      setEmployeeListPendingLength(employeeListPendingLength - 1);
    }
    const response = fetch("/admin/deleteEmployee", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${storedToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ID_employee: id,
      }),
    });
  };

  //todo make it better to the front of this page

  return employeeListPending ? (
    <div className="flex flex-col w-full gap-5 p-2 mx-auto bg-white shadow-lg select-none sm:p-4 sm:h-64 rounded-2xl sm:flex-row ">
      <div className="flex flex-col flex-1 gap-5 sm:p-2">
        <div className="flex flex-col flex-1 gap-3">
          <div className="w-full bg-gray-200 h-14 rounded-2xl text-center text-4xl font-bolt">
            Employee in attend
          </div>
          {employeeListPending.map((employee, index) => (
            <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl">
              <div className="flex flex-row justify-between">{employee}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-5 sm:p-2">
        <div className="flex flex-col flex-1 gap-3">
          <div className="w-full bg-gray-200 h-14 rounded-2xl text-center text-4xl font-bolt">
            Employee accepted
          </div>
          {employeeListAccepted.map((employee, index) => (
            <div className="w-full flex bg-gray-200 rounded-2xl gap-4 items-center">
              <p className="text-4xl">{employee.LastName}</p>
              <button
                className="items-center justify-center w-24 px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-500"
                onClick={() => deleteEmployee(employee.ID_employee)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <p>non</p>
  );
};

export default EmployeePage;
