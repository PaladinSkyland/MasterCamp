import React, {useState, useEffect} from "react";


const EmployeePage = () => {

    const [employeeListPending, setEmployeeListPending] = useState([]);
    const [employeeListPendingLength, setEmployeeListPendingLength] = useState(employeeListPending.length)

    const [employeeListAccepted, setEmployeeListAccepted] = useState([]);
    const [employeeListAcceptedLength, setEmployeeListAcceptedLength] = useState(employeeListPending.length)

    useEffect(() => {
        const fetchEmployeePending = async () => {
            try {
                const response = await fetch("/admin/getEmployeesPending", {
                    method: "GET",
                    headers: {
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
        setEmployeeListPendingLength(employeeListPendingLength - 1)
        const response = fetch("/admin/changeEmployeeStatus", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ID_employee: id
            })
        });
    }

    const deleteEmployee = async (id) => {
        const toDel = employeeListAccepted.filter((employee) => {
            return employee.ID_employee === id
        })

        if (toDel.Status === "Accepted") {
            setEmployeeListAcceptedLength(employeeListAcceptedLength - 1)
        } else {
            setEmployeeListPendingLength(employeeListPendingLength -1)
        }
        const response = fetch("/admin/deleteEmployee", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ID_employee: id
            })
        });
        
    }

    return employeeListPending ? 
        (
        
        <div>
            <ul>   
            {employeeListPending.map((employee, index) => (
                <li
                key = {index}
                >
                    {employee.Name}
                    {employee.Status}


                <button onClick={ () => validateEmployee(employee.ID_employee)}>Validate</button>

                <button onClick={ () => deleteEmployee(employee.ID_employee)}>Delete</button>

                </li>
                
            ))
            }
            </ul>
            <br></br>
            <br></br><br></br><br></br>
            <ul>   
            {employeeListAccepted.map((employee, index) => (
                <li
                key = {index}
                >
                    {employee.Name}
                    {employee.Status}


                <button onClick={ () => deleteEmployee(employee.ID_employee)}>Delete</button>
                </li>
                
            ))
            }
            </ul>  
        </div> ) : (  <p>non</p>)
            
};


export default EmployeePage;