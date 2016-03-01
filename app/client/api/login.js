import socket from '../socket';

export default login;

function login(username, password) {
    return socket.emit('login', {
        username,
        password
    });
}