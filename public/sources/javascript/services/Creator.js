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

        this.createMiniMap();

    }

    createMiniMap() {
      this.map = this.objects.get('map');
      this.miniMapSize = 2;      

      var miniMapBmd = this.game.add.bitmapData();

      for (var l = 0; l<this.map.layers.length; l++) {
        for (var y = 0; y < this.map.height; y++) {
          for (var x = 0; x < this.map.width; x++) {
            var tile = this.map.getTile(x, y, l);
            if (tile && this.map.layers[l].name == 'background') {
              miniMapBmd.ctx.fillStyle = '#1D2A34';
              miniMapBmd.ctx.fillRect(x * this.miniMapSize, y * this.miniMapSize, this.miniMapSize, this.miniMapSize);
             }else if (tile && this.map.layers[l].name == 'water') {
              miniMapBmd.ctx.fillStyle = '#0000ff';
              miniMapBmd.ctx.fillRect(x * this.miniMapSize, y * this.miniMapSize, this.miniMapSize, this.miniMapSize);
            }else if (tile && this.map.layers[l].name == 'obstacle') {
               miniMapBmd.ctx.fillStyle = '#cccccc';
               miniMapBmd.ctx.fillRect(x * this.miniMapSize, y * this.miniMapSize, this.miniMapSize, this.miniMapSize);
             }
           }
         }
       }
       this.miniMap = this.game.add.sprite(10,390, miniMapBmd);
       this.miniMap.fixedToCamera = true;

       var miniMapOverlayBmd = this.game.add.bitmapData();
       this.miniMapOverlay = this.game.add.sprite(10,390, miniMapOverlayBmd);
       this.miniMapOverlay.fixedToCamera = true;

       this.objects.set('miniMapOverlay', miniMapOverlayBmd);
       this.objects.set('miniMapSize', this.miniMapSize);
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
