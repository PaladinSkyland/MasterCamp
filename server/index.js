require('dotenv').config() //Fichier de configuration .env
const express = require('express')
const app = express()
const port = 5000
const userQueries = require('./src/queries/user')
const db = require('./src/db') //Chemin vers les infos de connexion à la db
const authenticateToken = require('./src/authenticateToken')
//npm install body-parser
const bodyParser = require('body-parser');

//increase the maximum request payload size
const MAX_PAYLOAD_SIZE = '16mb';

app.use(express.json()); //Middleware express

//configure body-parser middleware with increased limit
app.use(bodyParser.json({ limit: MAX_PAYLOAD_SIZE }));
app.use(bodyParser.urlencoded({ limit: MAX_PAYLOAD_SIZE, extended: true }));

const authentificationRouter = require('./src/routes/authentification');
app.use('/authentification', authentificationRouter)

const customerRouter = require('./src/routes/customer');
app.use('/customer', customerRouter)

const adminRouter = require('./src/routes/admin');
app.use('/admin', adminRouter)

app.get("/home", authenticateToken, (req, res) => {
  const ID = req.user.ID;

  const response = userQueries.getUserInfoByID(ID);

  response.then((response) => {
    res.json(response);
  });
});

app.listen(port, () => {
  console.log("listening on port", port);
});





