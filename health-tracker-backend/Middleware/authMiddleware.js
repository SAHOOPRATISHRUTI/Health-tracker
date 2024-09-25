const jwt = require('jsonwebtoken');
const secret = process.env.JWT_USER_SECRET;

const verifyUserToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from 'Bearer <token>'
  
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = decoded; // Attach user information to the request
    next();
  });
};

module.exports = { verifyUserToken };
