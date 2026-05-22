const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { createServer } = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

const authRoutes = require('./routes/authRoutes');
const matchRoutes = require('./routes/matchRoutes');


app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/matches', matchRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'VentureLink API is running' });
});


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb:

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));


io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  
  socket.on('joinRoom', (room) => {
    socket.join(room);
  });

  socket.on('sendMessage', (data) => {
    socket.to(data.room).emit('receiveMessage', data.message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
