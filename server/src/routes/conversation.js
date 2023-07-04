require('dotenv').config() //Fichier de configuration .env
const express = require('express')
const router = express.Router()
const db = require('../db')
const crypto = require('crypto')
const fs = require('fs')
const authenticateToken = require('../middleware/authenticateToken')
const conversationqueries = require('../queries/conversation_message')
const employeequeries = require('../queries/employee');
const cryptoIDMessage = require('../middleware/cryptoIDMessage')
const customerAccess = require('../middleware/customerAccess')
const employeeAccess = require('../middleware/employeeAccess')
const fileQueries = require('../queries/file')
const contratqueries = require('../queries/contrat')

router.get("/getmessage/:conversationId", authenticateToken, async (req,res) => {
  //Récupération des messages pour une conversation donnée
  const userID = req.user.ID_user;
  //Décryptage de l'ID de la conversation
  let conversationId = "";
  try {
  const encryptedConversationId = req.params.conversationId;
  conversationId = cryptoIDMessage.decryptConversationId(encryptedConversationId);

  } catch (error) {
    return res.status(401).json({ error: "invalides" });
  }

  let employeeID = "";

  employeequeries.getEmployeeIDByUserID(userID).then((result) => {
    if (result) {
      employeeID = result.ID_employee;
    }
    else {
      employeeID = "";
    }
    conversationqueries.getConvByIDandIDuser(conversationId,userID,employeeID).then((result) => {
      if (result) {
        conversationqueries.getMessageByIDconv(conversationId).then((result) => {
          const encryptedMessages = result;
          // Parcourir tous les messages
          const decryptedMessages = encryptedMessages.map((encryptedMessage) => {
            const decryptedContent = cryptoIDMessage.decryptMessage(encryptedMessage.Content, encryptedMessage.iv);
            return {
              Content: decryptedContent,
              Creation_date: encryptedMessage.Creation_date,
              Sender: encryptedMessage.Sender
            };
          });
          return res.status(200).json(decryptedMessages);
          //return res.status(200).json(result);
        }).catch((error) => {
          return res.status(401).json({ error: "invalides" });
        })
      }
      
    })
    .catch((error) => {
      return res.status(401).json({ error: "invalides" });
    })

  }).catch((error) => {
    console.error(error);
    return res.status(401).json({ error: "invalides" });
  });



});


router.post("/sendmessage/:conversationId",authenticateToken, async (req,res) => {
  const userID = req.user.ID_user;
  //Décryptage de l'ID de la conversation
  let conversationId = "";
  try {
  const encryptedConversationId = req.params.conversationId;
  conversationId = cryptoIDMessage.decryptConversationId(encryptedConversationId);

  } catch (error) {
    return res.status(401).json({ error: "invalides" });
  }

  let  who = "";
  if (req.user.UserType == "customer"){
    who = "Client";
  }
  else if (req.user.UserType == "employee"){
    who = "Employee";
  }

  const {message} = req.body;
  if (message == ""){
    return res.status(401).json({ error: "message vide" });
  }
  const { encryptedMessage, iv } = cryptoIDMessage.encryptMessage(message);


  let employeeID = "";

  employeequeries.getEmployeeIDByUserID(userID).then((result) => {
    if (result) {
      employeeID = result.ID_employee;
    }
    else {
      employeeID = "";
    }
    conversationqueries.getConvByIDandIDuser(conversationId,userID,employeeID).then((result) => {
      if (result) {
        conversationqueries.insertMessage(encryptedMessage,who,conversationId,iv).then((result) => {
          if (result){
            return res.status(200).json({ ok: true });
          }
        }).catch((error) => {
          
          return res.status(401).json({ error: "invalides" });
        })
  
      }
    }).catch((error) => {
      return res.status(401).json({ error: "Conversation not found" });
    })
  }).catch((error) => {
    console.error(error);
    res(error);
  });


});

router.post("/getconversations", authenticateToken, async (req,res) => {
  const userID = req.user.ID_user;
  let employeeID = "";
  const loanID = req.body.loanID
  employeequeries.getEmployeeIDByUserID(userID).then((result) => {
    if (result) {
      employeeID = result.ID_employee;
    }
    else {
      employeeID = "";
    }
    conversationqueries.getConvByIDuserandIDLoan(userID,employeeID,loanID).then((result) => {
      if (result) {
        //cryptage des ID de conversation
        for (let i = 0; i < result.length; i++) {
          delete result[i].ID_employee;
          delete result[i].ID_user;
          result[i].ID_conversation = cryptoIDMessage.encryptConversationId(result[i].ID_conversation);
        }
        return res.status(200).json(result);
      }
    }).catch((error) => {
      return res.status(401).json({ error: "invalides" });
    })
  }).catch((error) => {
    console.error(error);
    res(error);
  });

});

router.get("/getMyDoc/:conversationId", authenticateToken, customerAccess,async (req,res) => {
  //Récupération des messages pour une conversation donnée
  const userID = req.user.ID_user;
  
  const response = conversationqueries.getMyDoc(userID)

  response.then(response => {
    res.json(response)
  })

})
  
router.delete("/deleteFC/:conversationId", authenticateToken, customerAccess ,async (req,res) => {
  const id_file = req.body.ID_file

  //Décryptage de l'ID de la conversation
  let conversationId = "";
  try {
  const encryptedConversationId = req.params.conversationId;
  conversationId = cryptoIDMessage.decryptConversationId(encryptedConversationId);

  } catch (error) {
    return res.status(401).json({ error: "invalides" });
  }

  const response = conversationqueries.deleteFC(id_file, conversationId)

  response.then(response => {
    res.json(response)
  })
})

router.post("/createFC/:conversationId", authenticateToken, customerAccess ,async (req,res) => {
  const id_file = req.body.ID_file

  //Décryptage de l'ID de la conversation
  let conversationId = "";
  try {
  const encryptedConversationId = req.params.conversationId;
  conversationId = cryptoIDMessage.decryptConversationId(encryptedConversationId);

  } catch (error) {
    return res.status(401).json({ error: "invalides" });
  }

  const response = conversationqueries.createFC(id_file, conversationId)

  response.then(response => {
    res.json(response)
  })
})

router.get("/getMyVisibleDoc/:conversationId", authenticateToken, employeeAccess,async (req,res) => {
  //Décryptage de l'ID de la conversation
  let conversationId = "";
  try {
    const encryptedConversationId = req.params.conversationId;

    conversationId = cryptoIDMessage.decryptConversationId(encryptedConversationId);


  } catch (error) {
    return res.status(401).json({ error: "invalides" });
  }

  const response = conversationqueries.getVisibleDoc(conversationId)

  response.then(response => {
    res.json(response)
  })

})

router.get('/download/:fileType/:conversationId', authenticateToken, async (req, res) => {
  //get the encryption key and the IV from the .env file 
  const cipherKey = Buffer.from(process.env.cipherKey, 'hex');
  const iv = Buffer.from(process.env.IV, 'hex');

  //create a decipher using the encryption key
  const decipher = crypto.createDecipheriv('aes-256-cbc', cipherKey, iv);
  let conversationId = "";
  try {
    const encryptedConversationId = req.params.conversationId;

    conversationId = cryptoIDMessage.decryptConversationId(encryptedConversationId);


  } catch (error) {
    return res.status(401).json({ error: "invalides" });
  }
  const userid = await conversationqueries.getCustomerID(conversationId)
  try {
      //get file path with the user ID and the file type
      const response = fileQueries.SelectFilePathByFileTypeAndUserID(userid[0].ID_user, req.params.fileType);

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

router.get("/getcontract/:conversationId", authenticateToken, async (req,res) => {
  const userID = req.user.ID_user;
  //Décryptage de l'ID de la conversation
  let conversationId = "";
  try {
  const encryptedConversationId = req.params.conversationId;
  conversationId = cryptoIDMessage.decryptConversationId(encryptedConversationId);

  } catch (error) {
    return res.status(401).json({ error: "invalides" });
  }

  let employeeID = "";

  employeequeries.getEmployeeIDByUserID(userID).then((result) => {
    if (result) {
      employeeID = result.ID_employee;
    }
    else {
      employeeID = "";
    }
    conversationqueries.getConvByIDandIDuser(conversationId,userID,employeeID).then((result) => {
      if (result) {
        contratqueries.getContratByIDCONV(conversationId).then((result) => {
          delete result[0].ID_conversation;
          delete result[0].ID_bank;
          res.status(200).json(result[0]);
        }).catch((error) => {
          return res.status(401).json({ error: "invalides" });
        })
      }
    })
    .catch((error) => {
      return res.status(401).json({ error: "invalides" });
    })

  }).catch((error) => {
    console.error(error);
    return res.status(401).json({ error: "invalides" });
  });

});

router.post("/sendcontrat/:conversationId", authenticateToken, employeeAccess,  async (req,res) => {
  const userID = req.user.ID_user;
  //Décryptage de l'ID de la conversation
  let conversationId = "";
  try {
  const encryptedConversationId = req.params.conversationId;
  conversationId = cryptoIDMessage.decryptConversationId(encryptedConversationId);

  } catch (error) {
    return res.status(401).json({ error: "invalides" });
  }

  let employeeID = "";

  //Récupération du body de manière sécurisée
  //Le body doit contenir les champs suivants et que les champs suivants: Amount, InterestRate, Duration, InterestType, MonthlyIncome, RepaymentOptions, Description, FeesAndCosts, InsuranceAndGuarantees
  const {Amount, InterestRate, Duration, InterestType, MonthlyIncome, RepaymentOptions, Description, FeesAndCosts, InsuranceAndGuarantees} = req.body;
  const Status = "Progress"
  employeequeries.getEmployeeIDByUserID(userID).then((result) => {
    if (result) {
      employeeID = result.ID_employee;
    }
    else {
      employeeID = "";
    }
    //ID_suer = ""
    ID_user = "";
    conversationqueries.getConvByIDandIDuser(conversationId,userID,employeeID).then((result) => {
      if (result) {
        contratqueries.modifyContratByIDCONV(conversationId,{Amount, InterestRate, Duration, InterestType, MonthlyIncome, RepaymentOptions, Description, FeesAndCosts, InsuranceAndGuarantees,Status}).then((result) => {
          if (result){
            return res.status(200).json({ ok: true });
          }
        }
        ).catch((error) => {
          return res.status(401).json({ error: "invalides" });
        })
      }
    })
    .catch((error) => {
      return res.status(401).json({ error: "invalides" });
    })

  }).catch((error) => {
    console.error(error);
    return res.status(401).json({ error: "invalides" });
  });

});



router.post("/statuscontract/:conversationId", authenticateToken,  async (req,res) => {
  const userID = req.user.ID_user;
  //Décryptage de l'ID de la conversation
  let conversationId = "";
  try {
  const encryptedConversationId = req.params.conversationId;
  conversationId = cryptoIDMessage.decryptConversationId(encryptedConversationId);

  } catch (error) {
    return res.status(401).json({ error: "invalides" });
  }

  let employeeID = "";

  //Récupération du body de manière sécurisée
  //Le body doit contenir les champs suivants et que les champs suivants: Amount, InterestRate, Duration, InterestType, MonthlyIncome, RepaymentOptions, Description, FeesAndCosts, InsuranceAndGuarantees
  const status = req.body.Status;


  if (status == "Canceled" || status == "Progress" ){
    employeequeries.getEmployeeIDByUserID(userID).then((result) => {
      if (result) {
        employeeID = result.ID_employee;
      }
      else {
        employeeID = "";
      }
      if (status == "Prgoress"){
        userID = "";
      }
      conversationqueries.getConvByIDandIDuser(conversationId,userID,employeeID).then((result) => {
        if (result) {
          contratqueries.modifyStatusContratByIDCONV(conversationId, status).then((result) => {
            if (result){
              return res.status(200).json({ ok: true });
            }
          }
          ).catch((error) => {
            return res.status(401).json({ error: "invalides" });
          })
        }
      })
      .catch((error) => {
        return res.status(401).json({ error: "invalides" });
      })
  }).catch((error) => {
    console.log(error);
    return res.status(401).json({ error: "invalides" });
  });


  
  } else if (status == "Accepted"){
    conversationqueries.getConvByIDandIDuser(conversationId,userID,employeeID).then((result) => {
      if (result) {
        contratqueries.modifyStatusContratByIDCONV(conversationId, status).then((result) => {
          if (result){
            return res.status(200).json({ ok: true });
          }
        }
        ).catch((error) => {
          return res.status(401).json({ error: "invalides" });
        })
      }
    })
    .catch((error) => {
      return res.status(401).json({ error: "invalides" });
    })

  }

});


module.exports = router