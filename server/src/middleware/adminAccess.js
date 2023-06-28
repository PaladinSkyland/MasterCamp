const jwt = require('jsonwebtoken')


function adminAccess(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log(token)
  if (token == null) {
    return res.sendStatus(401);
  }

  const UserType = jwt.verify(token, process.env.secretKey)

  console.log(UserType)
  if (UserType.UserType !== "admin") {
    return res.sendStatus(401);
  }
  next();

}


module.exports = adminAccess