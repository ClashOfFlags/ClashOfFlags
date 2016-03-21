const userService = require('../../services/userService');

module.exports = {
    event: 'login',
    rules: {
        username: { required: true },
        password: { required: true }
    },
    handle
};

function* handle(request) {
    const username = request.user

    return yield userService.login(username, password);
}