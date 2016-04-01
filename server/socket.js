const socketIo = require('socket.io');
const eventBus = require('./events/event-bus');
const SocketConnectEvent = require('./events/SocketConnectEvent');

exports.init = init;
exports.io = null;

function init(server) {
    const io = socketIo(server);
    exports.io = io;

    io.on('connection', socket => {
        const event = new SocketConnectEvent(socket);

        eventBus.fire(event);
    });
}