require('dotenv').config() //Fichier de configuration .env
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db')

const userQueries = require("../queries/user");
const bankQueries = require('../queries/bank');

router.get("/getmessage", async (req,res) => {
  //Récupération des messages pour une conversation donnée
  const idconversation = 1;
  db.query("SELECT * from Messages where ID_conversation = ?", [idconversation], (error, results) => {
    if (error){
      return res.status(401).json({ error: "invalides" });
    }else {
      return res.status(200).json(results);
    }
  });
});


router.post("/sendmessage", async (req,res) => {
  console.log("envoie message");

  const {message} = req.body;
  const who = "Client";

  //Récupération des messages pour une conversation donnée
  const idconversation = 1;
  db.query("INSERT INTO Messages (Description, Sender, ID_conversation) VALUES (?,?,?);", 
  [message,who,idconversation], (error, results) => {
    if (error){
      return res.status(401).json({ error: "invalides", ok: false });
    }else {
      return res.status(200).json({ error: "bien", ok: true });
    }
  });
});

  
module.exports = router