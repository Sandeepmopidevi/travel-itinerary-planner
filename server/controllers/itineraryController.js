const Itinerary = require('../models/Itinerary');

// Create a new itinerary
exports.createItinerary = async (req, res) => {
  try {
    const itinerary = new Itinerary({ ...req.body, user: req.user.id });
    await itinerary.save();
    res.status(201).json(itinerary);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create itinerary', error: error.message });
  }
};

// Get all itineraries
exports.getItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ user: req.user.id });
    res.json(itineraries);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch itineraries', error: error.message });
  }
};

// Get a specific itinerary by ID
exports.getItineraryById = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    if (!itinerary || itinerary.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }
    res.json(itinerary);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch itinerary', error: error.message });
  }
};
