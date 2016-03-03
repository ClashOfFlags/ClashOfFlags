const User = require('../../models/User');

module.exports = {
    event: 'register',
    rules: {
        email: { required: true },
        username: { required: true },
        password: { required: true }
    },
    handle
};

function* handle(request) {
    const user = new User({
        email: request.email,
        username: request.username,
        password: request.password
    });

    user.save((err, user) => {
        if(err) {
            return console.error(err.stack);
        }

        console.log('Saved user', user);
    });

    return true;
}