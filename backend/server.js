const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const UserSubmission = require('./models/UserSubmission');
const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas successfully!'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Backend API is running...');
});

// POST route for form submission
app.post('/api/submit', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newSubmission = new UserSubmission({ name, email, message });
    await newSubmission.save();
    res.status(201).json({ success: true, message: 'Data saved successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});