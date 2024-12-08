// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Routes
const authRoutes = require('./routes/authRoutes');
const itineraryRoutes = require('./routes/itineraryRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const userRoutes = require('./routes/userRoutes');
const collaborationRoutes = require('./routes/collaborationRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/itineraries', itineraryRoutes); // Only one instance of itineraryRoutes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/users', userRoutes); // Add the users route
app.use('/api/collaborations', collaborationRoutes); // Add the collaborations route
// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
