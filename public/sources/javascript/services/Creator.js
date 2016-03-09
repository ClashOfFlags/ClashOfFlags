import Team from './../objects/values/Team';
import config from './../setup/config';

export default class Creator {

    constructor(game, $container) {
        this.game = game;
        this.$container = $container;

        this.objects = this.$container.ObjectsService;
        this.playerFactory = this.$container.PlayerFactory;

        this.teamManager = $container.TeamManager;

    }

    run() {
        this.createObjects();

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
        var spawns = this.objects.byProperties({'type': 'spawn', team: team.name}, 'objectsLayer');

        for (var i in config.game.teams[team.name]) {
            var playerNumber = config.game.teams[team.name][i];

            const spawn = _.find(spawns, function (current_spawn) {
                return current_spawn.properties.player == playerNumber;
            });

            const player = this.playerFactory
                .position(spawn)
                .team(team)
                .number(playerNumber)
                .key('player')
                .make();

            this.objects.set('player.' + playerNumber, player);

        }
    }

    createObjects() {
        var torchGroup = this.game.add.group();
        torchGroup.enableBody = true;

        var result = this.objects.byType('torch', 'objectsLayer');
        result.forEach(function (element) {
            var torch = torchGroup.create(element.x, element.y, "torch");
            torch.animations.add('on', [0, 1, 2, 3], 10, true);
            torch.animations.play('on');
        }, this);
    }

    createControls() {
        this.cursors = this.inputs.cursorKeys();
        this.wasd = this.inputs.wasd();

        this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.One);
    }

}