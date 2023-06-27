const db = require('../db')

exports.getEmployeePending = function() {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM Employees JOIN Users USING (ID_user) where status = 'Pending'", (error, result) => {
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
        db.query("SELECT ID_Bank from Employees where ID_employee = ?", [id], (error, result) => {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                resolve(result[0])
            }
        })
    })
}