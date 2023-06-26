const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const expiryTimestamp = user.exp;
    const remainingSeconds = expiryTimestamp - currentTimestamp;

    if (remainingSeconds < 600) {
      
      const ID = user.ID
      const email = user.email
      const newToken = jwt.sign({email, ID}, process.env.secretKey, {expiresIn: '1h'});

      req.headers['authorization'] = newToken;
      req.user = jwt.verify(newToken, process.env.secretKey)
      next();
    } else {
    req.user = user;
    next();
    }
  });
}


module.exports = authenticateToken