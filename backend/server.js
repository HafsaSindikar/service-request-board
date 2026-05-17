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

// routes
app.use('/api/jobs', jobRoutes);

// test route
app.get('/', (req, res) => {
  res.send('API is running');
});

// connect DB + start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
