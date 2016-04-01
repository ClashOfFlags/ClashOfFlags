const mongoose = require('mongoose');
const Chance = require('chance');
const chance = new Chance();

module.exports = mongoose.model('User', {
    email: String,
    username: String,
    password: String,
    createdAt: { type: Date, default: Date.now },
    verified: { type: Boolean, default: false },
    verificationToken: { type: String, default: generateVerificationToken },
    exp: { type: Number, default: 0 }
});

function generateVerificationToken() {
    return chance.hash();
}