import socket from '../socket';

export default login;

function login(username, password) {
    return new Promise((resolve, reject) => {
        const payload = {
            username,
            password
        };

        socket.emit('login', payload, result => {
            return resolve(result);
        });
    });
}