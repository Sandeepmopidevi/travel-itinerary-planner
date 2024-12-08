const mongoose = require('mongoose');

// Define collaboration schema
const collaborationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The main user initiating the collaboration
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Array of collaborators (Users)
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Export the collaboration model
module.exports = mongoose.model('Collaboration', collaborationSchema);
