const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const responses = require('./responses'); // Importa las respuestas predefinidas

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (msg) => {
        console.log('Message: ' + msg);
<<<<<<< HEAD
        // Aquí puedes añadir lógica para responder al mensaje
        socket.emit('chat message', 'TecBot: ' + msg);
=======

        // Lógica para respuestas predefinidas
        let response = "Lo siento, no entiendo tu pregunta.";
        Object.keys(responses).forEach((key) => {
            if (msg.toLowerCase().includes(key)) {
                response = responses[key];
            }
        });

        socket.emit('chat message', 'Bot: ' + response);
>>>>>>> 4d6d9e0810d5efb08b2a1d558a71cdb28268d977
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
