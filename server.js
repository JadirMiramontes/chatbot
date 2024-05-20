const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const responses = require('./responses'); // Importa las respuestas predefinidas

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

// Función de normalización
function normalizeString(str) {
    str = str.toLowerCase();
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    str = str.replace(/[^a-zA-Z0-9\s]/g, "");
    return str;
}

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (msg) => {
        console.log('Message: ' + msg);

        // Normalizar el mensaje entrante
        let normalizedMsg = normalizeString(msg);

        // Lógica para respuestas predefinidas
        let response = "Lo siento, no entiendo tu pregunta.";
        Object.keys(responses).forEach((key) => {
            if (normalizedMsg.includes(normalizeString(key))) {
                response = responses[key];
            }
        });

        socket.emit('chat message', 'Bot: ' + response);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
