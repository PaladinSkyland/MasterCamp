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

/*
app.post("/register", (req,res) => {
    console.log("/register")
    res.send({"test": "lucas"})
})

/*
app.post("/register",  async (req,res) => {

    
    //Récupération du mdp et de l'username passé dans le formulaire de login
    const {username, password} = req.body;

    //Récupération du mdp de l'utilisateur dans la BDD
    const request = await db.select("Password").from("utilisateur").where({Email_utilisateur: username})

    if(request.length > 0 ){
      if(password === request[0].Password){
        const token = jwt.sign({ username }, process.env.secretKey, { expiresIn: '1h' });
        console.log({token})
        res.json({ token });
      }else {
        res.status(401).json({ error: 'Identifiants invalides' });
      }

      
    }
    
})*/

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
      
  
      // Continuer avec le reste de la logique d'enregistrement de l'utilisateur
      // ...
      
      // Répondre au client avec une réponse de succès
      res.status(200).json({ message: "Utilisateur enregistré avec succès !" });
    } catch (error) {
      console.error(error);
      // Gérer les erreurs qui se produisent lors de l'exécution de la requête ou d'autres opérations asynchrones
      res.status(500).json({ message: "Une erreur s'est produite lors de l'enregistrement de l'utilisateur." });
    }
  });

app.listen(port, () => {
    console.log("listening on port", port)
})