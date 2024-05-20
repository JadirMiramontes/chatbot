const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const responses = require('./responses'); // Importa las respuestas predefinidas

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""); // Elimina los acentos
}

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (msg) => {
        const normalizedMsg = normalizeText(msg);
        console.log('Message: ' + normalizedMsg);

        // Lógica para respuestas predefinidas
        let response = "Lo siento, no entiendo tu pregunta.\n"; // Agrega salto de línea
        Object.keys(responses).forEach((key) => {
            if (normalizedMsg.includes(normalizeText(key))) {
                response = responses[key] + "\n"; // Agrega salto de línea
            }
        });

        socket.emit('chat message', 'TecBot: ' + response);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
