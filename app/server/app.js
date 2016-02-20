const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

server.listen(8000);

io.on('connection', socket => {
    socket.emit('hello world', { hello: 'Greetings!' });
});