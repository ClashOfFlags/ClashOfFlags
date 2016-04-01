'use strict';

const bcrypt = require('bcryptjs');

class HashService {

    hash(input) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(input, 12, (err, hash) => {
                if (err) {
                    return reject(err);
                }

                return resolve(hash);
            });
        });
    }

    compare(input, hash) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(input, hash, (err, result) => {
                if (err) {
                    return reject(err);
                }

                return resolve(result);
            });
        });
    }

}

module.exports = new HashService();