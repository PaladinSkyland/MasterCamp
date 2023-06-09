const express = require('express')
const router = express.Router()
const bankQueries = require('../queries/bank')
const employeeQueries = require('../queries/employee')
const authenticateToken = require('../middleware/authenticateToken')
const adminAccess = require('../middleware/adminAccess')


router.get("/getBanksPending", authenticateToken, adminAccess, (req, res) => {
    const response = bankQueries.getBankPending()

    response.then(response => {
        res.json(response)
    })
})

router.get("/getBanksAccepted", authenticateToken, adminAccess, (req, res) => {
    const response = bankQueries.getBankAccepted()

    response.then(response => {
        res.json(response)
    })
})

router.post("/changeBankStatus", authenticateToken, adminAccess, (req, res) => {
    const id = req.body.ID_bank

    const response = bankQueries.updateBankStatus(id)

    response.then(response => {
        res.json(response)
    })
})

router.delete("/deleteBank", authenticateToken, adminAccess, (req, res) => {
    const id = req.body.ID_bank

    const response = bankQueries.deleteBankByID(id)
    response.then(response => {
        res.json(response)
    })
})

router.get("/getEmployeesPending",authenticateToken, adminAccess, (req, res) => {
    const response = employeeQueries.getEmployeePending()

    response.then(response => {
        res.json(response)
    })
})

router.get("/getEmployeesAccepted",authenticateToken, adminAccess, (req, res) => {
    const response = employeeQueries.getEmployeeAccepted()

    response.then(response => {
        res.json(response)
    })
})

router.post("/changeEmployeeStatus",authenticateToken, adminAccess, (req, res) => {
    const id = req.body.ID_employee

    const response = employeeQueries.updateEmployeeStatus(id)

    response.then(response => {
        res.json(response)
    })
})

router.delete("/deleteEmployee",authenticateToken, adminAccess, (req, res) => {
    const id = req.body.ID_employee

    const response = employeeQueries.deleteEmployeeByID(id)
    response.then(response => {
        res.json(response)
    })
})

module.exports = router