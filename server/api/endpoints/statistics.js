const statisticRepository = require('../../repositories/statisticRepository');
const moment = require('moment');

module.exports = {
    event: 'statistics',
    rules: {},
    handle
};

function* handle() {
    const stats = yield statisticRepository.all();
    const killsRed = {};
    const killsBlue = {};
    const flagsCollectedRed = {};
    const flagsCollectedBlue = {};
    const flagsCapturedRed = {};
    const flagsCapturedBlue = {};

    stats.forEach(stat => {
        if(stat.key === 'player.dead') {
            addToTeam(stat, killsRed, killsBlue);
            return;
        }

        if(stat.key === 'flag.collected') {
            addToTeam(stat, flagsCollectedRed, flagsCollectedBlue);
            return;
        }

        if(stat.key === 'flag.captured') {
            addToTeam(stat, flagsCapturedRed, flagsCapturedBlue);
            return;
        }
    });

    return {
        kills: [
            killsRed,
            killsBlue
        ],
        flagsCollected: [
            flagsCollectedRed,
            flagsCollectedBlue
        ],
        flagsCaptured: [
            flagsCapturedRed,
            flagsCapturedBlue
        ]
    };
}

function addToTeam(stat, red, blue) {
    const teams = {
        red: red,
        blue: blue
    };
    const team = teams[stat.team];
    const date = moment(stat.createdAt).format('YYYY-MM-DD');

    if(!team[date]) {
        team[date] = 0;
    }

    team[date]++;
}