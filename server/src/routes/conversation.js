require('dotenv').config() //Fichier de configuration .env
const express = require('express')
const router = express.Router()
const db = require('../db')
const authenticateToken = require('../middleware/authenticateToken')
const conversationqueries = require('../queries/conversation_message')
const employeequeries = require('../queries/employee');
const cryptoIDMessage = require('../middleware/cryptoIDMessage')

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
          console.log(decryptedMessages);
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

router.get("/getconversations",authenticateToken, async (req,res) => {
  const userID = req.user.ID_user;
  let employeeID = "";

  employeequeries.getEmployeeIDByUserID(userID).then((result) => {
    if (result) {
      employeeID = result.ID_employee;
    }
    else {
      employeeID = "";
    }
    conversationqueries.getConvByIDuser(userID,employeeID).then((result) => {
      if (result) {
        //cryptage des ID de conversation
        for (let i = 0; i < result.length; i++) {
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
  
module.exports = router