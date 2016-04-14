'use strict';

const StatEntry = require('../models/StatEntry');

class StatisticRepository {

    createEntry(key, team) {
        const entry = new StatEntry({
            key: key,
            team: team
        });
        
        return entry.save()
            .then(savedEntry => {
                console.log(savedEntry);
            });
    }
    
}

module.exports = new StatisticRepository();