const db = require('../db')


exports.insertLoan = function(interestRate,loanDuration,loanAmount,interestType,monthlyIncome,repaymentOptions,insurance,description,ID_user,ID_bank){
    return new Promise ((resolve,reject) => {
        
        db.query("INSERT INTO loanapplications (Amount,InterestRate,Duration,InterestType," +  
                "MonthlyIncome,RepaymentOptions,InsuranceAndGuarantees,Description,Status," + 
                "Creation_date,ID_user,ID_bank) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", 
                [loanAmount,interestRate,loanDuration,interestType,monthlyIncome,repaymentOptions,insurance,description,"Pending",new Date(),ID_user,ID_bank],
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
    request = sqlToAdd ? "SELECT users.Name, users.FirstName, loanapplications.* FROM loanapplications JOIN users USING (ID_user) WHERE ID_bank IS NULL AND ID_application NOT IN (" + sqlToAdd + ")" :
    "SELECT users.Name, users.FirstName, loanapplications.* FROM loanapplications JOIN users USING (ID_user) WHERE ID_bank IS NULL" 
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
        db.query("SELECT users.Name, users.FirstName, loanapplications.* FROM loanapplications JOIN users USING (ID_user) WHERE ID_bank = ? " + request, [ID_bank], (error, result) => {
            if(error){
                reject(error)
            }else{
                resolve(result)
            }
        })
    })
}