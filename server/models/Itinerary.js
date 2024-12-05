// models/Itinerary.js

const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to user model
  },
  { timestamps: true }
);

module.exports = mongoose.model('Itinerary', itinerarySchema);
