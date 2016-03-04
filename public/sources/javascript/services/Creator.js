import Team from './../objects/values/Team';
import config from './../setup/config';

export default class Creator {

    constructor(game, $container) {
        this.game = game;
        this.$container = $container;

        this.teamManager = $container.TeamManager;

    }

    run() {
        this.createTeams();
    }


    createTeams() {
        for (var teamName in config.game.teams) {
            var team = new Team(teamName);
            this.teamManager.add(team);
            this.createPlayersForTeam(team);
        }
    }

    createPlayersForTeam(team) {
        var playerStartPos = this.objects.byProperties({'type': 'spawn', team: team.name}, 'objectsLayer');

        for (var playerNumber in config.game.teams[team.name]) {
            this.player = this.playerFactory
                .position(playerStartPos[0])
                .team(team)
                .name(playerNumber)
                .key('player')
                .make();
        }
    }

}