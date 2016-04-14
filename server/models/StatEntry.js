const mongoose = require('mongoose');

module.exports = mongoose.model('StatEntry', {
    key: String,
    team: String,
    createdAt: { type: Date, default: Date.now }
});