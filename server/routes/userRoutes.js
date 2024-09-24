const express = require('express');
const User = require('./../models/User');

const router = express.Router();

// route to create a new User
router.post('/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: `Server error ` });
  }
});

// route to get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // Use the user model to fetch users
  } catch (err) {
    res.status(500).json({ error: `Server Error ` });
  }
});

module.exports = router;
