// Environment Configuration
require('dotenv').config();

// Importing Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoute');
const uploadRoutes = require('./routes/uploadRoutes');
const path = require('path');

// Initialize Express Application
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*', // Update this with your client-side URL if needed
    methods: ['GET', 'POST'],
  },
});

// Database Connection
connectDB();

// Middleware Setup
app.use(cors());
app.use(express.json());

// Routes Setup
app.use('/api/auth', authRoutes);
app.use('/api/v1/chats', messageRoutes);
app.use('/api/upload', uploadRoutes); // Connect upload routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// Real-Time Communication Setup (WebSockets/Socket.io)
// Real-Time Communication Setup (WebSockets/Socket.io)
io.on('connection', (socket) => {
  socket.on('sendMessage', (message) => io.emit('receiveMessage', message));
  socket.on('disconnect', () => console.log('User disconnected'));
});

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the real-time chat app');
});

// Server Listen and Initialization
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Graceful Shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server gracefully...');
  server.close(() => {
    console.log('Server closed.');
    mongoose.connection.close();
    process.exit(0);
  });
});
