module.exports = {
    event: 'login',
    rules: {
        username: { required: true },
        password: { required: true }
    },
    handle
};

function* handle(request) {
    return true;
}