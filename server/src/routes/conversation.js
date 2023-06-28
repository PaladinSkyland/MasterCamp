require('dotenv').config() //Fichier de configuration .env
const express = require('express')
const router = express.Router()
const db = require('../db')
const authenticateToken = require('../middleware/authenticateToken')
const conversationqueries = require('../queries/conversation_message')
const employeequeries = require('../queries/employee');
const e = require('express')

router.get("/getmessage/:conversationId", authenticateToken, async (req,res) => {
  //Récupération des messages pour une conversation donnée
  const userID = req.user.ID_user;
  const conversationId = req.params.conversationId;

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
          return res.status(200).json(result);
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
    res(error);
  });



});


router.post("/sendmessage/:conversationId",authenticateToken, async (req,res) => {
  const userID = req.user.ID_user;
  const conversationId = req.params.conversationId;

  let  who = "";
  if (req.user.UserType == "customer"){
    who = "Client";
  }
  else if (req.user.UserType == "employee"){
    who = "Employee";
  }

  const {message} = req.body;


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
  }).catch((error) => {
    console.error(error);
    res(error);
  });


});

  
module.exports = router