require('dotenv').config() //Fichier de configuration .env
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db')

router.post("/login", async (req,res) => {

  //Récupération du mdp et de l'email passé dans le formulaire de login
  const {email, password} = req.body;

  //Récupération du mdp de l'utilisateur dans la BDD


  const request = db.query("SELECT Password, ID_user from Users where Email = ?", [email], (error, results) => {
    if (error) {
      console.log(error);
    } else {
      if(results.length > 0 ){
        if(bcrypt.compare(password, results[0].Password)){
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

    //Effectuer la requête à la base de données pour obtenir le mot de passe de l'utilisateur
    //vérification si user déjà existant
    db.query(
      "SELECT Email FROM Users WHERE Email = ?",
      [email],
      (error, results) => {
        if (error) {
          // Gérer les erreurs qui se produisent lors de l'exécution de la requête ou d'autres opérations asynchrones
          console.error(error);
          res.status(500).json({ message: "Connextion avec la DB impossible" });
        } else {
          // Utiliser les résultats de la requête
          if (results.length > 0) {
            // L'utilisateur existe déjà, renvoyer une réponse d'erreur
            return res
              .status(400)
              .json({ message: "L'utilisateur existe déjà." });
          } else {
            const saltRounds = parseInt(process.env.cryptedKey);
            const salt = bcrypt.genSaltSync(saltRounds);
            const encryptedPassword = bcrypt.hashSync(password, salt);
            if (type == "employee") {
              db.query(
                "INSERT INTO Users SET ?",
                {
                  Email: email,
                  Password: encryptedPassword,
                  Name: username,
                  FirstName: userfirstname,
                },
                (error, results) => {
                  if (error) {
                    // Gérer les erreurs d'insertion dans la base de données
                    console.error(error);
                    return res.status(500).json({
                      message:
                        "Une erreur s'est produite lors de l'enregistrement de l'utilisateur.",
                    });
                  } else {
                    console.log(
                      "Utilisateur inséré avec succès dans la base de données."
                    );
                    console.log("resultat de la requete : ", results.insertId);
                    const ID_user = results.insertId;
                    db.query(
                      "SELECT ID_bank FROM Banks WHERE Name = ?",
                      [bankref],
                      (error, results) => {
                        if (error) {
                          // Gérer les erreurs d'insertion dans la base de données
                          console.error(error);
                          return res.status(500).json({
                            message:
                              "Une erreur s'est produite lors de l'enregistrement de l'utilisateur.",
                          });
                        } else {
                          console.log(
                            "resultat de la requete : ",
                            results[0].ID_bank
                          );
                          const ID_bank = results[0].ID_bank;
                          db.query(
                            "INSERT INTO Employees SET ?",
                            { ID_user: ID_user, ID_bank: ID_bank },
                            (error, results) => {
                              if (error) {
                                // Gérer les erreurs d'insertion dans la base de données
                                console.error(error);
                                return res.status(500).json({
                                  message:
                                    "Une erreur s'est produite lors de l'enregistrement de l'utilisateur.",
                                });
                              } else {
                                console.log(
                                  "Employé inséré avec succès dans la base de données."
                                );
                                res.status(200).json({
                                  message: "Employé enregistré avec succès !",
                                });
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            } else {
              // Enregistrement de l'utilisateur dans la base de données
              db.query(
                "INSERT INTO Users SET ?",
                {
                  Email: email,
                  Password: encryptedPassword,
                  Name: username,
                  FirstName: userfirstname,
                },
                (error, results) => {
                  if (error) {
                    // Gérer les erreurs d'insertion dans la base de données
                    console.error(error);
                    return res.status(500).json({
                      message:
                        "Une erreur s'est produite lors de l'enregistrement de l'utilisateur.",
                    });
                  } else {
                    console.log(
                      "Utilisateur inséré avec succès dans la base de données."
                    );
                    res.status(200).json({
                      message: "Utilisateur enregistré avec succès !",
                    });
                  }
                }
              );
            }
          }
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

router.get("/getBanks", async (req, res) => {
  db.query("SELECT Name FROM Banks", (error, results) => {
    if (error) {
      res.status(500).json({ message: "Connextion avec la DB impossible" });
    } else {
      res.json(results);
    }
  });
});
  
  module.exports = router