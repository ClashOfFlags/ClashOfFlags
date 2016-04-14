module.exports = {
    event: 'statistics',
    rules: {},
    handle
};

function handle(request) {
    var killsRed = [
        {'date' : '2016-04-01', 'value' : 10},
        {'date' : '2016-04-02', 'value' : 20},
        {'date' : '2016-04-03', 'value' : 70},
        {'date' : '2016-04-09', 'value' : 50},
        {'date' : '2016-04-10', 'value' : 100}
    ];

    var killsBlue = [
        {'date' : '2016-04-01', 'value' : 80},
        {'date' : '2016-04-02', 'value' : 30},
        {'date' : '2016-04-03', 'value' : 20},
        {'date' : '2016-04-09', 'value' : 150},
        {'date' : '2016-04-10', 'value' : 120}
    ];

    return {
        kills : [
            killsRed,
            killsBlue
        ]
    };
}