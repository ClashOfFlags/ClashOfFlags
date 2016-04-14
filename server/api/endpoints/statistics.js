module.exports = {
    event: 'statistics',
    rules: {},
    handle
};

function handle(request) {

    return testData();
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