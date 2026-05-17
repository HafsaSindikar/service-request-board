const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Fixes the SSL block for local testing
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const jobRoutes = require('./routes/jobRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/jobs', jobRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('API is running');
});

// 1. Catch-all fallback route for unhandled endpoints (404 Not Found)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Resource not found' });
});

// 2. Global centralized error handling middleware
app.use((err, req, res, next) => {
  console.error('Global Error Logged:', err.message);

  // Catches malformed or mistyped MongoDB ObjectIDs cleanly
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid ID format specified' });
  }

  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

// Connect DB + start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));