const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

let messages = {}; // Store messages in memory, indexed by doctor ID

app.get('/doctors', (req, res) => {
  const doctors = [
    { id: 1, name: 'Dr. Siddharth', picture: 'https://via.placeholder.com/50', treatment: 'Cardiology', unreadMessages: 2 },
    { id: 2, name: 'Dr. Sharath', picture: 'https://via.placeholder.com/50', treatment: 'Neurology', unreadMessages: 1 },
  ];
  res.send(doctors);
});

app.get('/messages/:doctorId', (req, res) => {
  const doctorId = req.params.doctorId;
  res.send(messages[doctorId] || []);
});

// New route to simulate a doctor sending a message
app.post('/sendMessage', (req, res) => {
  const message = req.body;
  if (!messages[message.doctorId]) {
    messages[message.doctorId] = [];
  }
  messages[message.doctorId].push(message);
  io.emit('receiveMessage', message);
  res.status(200).send({ status: 'Message sent' });
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('sendMessage', (message) => {
    if (!messages[message.doctorId]) {
      messages[message.doctorId] = [];
    }
    messages[message.doctorId].push(message);
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(5001, () => {
  console.log('Server is running on port 5001');
});