const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const userRoutes = require('./routes/userRoutes');
const neighborhoodRoutes = require('./routes/neighborhoodRoutes');
const matchingRoutes = require('./routes/matchingRoutes');
const authRoutes = require('./routes/auth');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/neighborfit';
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/neighborhoods', neighborhoodRoutes);
app.use('/api/matching', matchingRoutes);
app.use('/api/auth', authRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('NeighborFit API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});