const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

// Route to fetch a specific itinerary
router.get('/:id', verifyToken, (req, res) => {
  const { id } = req.params;

  try {
    // Example response
    res.json({ title: `Itinerary ${id}`, description: `Description for itinerary ${id}` });
  } catch (error) {
    console.error('Error fetching itinerary:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to create a new itinerary
router.post('/new', verifyToken, (req, res) => {
  const { name, description } = req.body;

  try {
    // Example response
    res.status(201).json({ id: 'new', name, description });
  } catch (error) {
    console.error('Error creating itinerary:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
