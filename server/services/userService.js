'use strict';

const hashService = require('./hashService');
const mailService = require('./mailService');
const tokenService = require('./tokenService');
const userRepository = require('../repositories/userRepository');

class UserService {

    register(userData) {
        return hashService.hash(userData.password)
            .then(hashedPassword => {
                userData.password = hashedPassword;

                return userRepository.save(userData);
            });
    }

    sendRegistrationMail(user) {
        const to = user.email;
        const subject = 'Please verify your account';
        const html = [];

        html.push(`Hello <b>${ user.username }</b>,<br>`);
        html.push('<br>');
        html.push('Thank you for creating an account on <b>Clash of Flags</b>!<br>');
        html.push(`Please click on the following link to verify your email address:<br>`);
        html.push('<br>');
        html.push(`<a href="http://clash-of-flags.com/verify/${ user.verificationToken }">Verify your account</a><br>`);
        html.push('<br>');
        html.push('Greetings from the team at <b>Clash of Flags</b>');

        return mailService.send(to, subject, html.join(''));
    }

    verify(token) {
        return userRepository.byToken(token)
            .then(user => {
                if(!user) {
                    return false;
                }

                user.verified = true;

                user.save();

                return true;
            });
    }

    login(username, password) {
        return userRepository.byNameOrEmail(username)
            .then(user => {
                if(!user) {
                    return false;
                }

                return hashService.compare(password, user.password)
                    .then(correctPassword => {
                        if(!correctPassword) {
                            return false;
                        }

                        const token = tokenService.sign({
                            id: user._id,
                            username: user.username
                        });

                        return {
                            token: token,
                            user: {
                                email: user.email,
                                username: user.username,
                                createdAt: user.createdAt
                            }
                        };
                    });
            });
    }
    
    saveExp(token, exp) {
        return tokenService.verify(token)
            .then(userData => {
                return userRepository.saveExp(userData.id, exp)
                    .catch(err => console.error(err));
            });
    }
    
    getExp(token) {
        return tokenService.verify(token)
            .then(userData => {
                return userRepository.byId(userData.id);
            })
            .then(user => {
                if(!user || !user.exp) {
                    return 0;
                }

                return user.exp;
            })
    }

}

module.exports = new UserService();