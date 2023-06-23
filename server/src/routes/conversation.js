require('dotenv').config() //Fichier de configuration .env
const express = require('express')
const router = express.Router()
const db = require('../db')
const authenticateToken = require('../middleware/authenticateToken')

router.get("/getmessage/:conversationId", authenticateToken, async (req,res) => {
  //Récupération des messages pour une conversation donnée
  const userID = req.user.ID;
  const conversationId = req.params.conversationId;

  db.query(
    "SELECT * FROM Conversations WHERE ID_conversation = ? AND (ID_user = ? OR ID_employee = ?)",
    [conversationId, userID, userID],
    (error, result) => {
      if (error) {
        console.error(error);
      } else {
        // Le résultat contient les enregistrements correspondants
        db.query("SELECT * from Messages where ID_conversation = ?", [conversationId], (error, results) => {
          if (error){
            return res.status(401).json({ error: "invalides" });
          }else {
            return res.status(200).json(results);
          }
        });
      }
    }
  );
});


router.post("/sendmessage/:conversationId",authenticateToken, async (req,res) => {
  const userID = req.user.ID;
  const conversationId = req.params.conversationId;
  console.log("envoie message");
  

  const {message} = req.body;
  const who = "Client";

  db.query(
    "SELECT * FROM Conversations WHERE ID_conversation = ? AND (ID_user = ? OR ID_employee = ?)",
    [conversationId, userID, userID],
    (error, result) => {
      if (error) {
        console.error(error);
      } else {
          //Récupération des messages pour une conversation donnée
          const conversationId = req.params.conversationId;
          db.query("INSERT INTO Messages (Description, Sender, ID_conversation) VALUES (?,?,?);", 
          [message,who,conversationId ], (error, results) => {
            if (error){
              return res.status(401).json({ error: "invalides", ok: false });
            }else {
              return res.status(200).json({ ok: true });
            }
          });
        }
    }
  );
});

  
module.exports = router