'use strict';

const StatEntry = require('../models/StatEntry');

class StatisticRepository {

    createEntry(key, team) {
        const entry = new StatEntry({
            key: key,
            team: team
        });
        
        return entry.save();
    }
    
}

module.exports = new StatisticRepository();