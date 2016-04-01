'use strict';

const User = require('../models/User');

class UserRepository {

    save(userData) {
        const user = new User(userData);

        return new Promise((resolve, reject) => {
            user.save((err, savedUser) => {
                if(err) {
                    return reject(err);
                }

                return resolve(savedUser);
            });
        });
    }

    byToken(token) {
        return User.findOne({ verificationToken: token });
    }

    byNameOrEmail(input) {
        return User.findOne().or([ { username: input }, { email: input } ]);
    }

}

module.exports = new UserRepository();