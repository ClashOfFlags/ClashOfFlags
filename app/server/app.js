require('dotenv').config();

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');

app.use(express.static('public'));

server.listen(8000);

io.on('connection', socket => {
    socket.emit('hello world', { hello: 'Greetings!' });
});

mongoose.connect('mongodb://localhost/clash-of-flags');

const db = mongoose.connection;

db.on('error', err => console.error(err));

db.once('open', () => {
    console.log('Connected to MongoDB!');
})