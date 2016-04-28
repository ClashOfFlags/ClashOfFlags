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
    const killLocations = [];

    stats.forEach(stat => {
        if (stat.key === 'player.dead') {
            addToTeam(stat, killsRed, killsBlue);

            if(stat.options && stat.options.x) {
                killLocations.push({
                    v: stat.team,
                    x: Math.round(stat.options.x),
                    y: Math.round((6400 - stat.options.y))
                });

            }
            return;
        }

        if (stat.key === 'flag.collected') {
            addToTeam(stat, flagsCollectedRed, flagsCollectedBlue);
            return;
        }

        if (stat.key === 'flag.captured') {
            addToTeam(stat, flagsCapturedRed, flagsCapturedBlue);
            return;
        }

    });


    var data = {
        kills: [
            dailyObjectToArray(killsRed),
            dailyObjectToArray(killsBlue)
        ],
        flagsCollected: [
            dailyObjectToArray(flagsCollectedRed),
            dailyObjectToArray(flagsCollectedBlue)
        ],
        flagsCaptured: [
            dailyObjectToArray(flagsCapturedRed),
            dailyObjectToArray(flagsCapturedBlue)
        ],
        killLocations: killLocations
    };

    console.log(data);

    return data;
}

function dailyObjectToArray(object) {
    var array = [];

    for (var i in object) {
        array.push({date: i, value: object[i]});
    }

    return array;
}

function addToTeam(stat, red, blue) {
    const teams = {
        red: red,
        blue: blue
    };
    const team = teams[stat.team];
    const date = moment(stat.createdAt).format('YYYY-MM-DD');

    if (!team[date]) {
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
                {'date': '2016-04-10', 'value': 40}
            ]
        ],
        killLocations: [
            [
                {v: 'blue', x: 370, y: 800 - 10},
                {v: 'blue', x: 400, y: 800 - 600},
                {v: 'blue', x: 800, y: 800 - 700},
                {v: 'blue', x: 500, y: 800 - 90},
                {v: 'blue', x: 390, y: 800 - 10},
                {v: 'red', x: 200, y: 800 - 20},
                {v: 'red', x: 420, y: 800 - 700},
                {v: 'red', x: 780, y: 800 - 90}
            ]
        ]
    };
}