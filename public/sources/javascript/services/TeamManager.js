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
        return this.teams['red'].players[0];
    }
}