const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', // allow all origins or specify your frontend url
    methods: ['GET', 'POST'],
  },
});

const ORDERS_PATH = path.join(__dirname, '../grpc-server/mock/orders.json');
const FAVORITES_PATH = path.join(__dirname, '../grpc-server/mock/favorites.json');

function readMock(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (err) {
    console.error('Failed to read mock data:', filePath, err);
    return [];
  }
}

io.on('connection', (socket) => {
  console.log('✅ A user connected:', socket.id);

  // Emit mock orders every 5 seconds
  const orderInterval = setInterval(() => {
    const orders = readMock(ORDERS_PATH);
    socket.emit('order-updated', orders);
  }, 5000);

  // Emit mock favorites every 7 seconds
  const favoriteInterval = setInterval(() => {
    const favorites = readMock(FAVORITES_PATH);
    socket.emit('favorites-updated', favorites);
  }, 7000);

  // Listen for chat-style messages
  socket.on('message', (msg) => {
    console.log('📩 Message received:', msg);
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
    clearInterval(orderInterval);
    clearInterval(favoriteInterval);
  });
});

const PORT = 3001;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Socket.IO mock server running at http://localhost:${PORT}`);
});

