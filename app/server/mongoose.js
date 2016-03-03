const mongoose = require('mongoose');

module.exports = new Promise((resolve, reject) => {
    mongoose.connect('mongodb://localhost/clash-of-flags', {
        user: 'admin',
        pass: 'admin'
    });

    const db = mongoose.connection;

    db.on('error', err => console.error(err));

    db.once('open', () => {
        return resolve(); // Connected to MongoDB
    })
});