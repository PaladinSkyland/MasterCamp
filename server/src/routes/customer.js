require('dotenv').config() //Fichier de configuration .env
const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const crypto = require('crypto')

const loanQueries = require('../queries/loan')
const bankQueries = require('../queries/bank')
const fileQueries = require("../queries/file")

const authenticateToken = require('../middleware/authenticateToken')
const customerAccess = require('../middleware/customerAccess')

//set up multer storage configuration
const storage = multer.diskStorage({
    //set the destination folder where the uploaded files will be stored
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    //use the original file name as the stored file name
    filename: (req, file, cb) => {
      cb(null, req.body.fileName);
    },
});

//create multer instance with the storage configuration
const upload = multer({ storage });

router.post("/upload", authenticateToken, customerAccess, upload.single('file'), async (req, res) => {
    const file = req.file; //uploaded file
    const type = req.body.fileType; //selected option
    const name = req.body.fileName; //file name
    const userID = req.user.ID_user; //user ID

    const fileExist = fileQueries.CheckIfFileExist(type, userID);

    fileExist.then((response) => {
        if (response.length == 0)
            fileQueries.DeleteFile(type, userID);
    });

    //get the file to cipher
    const inputFile = "uploads/" + name;
    const inputBuffer = fs.readFileSync(inputFile);

    //get the encryption key and the IV from the .env file 
    const cipherKey = Buffer.from(process.env.cipherKey, 'hex');
    const iv = Buffer.from(process.env.IV, 'hex');

    //create a cipher using the encryption key
    const cipher = crypto.createCipheriv('aes-256-cbc', cipherKey, iv);

    //cipher the file contents
    const cipheredBuffer = Buffer.concat([cipher.update(inputBuffer), cipher.final()]);

    if (!fs.existsSync("files/" + userID))
    try {
        fs.mkdir('files/' + userID, { recursive: true });
        /*
        fs.mkdir("files/" + userID, { recursive: true }, (error) => {
            if (error) {
                console.error('Erreur création du répertoire utilisateur', error);
            } else {
                console.log('Création du répertoire utilisateur');
            }
        });
        */
    }
    catch {
        console.error('Upload : Erreur création du répertoire utilisateur', error);
    }

    //write the ciphered contents to a new file
    const outputFile = "files/" + userID + "/" + name;
    try {
        fs.writeFileSync(outputFile, cipheredBuffer);
    }
    catch {
        console.error('Upload : Erreur écriture du fichier chiffré')
    }
    
    try {
        //inserting into the DB
        const fileInsertInto = fileQueries.fileInsertInto(name, type, outputFile, userID);

        //return the result of the insertion request
        fileInsertInto.then((result) => {
            if (result) {
                fs.unlink(file.path, (error) => {
                    if (error) {
                      console.error('Upload : Erreur supression du fichier temporaire : ', error);
                    } 
                    else {
                      console.log('Upload : Fichier temporaire supprimé');
                    }
                })
                return res.status(200).send("Fichier ajouté avec succès");
            }
        });
    }
    catch (error) {
        res.status(500).json({error: "Erreur lors de l'insertion du fichier"});
    }
});

router.get('/files', authenticateToken, customerAccess, async (req, res) => {
    //get the files by ID user
    const response = fileQueries.SelectFileByUserID(req.user.ID_user);

    response.then(response => {
       res.json(response);
    });
});

router.get('/download/:fileType', authenticateToken, customerAccess, async (req, res) => {
    //get the encryption key and the IV from the .env file 
    const cipherKey = Buffer.from(process.env.cipherKey, 'hex');
    const iv = Buffer.from(process.env.IV, 'hex');

    //create a decipher using the encryption key
    const decipher = crypto.createDecipheriv('aes-256-cbc', cipherKey, iv);

    try {
        //get file path with the user ID and the file type
        const response = fileQueries.SelectFilePathByFileTypeAndUserID(req.user.ID_user, req.params.fileType);

        response.then((response) => {
            //decipher the file
            //get the file to decipher
            const inputFile = response[0].File_path;
            const inputBuffer = fs.readFileSync(inputFile);

            //decipher the file contents
            const decipheredBuffer = Buffer.concat([decipher.update(inputBuffer), decipher.final()]);

            //write the deciphered contents to a new file
            if (!fs.existsSync("downloads/" + req.user.ID_user))
                try {
                    fs.mkdirSync('downloads/' + req.user.ID_user, { recursive: true });
                }
                catch {
                    console.error('Download : Erreur création du répertoire utilisateur');
                }
            
            const outputFile = "downloads/" + req.user.ID_user + "/" + response[0].Title;
            try {
                fs.writeFileSync(outputFile, decipheredBuffer)
            }
            catch (err) {
                console.error('Download : Erreur écriture du fichier déchiffré : ', err);
            }

            //send file to download
            //set the appropriate headers for the file download
            res.setHeader('Content-Type', 'application/octet-stream');
            res.setHeader('Content-Disposition', `attachment; filename="${response[0].Title}"`);

            //stream the file to the response
            const fileStream = fs.createReadStream(outputFile);
            fileStream.pipe(res);

            //delete the temporary file after sending it
            fileStream.on('end', () => {
                fs.unlink(outputFile, (error) => {
                    if (error) {
                        console.error('Download : Erreur suppression du fichier temporaire : ', error);
                    } else {
                        console.log('Download : Fichier temporaire supprimé');
                    }
                });
            });
        })
    }
    catch {
        res.status(500).json({error: "Erreur lors de la récupération du fichier"});
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
        bankOption,
        description,
        ID_user
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