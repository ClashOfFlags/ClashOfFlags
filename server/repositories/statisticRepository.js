'use strict';

const StatEntry = require('../models/StatEntry');

class StatisticRepository {

    createEntry(key, team, options) {
        if(typeof options === 'undefined') options = {};

        const entry = new StatEntry({
            key: key,
            team: team,
            options: options
        });
        
        return entry.save()
            .then(savedEntry => {
                console.log(savedEntry);
            });
    }

    all() {
        return StatEntry.find({});
    }
    
}

module.exports = new StatisticRepository();