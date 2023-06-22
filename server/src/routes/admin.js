const express = require('express')
const router = express.Router()
const db = require('../db')
const bankQueries = require('../queries/bank')
const employeeQueries = require('../queries/employee')

router.get("/getBanksPending", (req, res) => {
    const response = bankQueries.getBankPending()

    response.then(response => {
        res.json(response)
    })
})

router.get("/getBanksAccepted", (req, res) => {
    const response = bankQueries.getBankAccepted()

    response.then(response => {
        res.json(response)
    })
})

router.post("/changeBankStatus", (req, res) => {
    const id = req.body.ID_bank

    const response = bankQueries.updateBankStatus(id)

    response.then(response => {
        res.json(response)
    })
})

router.delete("/deleteBank", (req, res) => {
    const id = req.body.ID_bank

    const response = bankQueries.deleteBankByID(id)
    response.then(response => {
        res.json(response)
    })
})

router.get("/getEmployeesPending", (req, res) => {
    const response = employeeQueries.getEmployeePending()

    response.then(response => {
        res.json(response)
    })
})

router.get("/getEmployeesAccepted", (req, res) => {
    const response = employeeQueries.getEmployeeAccepted()

    response.then(response => {
        res.json(response)
    })
})

router.post("/changeEmployeeStatus", (req, res) => {
    const id = req.body.ID_employee

    const response = employeeQueries.updateEmployeeStatus(id)

    response.then(response => {
        res.json(response)
    })
})

router.delete("/deleteEmployee", (req, res) => {
    const id = req.body.ID_employee

    const response = employeeQueries.deleteEmployeeByID(id)
    response.then(response => {
        res.json(response)
    })
})

module.exports = router