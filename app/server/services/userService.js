'use strict';

const hashService = require('./hashService');
const mailService = require('./mailService');
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

}

module.exports = new UserService();