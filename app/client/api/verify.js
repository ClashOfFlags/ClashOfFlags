import socket from '../socket';

export default verify;

function verify(token) {
    return socket.emit('verify', { token: token });
}