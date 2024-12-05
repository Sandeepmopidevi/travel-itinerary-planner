const express = require('express');
const { createItinerary, getItineraries, getItineraryById } = require('../controllers/itineraryController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new itinerary
router.post('/new', authMiddleware, createItinerary);

// Get all itineraries
router.get('/', authMiddleware, getItineraries);

// Get a specific itinerary by ID
router.get('/:id', authMiddleware, getItineraryById);

module.exports = router;