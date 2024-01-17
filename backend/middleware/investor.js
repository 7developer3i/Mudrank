const jwt = require('jsonwebtoken');
require("dotenv").config();

function verifyToken(req, res, next) {
    const token = req.body.token;
  
    if (!token) {
      return res.status(401).json({ message: 'Token missing' });
    }
  
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Token invalid' });
      }
      req.userId = decoded.userId;
      next();
    });
};
  
module.exports = { verifyToken }