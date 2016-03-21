'use strict';

const mailgun = require('mailgun-js');
const apiKey = process.env.MAILGUN_API_KEY;
const mailgunApi = mailgun({ apiKey: apiKey, domain: 'clash-of-flags.com' });

if(!apiKey) {
    console.warn('MAILGUN_API_KEY missing in .env file!');
}

class MailService {

    send(to, subject, html) {
        const mailData = {
            from: 'Clash of Flags <welcome@clash-of-flags.com>',
            to: to,
            subject: subject,
            html: html
        };

        return new Promise((resolve, reject) => {
            mailgunApi.messages().send(mailData, (err, body) => {
                if(err) {
                    return reject(err);
                }

                return resolve(body);
            });
        });
    }

}

module.exports = new MailService();