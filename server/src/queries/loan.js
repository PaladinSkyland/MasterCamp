const db = require('../db')


exports.insertLoan = function(interestRate,loanDuration,loanAmount,interestType,monthlyIncome,repaymentOptions,description,ID_user,ID_bank){
    return new Promise ((resolve,reject) => {
        
        db.query("INSERT INTO LoanApplications (Amount,InterestRate,Duration,InterestType," +  
                "MonthlyIncome,RepaymentOptions,Description,Status," + 
                "Creation_date,ID_user,ID_bank) VALUES (?,?,?,?,?,?,?,?,?,?,?)", 
                [loanAmount,interestRate,loanDuration,interestType,monthlyIncome,repaymentOptions,description,"Pending",new Date(),ID_user,ID_bank],
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

exports.getLoansWithoutBank = function (sqlToAdd) {
    request = sqlToAdd ? "SELECT Users.LastName, Users.FirstName, LoanApplications.* FROM LoanApplications JOIN Users USING (ID_user) WHERE ID_bank IS NULL AND ID_application NOT IN (" + sqlToAdd + ")" :
    "SELECT Users.LastName, Users.FirstName, LoanApplications.* FROM LoanApplications JOIN Users USING (ID_user) WHERE ID_bank IS NULL" 
    return new Promise ((resolve,reject) => {
        db.query(request, (error, result) => {
            if(error){
                reject(error)
            }else{
                resolve(result)
            }
        })
    })
}

exports.getLoansWithBank = function (ID_bank, sqlToAdd) {
        request = sqlToAdd ? "AND ID_application NOT IN (" + sqlToAdd + ")" : ""
        return new Promise ((resolve,reject) => {
        db.query("SELECT Users.LastName, Users.FirstName, LoanApplications.* FROM LoanApplications JOIN Users USING (ID_user) WHERE ID_bank = ? " + request, [ID_bank], (error, result) => {
            if(error){
                reject(error)
            }else{
                resolve(result)
            }
        })
    })
}

exports.getMyLoans = function (id) {
    return new Promise ((resolve, reject) => {
        db.query("SELECT * FROM LoanApplications WHERE ID_user = ?", [id], (error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

exports.updateLoanStatus = function (id) {
    return new Promise ((resolve, reject) => {
        db.query("UPDATE LoanApplications SET Status = 'Accepted' WHERE ID_application = ?", [id], (error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

exports.getAccessibleLoan = function (id_bank) {
    return new Promise ((resolve, reject) => {
        db.query("SELECT ID_application FROM LoanApplications WHERE ID_bank IS NULL OR ID_bank = ?", [id_bank], (error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

exports.getUserLastNameAndIDByIDLoan = function (id_loan) {
    return new Promise ((resolve, reject) => {
        db.query("SELECT Users.LastName, Users.ID_user FROM Users JOIN LoanApplications USING(ID_user) WHERE ID_application = ?", [id_loan], (error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

exports.getMyLoansID = function (ID_user) {
    return new Promise ((resolve, reject) => {
        db.query("SELECT ID_application FROM LoanApplications WHERE ID_user = ?", [ID_user], (error, result) => {
            if(error){
                reject(error)
            }else {
                resolve (result)
            }
        })
    })
}

exports.deleteLoan = function (ID_application) {
    return new Promise ((resolve, reject) => {
        db.query("DELETE FROM LoanApplications WHERE ID_application = ?", [ID_application], (error, result) => {
            if(error){
                reject(error)
            }else {
                resolve (result)
            }
        })
    })
}