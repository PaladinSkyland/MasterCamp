require('dotenv').config() //Fichier de configuration .env
const express = require('express')
const router = express.Router()
const loanQueries = require('../queries/loan')
const authenticateToken = require('../authenticateToken')


// const multer = require('multer')

// const upload = multer({
//     dest: 'uploads/',
//     limits: {fileSize: 50 * 1024 * 1024}
// });

router.post("/upload", authenticateToken, /*upload.single('filedata'),*/ async (req, res) => {
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

router.post('/newLoan', authenticateToken, (req, res) => {
    const {
        interestRate,
        loanDuration,
        loanAmount,
        //feesAndCosts,
        interestType,
        monthlyIncome,
        repaymentOptions,
        insuranceAndGuarantees,
        //bankOption,
        description,
        ID_user
    } = req.body
    loanQueries.insertLoan(interestRate,loanDuration,loanAmount,interestType,monthlyIncome,repaymentOptions,insuranceAndGuarantees,description,ID_user)
    
})

module.exports = router