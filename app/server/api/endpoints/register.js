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
    console.log(request);

    return true;
}