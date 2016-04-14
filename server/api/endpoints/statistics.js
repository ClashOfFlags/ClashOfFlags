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

function testData() {
    return {
        kills: [
            [
                {'date': '2016-04-01', 'value': 10},
                {'date': '2016-04-02', 'value': 20},
                {'date': '2016-04-03', 'value': 70},
                {'date': '2016-04-09', 'value': 50},
                {'date': '2016-04-10', 'value': 100}
            ]
            , [
                {'date': '2016-04-01', 'value': 80},
                {'date': '2016-04-02', 'value': 30},
                {'date': '2016-04-03', 'value': 20},
                {'date': '2016-04-09', 'value': 150},
                {'date': '2016-04-10', 'value': 120}
            ]
        ],
        flagsCollected: [
            [
                {'date': '2016-04-01', 'value': 10},
                {'date': '2016-04-02', 'value': 20},
                {'date': '2016-04-03', 'value': 70},
                {'date': '2016-04-09', 'value': 50},
                {'date': '2016-04-10', 'value': 100}
            ]
            ,
            [
                {'date': '2016-04-01', 'value': 80},
                {'date': '2016-04-02', 'value': 30},
                {'date': '2016-04-03', 'value': 20},
                {'date': '2016-04-09', 'value': 150},
                {'date': '2016-04-10', 'value': 120}
            ]
        ],
        flagsCaptured: [
            [
                {'date': '2016-04-01', 'value': 1},
                {'date': '2016-04-02', 'value': 2},
                {'date': '2016-04-03', 'value': 7},
                {'date': '2016-04-09', 'value': 6},
                {'date': '2016-04-10', 'value': 10}
            ]
            , [
                {'date': '2016-04-01', 'value': 7},
                {'date': '2016-04-02', 'value': 3},
                {'date': '2016-04-03', 'value': 2},
                {'date': '2016-04-09', 'value': 10},
                {'date': '2016-04-10', 'value': 78}
            ]
        ],
        killLocations: [
            [
                {u: 'blue', x: 370, y: 800 - 10},
                {u: 'blue', x: 400, y: 800 - 600},
                {u: 'blue', x: 800, y: 800 - 700},
                {u: 'blue', x: 500, y: 800 - 90},
                {u: 'blue', x: 390, y: 800 - 10},
                {u: 'red', x: 200, y: 800 - 20},
                {u: 'red', x: 420, y: 800 - 700},
                {u: 'red', x: 780, y: 800 - 90}
            ]
        ]
    };
}