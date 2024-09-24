const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Message Schema
const messageSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  media: {
    type: String,
  },
  reactions: [
    {
      emoji: String,
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
  ],
  edited: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Message', messageSchema);
