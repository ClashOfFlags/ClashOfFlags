const userService = require('../../services/userService');

module.exports = {
    event: 'register',
    rules: {
        email: {required: true},
        username: {required: true},
        password: {required: true}
    },
    handle
};

function* handle(request) {
    const userData = {
        email: request.email,
        username: request.username,
        password: request.password
    };

    return yield userService.register(userData);
}