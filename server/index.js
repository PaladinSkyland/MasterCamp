require('dotenv').config() //Fichier de configuration .env
const express = require('express')
const app = express()
const port = 5000
const userQueries = require('./src/queries/user')
const authenticateToken = require('./src/authenticateToken')

app.use(express.json()); //Middleware express

//Chemin vers les différents routeurs
const authentificationRouter = require('./src/routes/authentification');
const customerRouter = require('./src/routes/customer');
const adminRouter = require('./src/routes/admin');
const employeeRouter = require('./src/routes/employees')

//Configuration des routes
app.use('/authentification', authentificationRouter)
app.use('/customer', customerRouter)
app.use('/admin', adminRouter)
app.use('/employee', employeeRouter)

app.get("/home", authenticateToken, (req, res) => {
  const ID = req.user.ID_user;

  const response = userQueries.getUserInfoByID(ID);

  response.then((response) => {
    res.json(response);
  });
});

const convRouter = require('./src/routes/conversation');
app.use('/conversation', convRouter)

app.listen(port, () => {
  console.log("listening on port", port);
});





