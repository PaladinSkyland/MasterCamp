const db = require('../db')

exports.getEmployeePending = function() {
    return new Promise((resolve, reject) => {
        db.query("SELECT Users.FirstName, Users.LastName, Users.Email, Banks.Name AS BankName, Employees.Status, Employees.ID_employee FROM Employees JOIN Users USING (ID_user) JOIN Banks USING (ID_bank) WHERE Employees.status = 'Pending'", (error, result) => {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

exports.updateEmployeeStatus = function (id) {
    return new Promise((resolve, reject) => {
        db.query("UPDATE Employees set Status = 'Accepted' where ID_employee = ?", [id],(error, result) => {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

exports.deleteEmployeeByID = function (id) {
    return new Promise((resolve, reject) => {
        db.query("DELETE from Employees where ID_employee = ?", [id], (error, result) => {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

exports.getEmployeeAccepted = function() {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM Employees JOIN Users USING (ID_user) where status = 'Accepted'", (error, result) => {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

exports.getEmployeeIDByUserID = function (id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT ID_employee from Employees where ID_user = ?", [id], (error, result) => {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                resolve(result[0])
            }
        })
    })
}

exports.getBankIDByEmployeeID = function (id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT ID_bank FROM Employees WHERE ID_employee = ?", [id], (error, result) => {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                resolve(result[0])
            }
        })
    })
}

exports.getBankIDbyUserID = function (id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT ID_bank FROM Employees WHERE ID_user = ?", [id], (error, result) => {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                resolve(result[0])
            }
        })
    })
}

exports.getEmployeeLoans = function (id_employee) {
    return new Promise ((resolve, reject) => {
        db.query("SELECT * FROM Loan_Bank JOIN LoanApplications USING(ID_application) JOIN Users USING(ID_user) WHERE Loan_Bank.ID_employee = ?", [id_employee], (error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}