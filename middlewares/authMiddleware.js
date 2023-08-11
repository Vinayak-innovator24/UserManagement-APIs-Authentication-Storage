const jwt = require('jsonwebtoken'); // JSON Web Token library
const key = process.env.JWT_SECRET;

// Middleware for verifying JWT token
function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, key, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: 'error',
        message: 'Unauthorized access.',
      });
    }
    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;