const mongoose = require('mongoose');

module.exports = mongoose.model('StatEntry', {
    key: String,
    createdAt: { type: Date, default: Date.now }
});