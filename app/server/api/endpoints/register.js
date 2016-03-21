const userService = require('../../services/userService');
const mailService = require('../../services/mailService');

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

    const user = yield userService.register(userData);

    mailService.send(user.email, 'Please verify your account', user.verificationToken)
        .then(data => console.log(data))
        .catch(err => console.error(err));

    return true;
}