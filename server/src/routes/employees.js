const express = require ('express')
const router = express.Router()
const authenticateToken = require('../middleware/authenticateToken')
const loanQueries = require ('../queries/loan')
const employeeQueries = require ('../queries/employee')
const loanBankQueries = require('../queries/loanBank')
const employeeAccess = require('../middleware/employeeAccess')

router.get('/allLoans', authenticateToken, employeeAccess, (req,res) => {

    const allNullLoans = loanQueries.getLoansWithoutBank()
    allNullLoans.then(loans => {
        res.json(loans)
    })
})

router.post('/takeRequest', authenticateToken, employeeAccess, (req,res) => {
    const ID_employee = employeeQueries.getEmployeeIDByUserID(req.user.ID_user)
    const ID_application = req.body.ID_application
    const ID_bank = employeeQueries.getBankIDByEmployeeID(ID_employee)

    loanBankQueries.insertLink(ID_bank,ID_application,ID_employee,"Accepted")


})

module.exports = router
