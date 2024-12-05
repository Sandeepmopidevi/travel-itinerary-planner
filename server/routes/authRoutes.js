const express = require('express');
const { login, register, getProfile } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Add debug logs to track route usage
router.post('/login', (req, res, next) => {
  console.log('Login route hit');
  next();
}, login);

router.post('/register', (req, res, next) => {
  console.log('Register route hit');
  next();
}, register);

router.get('/me', (req, res, next) => {
  console.log('Profile route hit');
  next();
}, authMiddleware, getProfile);

module.exports = router;
