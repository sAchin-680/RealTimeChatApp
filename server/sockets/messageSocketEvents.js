const messageSocketEvents = (socket, io, usersTyping) => {
  // User typing event
  socket.on('typing', ({ chatId, userId }) => {
    usersTyping.set(userId, chatId);
    socket.to(chatId).emit('typing', { userId });
  });

  // User stopped typing event
  socket.on('stopTyping', ({ chatId, userId }) => {
    usersTyping.delete(userId);
    socket.to(chatId).emit('stopTyping', { userId });
  });
};

module.exports = messageSocketEvents;
