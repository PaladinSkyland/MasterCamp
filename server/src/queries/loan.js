const db = require('../db')


exports.insertLoan = function(interestRate,loanDuration,loanAmount,interestType,monthlyIncome,repaymentOptions,insurance,description,ID_user){
    return new Promise ((resolve,reject) => {
        
        db.query("INSERT INTO loanapplications (Amount,InterestRate,Duration,InterestType," +  
                "MonthlyIncome,RepaymentOptions,InsuranceAndGuarantees,Description,Status," + 
                "Creation_date,ID_user) VALUES (?,?,?,?,?,?,?,?,?,?,?)", 
                [loanAmount,interestRate,loanDuration,interestType,monthlyIncome,repaymentOptions,insurance,description,"Pending",new Date(),ID_user],
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