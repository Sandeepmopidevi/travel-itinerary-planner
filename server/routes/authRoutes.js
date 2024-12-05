const express = require('express');
const { login, register, getProfile } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Add debug logs to track route usage
router.post('/login', (req, res, next) => {
  next();
}, login);

router.post('/register', (req, res, next) => {
  next();
}, register);

router.get('/me', (req, res, next) => {
  next();
}, authMiddleware, getProfile);

module.exports = router;
