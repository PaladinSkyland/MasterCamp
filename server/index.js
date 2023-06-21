require('dotenv').config() //Fichier de configuration .env
const express = require('express')
const app = express()
const port = 5000
const userQueries = require('./src/queries/user')
const authenticateToken = require('./src/authenticateToken')

app.use(express.json()); //Middleware express

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





