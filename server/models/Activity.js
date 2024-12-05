const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  itinerary: { type: mongoose.Schema.Types.ObjectId, ref: 'Itinerary', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);
