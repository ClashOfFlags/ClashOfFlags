import socket from '../socket';

export default statistics;

function statistics() {
    return socket.emit('statistics');
}