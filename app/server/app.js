require('dotenv').config();

const port = process.env.PORT || 80;
const express = require('express');
const app = express();
const server = require('http').Server(app);
const history = require('connect-history-api-fallback');
const socket = require('./socket');
const mongoose = require('./mongoose');

app.use(history()); // Serve index.html for all 404 routes
app.use(express.static('public')); // Serve static files

socket.init(server); // Start Socket.io
require('./api'); // Start API

server.listen(port);

console.log('Waiting for MongoDB connection...');
mongoose.then(() => {
    console.log(`Server listening on port ${ port }!`);
});
