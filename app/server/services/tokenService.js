'use strict';

const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

if(!secret) {
    console.warn('JWT_SECRET missing in .env file!');
}

class TokenService {

    sign(payload) {
        return new Promise(resolve => {
            jwt.sign(payload, secret, token => {
                return resolve(token);
            });
        });
    }

    verify(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, decoded) => {
                if(err) {
                    return reject(err);
                }

                return resolve(decoded);
            });
        });
    }

}

module.exports = new TokenService();