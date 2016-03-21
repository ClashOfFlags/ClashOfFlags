const userService = require('../../services/userService');

module.exports = {
    event: 'login',
    rules: {
        username: {required: true},
        password: {required: true}
    },
    handle
};

function* handle(request) {
    const username = request.username;
    const password = request.password;
    const result = yield userService.login(username, password);

    if(!result) {
        return { failed: true };
    }

    return result;
}