const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Store up to 50 latest messages in memory so newcomers see history
let messageHistory = [];

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Send the message history to the newly connected user immediately
    socket.emit('message_history', messageHistory);

    socket.on('send_message', (data) => {
        // Keep only the last 50 messages
        messageHistory.push(data);
        if (messageHistory.length > 50) {
            messageHistory.shift();
        }
        // Broadcast the newly received message to everyone
        io.emit('receive_message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Real-time Chat Server is running on http://localhost:${PORT}`);
});
