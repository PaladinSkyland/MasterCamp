require('dotenv').config() //Fichier de configuration .env
const express = require('express')
const router = express.Router()
const loanQueries = require('../queries/loan')
const bankQueries = require('../queries/bank')

const authenticateToken = require('../middleware/authenticateToken')
const customerAccess = require('../middleware/customerAccess')


// const multer = require('multer')

// const upload = multer({
//     dest: 'uploads/',
//     limits: {fileSize: 50 * 1024 * 1024}
// });

router.post("/upload", authenticateToken, customerAccess, /*upload.single('filedata'),*/ async (req, res) => {
    const fileType = req.body.fileType;
    const file = req.body.file;

    console.log("req.body : ", req.body);
    console.log("file type : ", fileType, " | file : ", file[0].name);

    if (fileType == "") {
        res.status(401).json({error: "Pas de type de fichier choisi"})
    }
    else {
        res.status(200).json({message: "upload success"})
    }
})

router.post('/newLoan', authenticateToken, customerAccess, async (req, res) => {
    const ID_user = req.user.ID_user
    const {
        interestRate,
        loanDuration,
        loanAmount,
        interestType,
        monthlyIncome,
        repaymentOptions,
        bankOption,
        description,
    } = req.body
    const response = await bankQueries.getIdBankByName(bankOption)
    //Si l'utilisateur n'a pas spécifié de banque, alors on insère null, sinon on insère l'ID de la banque spéicifié
    const ID_bank = response ? response.ID_bank : null
    loanQueries.insertLoan(interestRate,loanDuration,loanAmount,interestType,monthlyIncome,repaymentOptions,description,ID_user,ID_bank)
    
})

router.get("/getMyLoans", authenticateToken, customerAccess, async (req, res) => {
    const id = req.user.ID_user
    const response = loanQueries.getMyLoans(id)

    response.then(response => {
        res.json(response)
    })
})

module.exports = router