import socket from '../socket';

export default register;

function register(email, username, password) {
    return socket.emit('register', {
        email,
        username,
        password
    });
}