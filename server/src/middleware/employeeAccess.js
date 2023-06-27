const jwt = require('jsonwebtoken')


function employeeAccess(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  const user = jwt.verify(token, process.env.secretKey)

  if (user.UserType !== "employee") {
    return res.sendStatus(401);
  }
  next();

}


module.exports = employeeAccess