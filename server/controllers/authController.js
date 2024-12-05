const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Login Handler
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Login failed: User not found');
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Login failed: Password mismatch');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (error) {
    console.error('Login server error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Register Handler
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    console.log('User registered successfully:', user.email);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Register server error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Profile Handler
exports.getProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      console.log('Get profile failed: User ID missing from token');
      return res.status(400).json({ message: 'Invalid request. User ID missing.' });
    }

    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      console.log('Get profile failed: User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Profile fetched successfully for user:', user.email);
    res.status(200).json(user);
  } catch (error) {
    console.error('Get profile server error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
