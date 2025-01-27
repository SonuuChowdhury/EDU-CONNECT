// app.js (index.js)
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';

// Database connections
import connectDB from './src/db/ConnectMongoDB.js';
import { connectRedis } from './src/db/ConnectRedis.js';

// Import routes and features
import router from './src/routes/routes.js';
import HitServer from './src/api/Checking Servers/HitServer.js';

dotenv.config();

// Initialize app and server
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Change to your frontend domain in production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Attach Socket.IO instance to every request
app.use((req, res, next) => {
  req.io = io; // Attach `io` to the request object
  next();
});

// Database connections
connectDB();
connectRedis();

// Routes
app.use('/', router);

// Handle WebSocket events
io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Handle custom events
  socket.on('sendNotice', (data) => {
    console.log('Received notice data:', data);
    // Broadcast event to all clients
    socket.broadcast.emit('noticeUpdate', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`SERVER IS LIVE ON PORT ${PORT} AND PRODUCTION📢!`);
});

// Simulate server hit after 30 seconds
setTimeout(() => {
  HitServer();
}, 30000);
