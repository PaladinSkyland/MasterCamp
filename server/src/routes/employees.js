const express = require ('express')
const router = express.Router()
const authenticateToken = require('../middleware/authenticateToken')
const loanQueries = require ('../queries/loan')
const employeeAccess = require('../middleware/employeeAccess')

router.get('/allLoans', authenticateToken, employeeAccess, (req,res) => {

    const allNullLoans = loanQueries.getLoansWithoutBank()
    allNullLoans.then(loans => {
        res.json(loans)
    })
})

module.exports = router
