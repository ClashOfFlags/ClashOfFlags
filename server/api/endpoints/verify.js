const userService = require('../../services/userService');

module.exports = {
    event: 'verify',
    rules: {
        token: {required: true}
    },
    handle
};

function* handle(request) {
    const token = request.token;
    
    return yield userService.verify(token);
}