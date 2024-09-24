const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter a username'],
    unique: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    reqquired: [true, 'Please enter an Email address'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: 8,
    select: false, // Prevent password from being returned by default
  },
  profilePicture: {
    type: Buffer,
    default: '',
  },
  status: {
    type: String,
    default: 'Hey there! I am using Real time chat app!',
  },
  contacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
    },
  ],
  isOnline: {
    type: Boolean,
    default: false,
  },
  lastseen: {
    type: Date,
    default: Date.now(),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash the password before saving the model
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await brcypt.genSalt(10);
  this.password = await brcypt.hash(this.password, salt);
});

// Method to match entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await brcypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

// Export the module
module.exports = User;
