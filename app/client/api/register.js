import socket from '../socket';

export default register;

function register(email, username, password) {
    return new Promise((resolve, reject) => {
        const payload = {
            email,
            username,
            password
        };

        socket.emit('register', payload, result => {
            return resolve(result);
        });
    });
}