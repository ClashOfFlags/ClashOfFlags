require('dotenv').config();

const port = process.env.PORT || 80;
const express = require('express');
const app = express();
const server = require('http').Server(app);
const socketIo = require('./socket.io');
const mongoose = require('./mongoose');

app.use(express.static('public'));
socketIo.init(server);

console.log('Waiting for MongoDB connection...');
mongoose.then(() => {
    server.listen(port);
    console.log(`Server listening on port ${ port }!`);
});
