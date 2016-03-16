const mongoose = require('mongoose');
const connectionUrl = process.env.MONGO_CONNECTION_URL;

module.exports = new Promise((resolve, reject) => {
    mongoose.connect(connectionUrl);

    const db = mongoose.connection;

    db.on('error', err => console.error(err));

    db.once('open', () => {
        return resolve(); // Connected to MongoDB
    })
});