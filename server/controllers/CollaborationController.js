const express = require('express');
const mongoose = require('mongoose');
const Collaboration = require('../models/Collaboration');
const User = require('../models/User'); // Assuming you have a User model to validate users
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

// Fetch collaborations for the authenticated user
router.get('/', authenticate, async (req, res) => {
  try {
    // Fetch collaborations for the authenticated user
    const collaborations = await Collaboration.find({ userId: req.user.id }).populate('collaborators', 'name email');
    res.json(collaborations);
  } catch (error) {
    console.error('Error fetching collaborations:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a collaborator to the user's collaboration list
router.post('/add', authenticate, async (req, res) => {
  try {
    const { userId } = req.body; // Collaborator user ID

    // Validate if userId is provided
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Ensure userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid User ID format' });
    }

    // Check if the userId exists in the User collection
    const collaborator = await User.findById(userId);
    if (!collaborator) {
      return res.status(404).json({ message: 'Collaborator not found' });
    }

    // Find or create a collaboration document
    let collaboration = await Collaboration.findOne({ userId: req.user.id });

    if (!collaboration) {
      // If no collaboration exists, create one
      collaboration = new Collaboration({
        userId: req.user.id,
        collaborators: [userId], // Add the first collaborator
      });
    } else {
      // If collaboration exists, add the collaborator
      if (!collaboration.collaborators.includes(userId)) {
        collaboration.collaborators.push(userId);
      }
    }

    // Save the collaboration document
    await collaboration.save();
    res.json(collaboration); // Send updated collaboration back to the client
  } catch (error) {
    console.error('Error adding collaborator:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
