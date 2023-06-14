require('dotenv').config() //Fichier de configuration .env
const jwt = require('jsonwebtoken')
const express = require('express')
const db = require('./src/db') //Chemin vers les infos de connexion à la db
const userQueries = require('./src/queries/user')
const app = express()
const port = 5000

app.use(express.json()); //Middleware express


app.post("/login", async (req,res) => {

    //Récupération du mdp et de l'username passé dans le formulaire de login
    const {username, password} = req.body;

    //Récupération du mdp de l'utilisateur dans la BDD


    const request = db.query("SELECT Password, ID_user from Utilisateur where Email_utilisateur = ?", [username], (error, results) => {
      if (error) {
        console.log(error)
      } else {
        if(results.length > 0 ){
          if(password === results[0].Password){
            const ID = results[0].ID_user
            const token = jwt.sign({ username, ID }, process.env.secretKey, { expiresIn: '10s' });
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

app.get('/protected', authenticateToken, async (req, res) => {
  const response = await userQueries.getNameByID(res, req.user.ID)
  res.json({name: response.Nom_utilsateur})
});

app.listen(port, () => {
    
    console.log("listening on port", port)
})