require('dotenv').config() //Fichier de configuration .env
//const jwt = require('jsonwebtoken')
const express = require('express')
const db = require('./src/db') //Chemin vers les infos de connexion à la db
const app = express()
const port = 5000

app.use(express.json()); 



app.get("/api", (req,res) => {
    console.log("/api")
    res.send({"test": "lucas"})
})


app.post("/register", async (req, res) => {
    try {
    console.log("register :")
    //res.send({"test": "lalala"})
    const {username, userfirstname, email, password} = req.body;
    console.log(email);
    
      // Effectuer la requête à la base de données pour obtenir le mot de passe de l'utilisateur
      
      const result = await db
        .select("Email")
        .from("Users")
        .where({ Email: email });
    
      if (result.length > 0) {
        const user = result[0];
        // L'utilisateur existe déjà, renvoyer une réponse d'erreur
        return res.status(400).json({ message: "L'utilisateur existe déjà." });
      }
      else {
        // Enregistrement de l'utilisateur dans la base de données
        await db("Users").insert({
          Email: email,
          Password: password,
          Name: username,
          FirstName: userfirstname
        }).then(() => {
          console.log('Utilisateur inséré avec succès dans la base de données.');
          res.status(200).json({ message: "Utilisateur enregistré avec succès !" });
        })
        .catch((error) => {
          console.error(error);
          // Gérer les erreurs d'insertion dans la base de données
          return res.status(500).json({ message: "Une erreur s'est produite lors de l'enregistrement de l'utilisateur." });
        });;


      }

    } catch (error) {
      console.error(error);
      // Gérer les erreurs qui se produisent lors de l'exécution de la requête ou d'autres opérations asynchrones
      res.status(500).json({ message: "Connextion avec la DB impossible" });
    }
  });

app.listen(port, () => {
    console.log("listening on port", port)
})