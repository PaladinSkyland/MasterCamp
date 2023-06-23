const express = require ('express')
const router = express.Router()
const authenticateToken = require('../authenticateToken')
const loanQueries = require ('../queries/loan')

router.get('/allLoans', authenticateToken, (req,res) => {

    const allNullLoans = loanQueries.getLoansWithoutBank()
    console.log(allNullLoans)
})

module.exports = router
