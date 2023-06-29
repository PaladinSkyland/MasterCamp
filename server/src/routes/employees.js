const express = require ('express')
const router = express.Router()
const authenticateToken = require('../middleware/authenticateToken')
const loanQueries = require ('../queries/loan')
const employeeQueries = require ('../queries/employee')
const loanBankQueries = require('../queries/loanBank')
const employeeAccess = require('../middleware/employeeAccess')

router.get('/allLoans', authenticateToken, employeeAccess, async (req,res) => {

    //Récupération de ID_Bank de l'employé
    const response1 = await employeeQueries.getBankIDbyUserID(req.user.ID_user)
    const ID_bank = response1.ID_bank

    //Récupérer Les ID_app traités par cette banque
    const response2 = await loanBankQueries.getAppProcessedByBankID(ID_bank)
    
    //Il faudra donc les enlever des requêtes : 
    let toExclude = [];
    response2.forEach(app => {
        toExclude.push(app.ID_application);
    });
    
    //Mettre dans une forme correcte pour pouvoir l'ajouter à la requête SQL
    let sqlToAdd = toExclude.join(",");

    //Selectionner les ID app qui ne sont pas dans ceux du dessus
    const allNullLoans = loanQueries.getLoansWithoutBank(sqlToAdd)
    allNullLoans.then(loans => {
        res.json(loans)
    })
})

router.post('/takeRequest', authenticateToken, employeeAccess, async (req,res) => {
    const responseEmployee = await employeeQueries.getEmployeeIDByUserID(req.user.ID_user)
    const ID_employee = responseEmployee.ID_employee

    const ID_application = req.body.ID_application
    const responseBank = await employeeQueries.getBankIDByEmployeeID(ID_employee)
    
    const ID_bank = responseBank.ID_bank
    const status = req.body.status

    loanBankQueries.insertLink(ID_bank,ID_application,ID_employee,status)
    res.sendStatus(200)


})

router.get('/myBankLoans', authenticateToken, employeeAccess, async (req,res) => {

    //Récupération de ID_Bank de l'employé
    const response1 = await employeeQueries.getBankIDbyUserID(req.user.ID_user)
    const ID_bank = response1.ID_bank

    //Récupérer Les ID_app traités par cette banque
    const response2 = await loanBankQueries.getAppProcessedByBankID(ID_bank)
    
    //Il faudra donc les enlever des requêtes : 
    let toExclude = [];
    response2.forEach(app => {
        toExclude.push(app.ID_application);
    });
    
    //Mettre dans une forme correcte pour pouvoir l'ajouter à la requête SQL
    let sqlToAdd = toExclude.join(",");


    //Selectionner les ID app qui ne sont pas dans ceux du dessus
    const myBankLoans = loanQueries.getLoansWithBank(ID_bank,sqlToAdd)
    myBankLoans.then(loans => {
        res.json(loans)
    })
})

module.exports = router
