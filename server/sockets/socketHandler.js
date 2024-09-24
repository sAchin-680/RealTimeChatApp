const messageSocketEvents = require('./messageSocketEvents');

const userTyping = new Map();

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Handle joining a chat room
    socket.on('joinChat', ({ chatId, userId }) => {
      socket.join(chatId);
      console.log(`User ${userId} joined chat ${chatId}`);
      io.to(chatId).emit('userConnected', { userId });
    });

    // Integrate message-related socket events
    messageSocketEvents(socket, io, userTyping);

    // WebRTC signaling events
    socket.on('callUser', (data) => {
      io.to(data.to).emit('callUser', {
        signal: data.signal,
        from: data.from,
      });
    });

    socket.on('callAccepted', (data) => {
      io.to(data.to).emit('callAccepted', {
        signal: data.signal,
        from: data.from,
      });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      userTyping.forEach((chatId, userId) => {
        io.to(chatId).emit('userDisconnected', { userId });
        userTyping.delete(userId);
      });
    });
  });
};

module.exports = socketHandler;
