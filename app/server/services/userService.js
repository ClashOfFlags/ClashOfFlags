'use strict';

const hashService = require('./hashService');
const userRepository = require('../repositories/userRepository');

class UserService {

    register(userData) {
        return hashService.hash(userData.password)
            .then(hashedPassword => {
                userData.password = hashedPassword;

                return userRepository.save(userData);
            });
    }

}

module.exports = new UserService();