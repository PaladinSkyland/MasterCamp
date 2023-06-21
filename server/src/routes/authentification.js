require('dotenv').config() //Fichier de configuration .env
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db')

const userQueries = require("../queries/user");
const bankQueries = require('../queries/bank');
const e = require('express')

router.post("/login", async (req,res) => {

  //Récupération du mdp et de l'email passé dans le formulaire de login
  const {email, password} = req.body;

  //Récupération du mdp de l'utilisateur dans la BDD


  const request = db.query("SELECT Password, ID_user from Users where Email = ?", [email], (error, results) => {
    if (error) {
      console.log(error);
    } else {
      if(results.length > 0 ){
        if(bcrypt.compareSync(password, results[0].Password)){
          const ID = results[0].ID_user
          const token = jwt.sign({ email, ID }, process.env.secretKey, { expiresIn: '1h' });
          res.json({ token });
        } else {
          res.status(401).json({ error: "Identifiants invalides" });
        }
      } else {
        res.status(401).json({ error: "Identifiants invalides" });
      }
    }
  }
);
});

router.post("/register", async (req, res) => {
  try {
    const { username, userfirstname, email, password, type, bankref } =
      req.body;

    //verification des champs : username, userfirstname, email, password.
    //Si un des champs est vide, renvoyer une réponse d'erreur
    //Si l'email n'est pas sous le bon format, renvoyer une réponse d'erreur
    //Si le mot de passe n'est pas assez fort, renvoyer une réponse d'erreur

    if (!username || !userfirstname || !email || !password) {
      return res
        .status(500)
        .json({ message: "Veuillez remplir tous les champs." });
    }

    if (!email.includes("@")) {
      return res
        .status(500)
        .json({ message: "Veuillez entrer une adresse email valide." });
    }


    //Effectuer la requête à la base de données pour obtenir le mot de passe de l'utilisateur
    //vérification si user déjà existant

    const userAlreadyExists = userQueries.userAlreadyExists(
      email
    );
    userAlreadyExists.then((result) => {

      if (result) {
        // L'utilisateur existe déjà, renvoyer une réponse d'erreur
        return res
          .status(500)
          .json({ message: "L'utilisateur existe déjà." });
      } else {
        /*
        const saltRounds = parseInt(process.env.cryptedKey);
        const salt = bcrypt.genSaltSync(saltRounds);
        const encryptedPassword = bcrypt.hashSync(password, salt);
        */
        const userInsertInto = userQueries.userInsertInto(
          email,
          password,
          username,
          userfirstname,
          type,
          bankref
        );
        //affcier la réponse de userInsertInto
        //userInsertInto est une promesse
        //affichage des erreurs si il y en a
        
        userInsertInto.then((result) => {
          if (result) {
            // L'utilisateur existe déjà, renvoyer une réponse d'erreur
            return res.status(500).json({message : "Utilisateur créé avec succès"})
          }
        });
      }
    });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erreur lors de l'inscription" });
    }
});

router.get("/getBanks", async (req, res) => {
  bankQueries.getBankNames().then((result) => {
    if (result) {
      // L'utilisateur existe déjà, renvoyer une réponse d'erreur
      res.json(result)
    }
  }).catch((error) => {
    console.log(error);
    res.status(500).json({ message: "Erreur lors de la récupération des banques" });
  });

});
  
  module.exports = router