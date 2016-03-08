export default class TeamManager {
    constructor(game, $container) {
        this.game = game;
        this.$container = $container;
        this.teams = {};
    }

    add(team) {
        this.teams[team.name] = team;
    }

    hero() {
        return this.teams['red'].players[1];
    }

    findPlayer(number) {
        //TODO: iterate through teams and search for player with the number number
    }

    allPlayers() {

        var players = {};

        for (var teamName in this.teams) {
            for (var i in this.teams[teamName].players) {
                const player = this.teams[teamName].players[i];

                players[player.number] = player;
            }
        }

        return players;

    }
}