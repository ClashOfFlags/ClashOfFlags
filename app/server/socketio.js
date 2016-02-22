const socketio = require('socket.io');

exports.init = init;
exports.io = null;

function init(server) {
    exports.io = socketio(server);
}