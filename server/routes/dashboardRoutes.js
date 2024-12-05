const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware'); // Middleware to verify token

// Dashboard route
router.get('/', verifyToken, (_, res) => {
  try {
    res.status(200).json({ message: 'Welcome to the Dashboard!' });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
