export default class TeamManager {
    constructor(game, $container) {
        this.name = name;
        this.teams = {};
    }

    add(team) {
        this.teams[team.name] = team;
    }

    hero() {
        return this.teams['red'][0];
    }
}