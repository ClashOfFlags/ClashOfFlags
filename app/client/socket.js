const socket = io();

export default {
    emit
};

function emit(event, payload) {
    return new Promise((resolve, reject) => {
        socket.emit(event, payload, response => {
            return resolve(response);
        });
    });
}