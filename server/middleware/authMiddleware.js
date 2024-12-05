const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    console.log('Authorization failed: No token provided');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token verified successfully:', decoded);
    req.user = decoded; // Ensure decoded contains `id`
    next();
  } catch (err) {
    console.error('Authorization failed: Invalid token', err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = verifyToken;
