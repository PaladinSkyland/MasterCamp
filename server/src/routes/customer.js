require('dotenv').config() //Fichier de configuration .env
const express = require('express')
const router = express.Router()
const loanQueries = require('../queries/loan')
const bankQueries = require('../queries/bank')

const authenticateToken = require('../middleware/authenticateToken')
const customerAccess = require('../middleware/customerAccess')
const { authorized } = require('../db')


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

    bankQueries
  .getIdBankByName(bankOption)
  .then((bankData) => {
    if (!bankData) {
      bankData = { ID_bank: null };
    }
    const ID_bank = bankData.ID_bank;
    return loanQueries.insertLoan(
      interestRate,
      loanDuration,
      loanAmount,
      interestType,
      monthlyIncome,
      repaymentOptions,
      description,
      ID_user,
      ID_bank
    );
  })
  .then(() => {
    // Traitement après l'insertion du prêt réussie
    res.status(200).json({ success: "Prêt inséré avec succès" });
  })
  .catch((error) => {
    // Gestion des erreurs
    res.status(401).json({ error: "Erreur lors de l'insertion du prêt" });
  });
})

router.get("/getMyLoans", authenticateToken, customerAccess, async (req, res) => {
    const ID_user = req.user.ID_user
    const response = loanQueries.getMyLoans(ID_user)

    response.then(response => {
        res.json(response)
    })
})

router.delete("/deleteLoan", authenticateToken, customerAccess, async (req,res) => {
  const ID_user = req.user.ID_user
  const response = await loanQueries.getMyLoansID(ID_user)

  var authorizedIDs = []
  response.forEach(app => {
      authorizedIDs.push(app.ID_application)
    });

  let toDelete = req.body.ID_application

  if(!authorizedIDs.includes(toDelete)){
    res.sendStatus(401)
  }else{
    loanQueries.deleteLoan(toDelete).catch((error) => {
      console.log(error)
    })
    res.sendStatus(200)
  }

  })

module.exports = router