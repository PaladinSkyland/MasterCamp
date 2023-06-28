const db = require('../db')

exports.insertLink = function (ID_bank, ID_application, ID_employee, status) {
    return new Promise ((resolve,reject) => {
        
        db.query("INSERT INTO Loan_Bank (ID_bank,ID_application, ID_employee, Status) VALUES (?,?,?,?)", 
                [ID_bank,ID_application,ID_employee,status],
                (error, result) => {
                    if(error){
                        console.log(error)
                        reject(error)
                    }else{
                        resolve("succes")
                    }
                } )
    })
}

exports.getAppProcessedByBankID = function (id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT ID_application FROM Loan_Bank WHERE ID_bank = ?", [id], (error, result) => {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}