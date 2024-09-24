const Message = require('../models/Message');
const Chat = require('../models/Chat');
const mongoose = require('mongoose');

exports.getMessagesByChatId = async (req, res) => {
  const { chatId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(chatId))
    return res.status(400).json({ error: 'Invalid chat ID' });

  try {
    const chat = await Chat.findById(chatId);
    if (!chat || !chat.users.includes(req.user._id))
      return res.status(403).json({ error: 'Access denied' });

    const limit = parseInt(req.query.limit) || 20;
    const page = parseInt(req.query.page) || 1;
    const messages = await Message.find({ chatId })
      .populate('userId', 'username avatar')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    res.json({ page, limit, totalMessages: messages.length, messages });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
