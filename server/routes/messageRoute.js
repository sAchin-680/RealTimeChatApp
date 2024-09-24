const express = require('express');
const router = express.Router();

const { getMessagesByChatId } = require('../controllers/messageController');

// Fetch messages for a specific chat with pagination
router.get('/:chatId/messages', getMessagesByChatId);

module.exports = router;
