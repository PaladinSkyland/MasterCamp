require('dotenv').config() //Fichier de configuration .env
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db')

const userQueries = require("../queries/user");
const bankQueries = require('../queries/bank');

router.post("/login", async (req, res) => {

  //Récupération du mdp et de l'email passé dans le formulaire de login
  const { email, password } = req.body;

  try {
    //On récupère les infos (mdp, user ID et mdp crypté correspondant aux infos donnés)
    const userCredentials = await checkCredentials(email, password)
    if (userCredentials !== null) {

      const ID_user = userCredentials.ID_user
      const UserType = userCredentials.UserType
      
      //Check du type d'user
      if (userCredentials.UserType === "employee") {

        //On récupère le status de l'employée
        const statusEmployee = await getStatusEmployee(ID_user)
        
        //On check s'il est accepté ou non
        if(statusEmployee.Status === "Pending"){
          res.status(401).json({ error: "Compte non vérifié" })
          return
        }
      }

      if (bcrypt.compareSync(password, userCredentials.Password)) {
        const token = jwt.sign({ email, ID_user, UserType }, process.env.secretKey, { expiresIn: '1h' });
        res.json({ token });
      } else {
        res.status(401).json({ error: "Identifiants invalides" });
      }
    } else {
      res.status(401).json({ error: "Identifiants invalides" });
    }
  } catch {
    res.status(401).json({ error: "User not found" });
    res.end();
  }
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
            return res.status(500).json({ message: "Utilisateur créé avec succès" })
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
      res.json(result)
    }
  }).catch((error) => {
    console.log(error);
    res.status(500).json({ message: "Erreur lors de la récupération des banques" });
  });

});

function checkCredentials(email, password) {
  return new Promise((resolve, reject) => {
    db.query("SELECT Password, ID_user, UserType FROM Users WHERE Email = ?", [email], (error, result) => {
      if (error) {
        reject(error);
      } else {
        if (result.length > 0) {
          resolve(result[0]);
        } else {
          reject(new Error("Utilisateur non trouvé"));
        }
      }
    });
  });
}

function getStatusEmployee(ID_user) {
  return new Promise((resolve, reject) => {
    db.query("SELECT Status FROM Employees WHERE ID_user = ?", [ID_user], (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result[0])
      }
    }
    )
  }
  )
}


module.exports = router