require('dotenv').config() //Fichier de configuration .env
const jwt = require('jsonwebtoken')
const express = require('express')
const db = require('./src/db') //Chemin vers les infos de connexion à la db
const userQueries = require('./src/queries/user')
const app = express()
const port = 5000

app.use(express.json()); //Middleware express


app.post("/login", async (req, res) => {

  //Récupération du mdp et de l'email passé dans le formulaire de login
  const { email, password } = req.body;

  //Création d'une requête SQL pour aller vérifier le 
  const request = db.query("SELECT Password, ID_user from users where Email = ?", [email], (error, results) => {
    if (error) {
      console.log(error)
    } else {
      if (results.length > 0) {
        if (password === results[0].Password) {

          const ID = results[0].ID_user
          const token = jwt.sign({ email, ID }, process.env.secretKey, { expiresIn: '10s' });
          res.json({ token });
        } else {
          res.status(401).json({ error: 'Identifiants invalides' });
        }

      } else {
        res.status(401).json({ error: 'Identifiants invalides' });
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

    const { username, userfirstname, email, password, type, bankref } = req.body;
    console.log(email);
    console.log(password);
    console.log(username);
    console.log(userfirstname);
    console.log(type);
    console.log(bankref);


    // Effectuer la requête à la base de données pour obtenir le mot de passe de l'utilisateur
    db.query('SELECT Email FROM Users WHERE Email = ?', [email], (error, results) => {

      if (error) {
        // Gérer les erreurs qui se produisent lors de l'exécution de la requête ou d'autres opérations asynchrones
        console.error(error);
        res.status(500).json({ message: "Connextion avec la DB impossible" });

      } else {

        // Utiliser les résultats de la requête
        if (results.length > 0) {

          // L'utilisateur existe déjà, renvoyer une réponse d'erreur
          return res.status(400).json({ message: "L'utilisateur existe déjà." });
        }
        else {

          if (type == "employee") {

            db.query('INSERT INTO Users SET ?', { Email: email, Password: password, Name: username, FirstName: userfirstname }, (error, results) => {
              if (error) {
                // Gérer les erreurs d'insertion dans la base de données
                console.error(error);
                return res.status(500).json({ message: "Une erreur s'est produite lors de l'enregistrement de l'utilisateur." });
              } else {


                console.log('Utilisateur inséré avec succès dans la base de données.');
                console.log('resultat de la requete : ', results.insertId);
                const ID_user = results.insertId;
                db.query('SELECT ID_bank FROM Banks WHERE Name = ?', [bankref], (error, results) => {
                  if (error) {
                    // Gérer les erreurs d'insertion dans la base de données
                    console.error(error);
                    return res.status(500).json({ message: "Une erreur s'est produite lors de l'enregistrement de l'utilisateur." });


                  } else {
                    console.log('resultat de la requete : ', results[0].ID_bank);
                    const ID_bank = results[0].ID_bank;
                    db.query('INSERT INTO Employees SET ?', { ID_user: ID_user, ID_bank: ID_bank }, (error, results) => {
                      if (error) {
                        // Gérer les erreurs d'insertion dans la base de données
                        console.error(error);
                        return res.status(500).json({ message: "Une erreur s'est produite lors de l'enregistrement de l'utilisateur." });


                      } else {
                      
                        console.log('Employé inséré avec succès dans la base de données.');
                        res.status(200).json({ message: "Employé enregistré avec succès !" });
                      }
                    });
                  }
                })
              }
            });
          }
          else  {
            // Enregistrement de l'utilisateur dans la base de données
            db.query('INSERT INTO Users SET ?', { Email: email, Password: password, Name: username, FirstName: userfirstname }, (error, results) => {
              if (error) {

                // Gérer les erreurs d'insertion dans la base de données
                console.error(error);
                return res.status(500).json({ message: "Une erreur s'est produite lors de l'enregistrement de l'utilisateur." });
              } else {

                console.log('Utilisateur inséré avec succès dans la base de données.');
                res.status(200).json({ message: "Utilisateur enregistré avec succès !" });
              }
            });
          }
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.get('/getBanks', async (req, res) => {
  db.query('SELECT Name FROM Banks', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: "Connextion avec la DB impossible" });
    } else {
      console.log(results);
      res.json(results)
    }
  }
  )
});

app.listen(port, () => {
  console.log("listening on port", port)
})