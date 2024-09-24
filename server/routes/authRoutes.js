const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const router = express.Router();

// Registration
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User Created' });
  } catch (err) {
    res.status(400).json({ message: 'Error Registering User' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ username, email });
    if (user && (await bcrypt.compare(password, userPassword))) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      res.json({ token });
    }
  } catch (error) {
    res.status(400).json({ message: `Error Registering User` });
  }
});

module.exports = router;
