const express = require ('express')
const router = express.Router()
const authenticateToken = require('../middleware/authenticateToken')
const loanQueries = require ('../queries/loan')
const employeeQueries = require ('../queries/employee')
const loanBankQueries = require('../queries/loanBank')
const userQueries = require('../queries/user')
const employeeAccess = require('../middleware/employeeAccess')
const conversationQueries = require('../queries/conversation_message')

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

router.put('/updateLoanStatus', authenticateToken, employeeAccess, async (req, res) => {
    const id = req.body.ID_application
    await loanQueries.updateLoanStatus(id)
    res.sendStatus(200)
})

router.post('/createConversation', authenticateToken, employeeAccess, async (req, res) => {
    try {
        const id_userEmployee = req.user.ID_user;
        const infoEmployee = await employeeQueries.getEmployeeIDByUserID(id_userEmployee);
        const infoBank = await employeeQueries.getBankIDByEmployeeID(infoEmployee.ID_employee);
        const accessibleLoan = await loanQueries.getAccessibleLoan(infoBank.ID_bank)
        let tab = [];
        accessibleLoan.forEach(app => {
            tab.push(app.ID_application);
        })
        if (!tab.includes(req.body.ID_application)) {
            res.sendStatus(401)
        } else {
            const clientInfo = await loanQueries.getUserLastNameAndIDByIDLoan(req.body.ID_application)
            const employeeLastName = await userQueries.getLastNameByID(id_userEmployee)
            const title =  "Conversation entre "+ clientInfo[0].LastName + " et " + employeeLastName[0].LastName
            conversationQueries.createConversation(infoEmployee.ID_employee, title, clientInfo[0].ID_user, req.body.ID_application)
            res.sendStatus(200)

        }
    } catch (error) {
        console.log(error)
    }
})

router.get('/getMyLoans', authenticateToken, employeeAccess, async (req, res) => {
    const id = req.user.ID_user
    const id_employee = await employeeQueries.getEmployeeIDByUserID(id)
    const response = employeeQueries.getEmployeeLoans(id_employee.ID_employee)

    response.then(response => {
        res.json(response)
    })
})

module.exports = router
