const mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    email: String,
    username: String,
    password: String,
    createdAt: { type: Date, default: Date.now },
    verified: { type: Boolean, default: false },
    verifyToken: String
});