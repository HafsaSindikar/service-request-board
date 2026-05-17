const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const jobRoutes = require('./routes/jobRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: "*"
}));
app.use(express.json());

// Routes
app.use('/api/jobs', jobRoutes);
app.use('/api/auth', authRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('API is running');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global Error Logged:', err.message);

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid ID format specified' });
  }

  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

// Connect DB + start server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));