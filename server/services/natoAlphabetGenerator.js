'use strict';

const _ = require('lodash');

const alphabet = [
    'Alpha',
    'Bravo',
    'Charlie',
    'Delta',
    'Echo',
    'Foxtrot',
    'Golf',
    'Hotel',
    'India',
    'Juliet',
    'Kilo',
    'Lima',
    'Mike',
    'November',
    'Oscar',
    'Papa',
    'Quebec',
    'Romeo',
    'Sierra',
    'Tango',
    'Uniform',
    'Victor',
    'Whiskey',
    'Xray',
    'Yankee',
    'Zulu'
];

class NatoAlphabetGenerator {

    generate() {
        var name = "";

        for (var i = 0; i != 2; i++) {
            var index = _.random(0, alphabet.length - 1);
            name += alphabet[index];
        }

        return name;
    }

}

module.exports = new NatoAlphabetGenerator();