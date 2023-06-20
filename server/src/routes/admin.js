const express = require('express')
const router = express.Router()
const db = require('../db')
const bankQueries = require('../queries/bank')

router.get("/getBanksPending", (req, res) => {
    const response = bankQueries.getBankPending()

    response.then(response => {
        res.json(response)
    })
})

router.post("/changeStatus", (req, res) => {
    const id = req.body.ID_bank

    const response = bankQueries.updateBankStatus(id)

    response.then(response => {
        res.json(response)
    })
})


module.exports = router