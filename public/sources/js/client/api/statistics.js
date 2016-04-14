import socket from '../socket';

export default verify;

function verify() {
    return socket.emit('statistics');
}