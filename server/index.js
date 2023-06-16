require('dotenv').config() //Fichier de configuration .env
const jwt = require('jsonwebtoken')
const express = require('express')
const bcrypt = require('bcryptjs')
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
          if(bcrypt.compare(password, results[0].Password)){

            const ID = results[0].ID_user
            const token = jwt.sign({ email, ID }, process.env.secretKey, { expiresIn: '6m' });
            //console.log("BASED TOKEN",jwt.verify(token, process.env.secretKey).exp, "  ", token)
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

      console.log(user)
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const expiryTimestamp = user.exp;
      const remainingSeconds = expiryTimestamp - currentTimestamp;
      //console.log(remainingSeconds)

      if (err) {
        return res.sendStatus(403);
      }
      else if (remainingSeconds < 600) {
        
        const ID = user.ID
        const email = user.email
        const newToken = jwt.sign({email, ID}, process.env.secretKey, {expiresIn: '1h'});


        const currentTimestamp = Math.floor(Date.now() / 1000);
        const expiryTimestamp = jwt.verify(newToken, process.env.secretKey).exp;
        const remainingSeconds = expiryTimestamp - currentTimestamp;

        //console.log("DATE DEXPIRATION", remainingSeconds)
        console.log("NEW TOKEN",newToken)
        req.headers['authorization'] = newToken;
        req.user = jwt.verify(newToken, process.env.secretKey)
        console.log(req.user)
        next();
      } else {
      req.user = user;
      next();
      }
    });
}

function checkExpiration(token) {
  const decodedToken = jwt.verify(token, process.env.secretKey);

  const currentTimestamp = Math.floor(Date.now() / 1000);
  const expiryTimestamp = decodedToken.exp;
  const remainingSeconds = expiryTimestamp - currentTimestamp;
  if (remainingSeconds < 300) {
    return true
  }
  return false
}

app.get('/protected', authenticateToken, (req, res) => {
  const response = userQueries.getNameByID(req.user.ID)
  const newToken = req.headers['authorization']
  response.then(response => {
    response['newToken'] = newToken
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