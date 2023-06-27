require('dotenv').config() //Fichier de configuration .env
const express = require('express')
const router = express.Router()
const loanQueries = require('../queries/loan')
const bankQueries = require('../queries/bank')

const authenticateToken = require('../middleware/authenticateToken')
const customerAccess = require('../middleware/customerAccess')


const multer = require('multer')
const authenticateToken = require('../authenticateToken')
const fs = require('fs')
const fileQueries = require("../queries/file");
const multer = require('multer')

//set up multer storage configuration
const storage = multer.diskStorage({
    //set the destination folder where the uploaded files will be stored
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    //use the original file name as the stored file name
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
});

//create multer instance with the storage configuration
const upload = multer({ storage });

router.post("/upload", authenticateToken, upload.single('file'), async (req, res) => {
    const file = req.file; //uploaded file
    const type = req.body.fileType; //selected option
    const name = req.body.fileName; //file name
    const userID = req.user.ID; //user ID

    try {
        //inserting into the DB
        const fileInsertInto = fileQueries.fileInsertInto(name, type, file, userID);

        //return the result of the insertion request
        fileInsertInto.then((result) => {
            if (result) {
                fs.unlink(file.path, (error) => {
                    if (error) {
                      console.error('Error deleting temporary file on the server : ', error);
                    } else {
                      console.log('Temporary file on the server deleted successfully');
                    }
                })
                return res.status(200).send("Fichier ajouté avec succès");
            }
        });
    }
    catch (error) {
        res.status(500).json({error: "Erreur lors de l'insertion du fichier"});
    }
})

router.post('/newLoan', authenticateToken, customerAccess, async (req, res) => {
    const {
        interestRate,
        loanDuration,
        loanAmount,
        interestType,
        monthlyIncome,
        repaymentOptions,
        insuranceAndGuarantees,
        bankOption,
        description,
        ID_user
    } = req.body
    const response = await bankQueries.getIdBankByName(bankOption)
    //Si l'utilisateur n'a pas spécifié de banque, alors on insère null, sinon on insère l'ID de la banque spéicifié
    const ID_bank = response ? response.ID_bank : null
    loanQueries.insertLoan(interestRate,loanDuration,loanAmount,interestType,monthlyIncome,repaymentOptions,insuranceAndGuarantees,description,ID_user,ID_bank)
    
})

module.exports = router