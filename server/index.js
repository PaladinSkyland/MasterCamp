require('dotenv').config() //Fichier de configuration .env
const jwt = require('jsonwebtoken')
const express = require('express')
const db = require('./src/db') //Chemin vers les infos de connexion à la db
const userQueries = require('./src/queries/user')
const app = express()
const port = 5000

app.use(express.json()); //Middleware express


app.post("/login", async (req,res) => {

    //Récupération du mdp et de l'email passé dans le formulaire de login
    const {email, password} = req.body;

    //Récupération du mdp de l'utilisateur dans la BDD


    const request = db.query("SELECT Password, ID_user from Users where Email = ?", [email], (error, results) => {
      if (error) {
        console.log(error)
      } else {
        if(results.length > 0 ){
          if(password === results[0].Password){

            const ID = results[0].ID_user
            const token = jwt.sign({ email, ID }, process.env.secretKey, { expiresIn: '10s' });
            res.json({ token });
          }else {
            res.status(401).json({ error: 'Identifiants invalides' });
          }
    }
      }
    });
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) {
      return res.sendStatus(401);
    }
  
    jwt.verify(token, process.env.secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
}

app.get('/protected', authenticateToken, (req, res) => {
  const response = userQueries.getNameByID(req.user.ID)
  response.then(response => {
    res.json(response)
  })
  
});


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