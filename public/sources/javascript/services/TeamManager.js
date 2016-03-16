export default class TeamManager {
    constructor(game, $container) {
        this.game = game;
        this.$container = $container;
        this.teams = {};
        this.hero = null;
    }

    add(team) {
        this.teams[team.name] = team;
    }

    findPlayer(number) {
        return this.allPlayers()[number];
    }

    allPlayers() {
        var players = {};

        for (var teamName in this.teams) {
            for (var i in this.teams[teamName].players) {
                var player = this.teams[teamName].players[i];

                players[player.number] = player;
            }
        }



        return players;

    }

    findFreePlayer() {
        const allPlayers = this.allPlayers()
        for (var i in allPlayers) {
            const player = allPlayers[i];

            if (!player.networkId) {
                return player;
            }
        }

        return null;
    }
}