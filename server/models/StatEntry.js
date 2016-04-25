const mongoose = require('mongoose');

module.exports = mongoose.model('StatEntry', {
    key: String,
    team: String,
    options: Object,
    createdAt: { type: Date, default: Date.now }
});