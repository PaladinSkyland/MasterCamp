require('dotenv').config() //Fichier de configuration .env
const express = require('express')
const router = express.Router()
const db = require('../db')
const authenticateToken = require('../middleware/authenticateToken')
const conversationqueries = require('../queries/conversation_message')

router.get("/getmessage/:conversationId", authenticateToken, async (req,res) => {
  //Récupération des messages pour une conversation donnée
  const userID = req.user.ID;
  const conversationId = req.params.conversationId;

  conversationqueries.getConvByIDandIDuser(conversationId,userID).then((result) => {
    if (result) {
      conversationqueries.getMessageByIDconv(conversationId).then((result) => {
        return res.status(200).json(result);
      }).catch((error) => {
        return res.status(401).json({ error: "invalides" });
      })
    }
    
  })
  .catch((error) => {
    return res.status(401).json({ error: "invalides" });
  })
});


router.post("/sendmessage/:conversationId",authenticateToken, async (req,res) => {
  const userID = req.user.ID;
  const conversationId = req.params.conversationId;
  console.log("envoie message");
  

  const {message} = req.body;
  const who = "Client";

  conversationqueries.getConvByIDandIDuser(conversationId,userID).then((result) => {
    if (result) {
      conversationqueries.insertMessage(message,who,conversationId).then((result) => {
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
});

  
module.exports = router