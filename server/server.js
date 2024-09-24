// 1. Environment Configuration
require('dotenv').config();

// 2. Importing Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const User = require('./models/User');

// 3. Initialize Express Application
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// 4. Database Connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// 5. Middleware Setup
app.use(cors());
app.use(express.json());

// 6. JWT Authentication & Role-Based Access Control (RBAC)
// Example Middleware for authentication
// const authenticateJWT = require('./middleware/authenticateJWT');
// app.use(authenticateJWT);
const authRoutes = require('./routes/authRoutes');

// 7. Rate Limiting & Security Enhancements

// 8. Routes Setup
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to the real time chat app');
});

// 9. Real-Time Communication Setup (WebSockets/Socket.io)
io.on('connection', (socket) => {
  console.log('New User connected', socket.id);
});

// Handle events like 'message', 'typing', 'join', etc..

// 10. Error Handling Middleware

// 11. API Versioning
// Example: app.use('/api/v1', v1Routes);
// Example: app.use('/api/v2', v2Routes);

// 12. Caching, Pagination & Filtering
// Implement caching logic (e.g., Redis), and pagination filtering in route handlers

// 13. Swagger Documentation
// const swaggerUI = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// 14. Logging & Monitoring
// const winston = require('winston');
// Implement loggi

// 15. Admin Panel Setup
// app.use('/admin', adminRoutes);  // Admin routes for user/chat management

// 16. GraphQL Integration (Optional)
// const { graphqlHTTP } = require('express-graphql');
// app.use('/graphql', graphqlHTTP({
//    schema: myGraphQLSchema,
//    rootValue: myGraphQLResolvers,
// }));

// 17. Real-Time Features (WebSockets Events)
// Example: handling typing indicators, user presence, etc.
io.on('sendMessage', (message) => {
  io.emit('receiveMessage', message);
});

io.on('disconnect', () => {
  console.log('User disconnected');
});

// 18. Internationalization (i18n)
// const i18n = require('i18n');
// app.use(i18n.init);  // Multi-language support

// 19. Server Listen and Initialization
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// 19. Server Listen and Initialization
