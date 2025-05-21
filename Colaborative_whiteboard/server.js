const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve the static HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('draw', (data) => {
        socket.broadcast.emit('draw', data);
    });

    socket.on('erase', (data) => {
        socket.broadcast.emit('erase', data);
    });

    socket.on('clear', () => {
        socket.broadcast.emit('clear');
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });

    socket.on('error', (err) => {
        console.error('Socket Error for user', socket.id, ':', err);
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});