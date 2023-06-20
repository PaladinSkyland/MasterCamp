import React from "react";
import AccountPage from "../AccountPage";

const BankPage = () => {

    const employeeList = fetchBank()

    return (
        <div>
            <p>Lucas est relou il fait que chialer</p>
        </div>
    )
};

function fetchBank() {
    fetch("/admin/getBanks", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        
    })
}

export default BankPage;