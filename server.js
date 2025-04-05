const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');  // Для работы с путями

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Обслуживаем статические файлы (теперь из корня)
app.use(express.static(path.join(__dirname)));  // Указываем путь к корню проекта

// Главная страница (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));  // Теперь ищем файл в корне
});

// Страница участников (participants.html)
app.get('/participants', (req, res) => {
    res.sendFile(path.join(__dirname, 'participants.html'));  // Тоже ищем в корне
});

// Страница чата (chat.html)
app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'chat.html'));  // Ищем в корне
});

// Логика для чата через Socket.io
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);  // Отправляем сообщение всем пользователям
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Запуск сервера
server.listen(4000, () => {
    console.log('Server running on http://localhost:4000');
});
