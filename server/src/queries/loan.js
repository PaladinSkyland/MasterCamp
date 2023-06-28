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

exports.getLoansWithoutBank = function () {
    return new Promise ((resolve,reject) => {
        db.query("SELECT users.LastName, users.FirstName, LoanApplications.* FROM LoanApplications JOIN users USING (ID_user) WHERE ID_bank IS NULL", (error, result) => {
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