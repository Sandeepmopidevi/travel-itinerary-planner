const express = require('express');
const mongoose = require('mongoose');
const Collaboration = require('../models/Collaboration');
const User = require('../models/User');  // Ensure User model is imported for validation
const authenticate = require('../middleware/authMiddleware'); // Middleware for authentication

const router = express.Router();

// Fetch collaborations for the authenticated user
router.get('/', authenticate, async (req, res) => {
  try {
    // Fetch collaborations for the authenticated user
    const collaborations = await Collaboration.find({ userId: req.user.id })
      .populate('collaborators', 'name email'); // Populate collaborators with name and email
    if (!collaborations) {
      return res.status(404).json({ message: 'No collaborations found' });
    }
    res.json(collaborations);
  } catch (error) {
    console.error('Error fetching collaborations:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a collaborator to the user's collaboration list
router.post('/add', authenticate, async (req, res) => {
  try {
    const { userId } = req.body; // Collaborator user ID from request body

    // Validate the collaborator user ID
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Ensure userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid User ID format' });
    }

    // Check if the userId exists in the database (ensure the collaborator is a valid user)
    const collaborator = await User.findById(userId);
    if (!collaborator) {
      return res.status(404).json({ message: 'Collaborator not found' });
    }

    // Check if the user is trying to add themselves as a collaborator
    if (userId === req.user.id) {
      return res.status(400).json({ message: 'You cannot add yourself as a collaborator' });
    }

    // Find or create a collaboration document for the authenticated user
    let collaboration = await Collaboration.findOne({ userId: req.user.id });

    if (!collaboration) {
      // Create a new collaboration if one doesn't exist
      collaboration = new Collaboration({
        userId: req.user.id,
        collaborators: [userId], // Add the first collaborator
      });
    } else {
      // If collaboration exists, check if the collaborator is already added
      if (collaboration.collaborators.includes(userId)) {
        return res.status(400).json({ message: 'Collaborator already added' });
      }
      collaboration.collaborators.push(userId); // Add collaborator to the list
    }

    await collaboration.save();
    res.status(201).json(collaboration); // Send updated collaboration back to the client
  } catch (error) {
    console.error('Error adding collaborator:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
