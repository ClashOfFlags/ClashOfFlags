import Team from './../objects/values/Team';
import config from './../setup/config';
import Flag from './../objects/sprites/Flag';
import Item from './../objects/sprites/Item';

export default class Creator {

    constructor(game, $container) {
        this.game = game;
        this.$container = $container;

        this.inputs = $container.InputService;
        this.objects = this.$container.ObjectsService;
        this.network = $container.NetworkService;
        this.playerFactory = this.$container.PlayerFactory;
        this.teamManager = $container.TeamManager;

    }

    run() {

        this.createMap();
        this.createTorchs();
        this.createPlayerGroup();
        this.createTeams();
        this.createFlags();
        this.createItem('barrel');
        this.createMiniMap();
        this.network.connect();

        this.network.waitForHandshake = (hero)=> {
            this.player = hero;
            this.game.camera.follow(this.player);
            this.objects.set('hero', hero);
            this.createControls();
        }
    }


    createMap() {
        this.game.world.setBounds(0, 0, 6400, 6400);

        this.objects.set('map', this.game.add.tilemap('map'));
        this.map = this.objects.get('map');

        //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
        this.map.addTilesetImage('dungeon_tileset_64');
        this.map.addTilesetImage('objects_tilset_64');

        //create layer
        this.backgroundLayer = this.map.createLayer('background');
        this.waterLayer = this.map.createLayer('water');
        this.obstacleLayer = this.map.createLayer('obstacle');
        this.decorationsLayer = this.map.createLayer('decorations');

        //collision on obstacleLayer
        this.map.setCollisionBetween(1, 2000, true, 'obstacle');
        this.map.setCollisionBetween(1, 2000, true, 'water');

        this.objects.set({
            obstacleLayer: this.obstacleLayer,
            waterLayer: this.waterLayer
        })
    }


    createControls() {
        this.cursors = this.inputs.cursorKeys();
        this.wasd = this.inputs.wasd();
        this.space = this.inputs.space();

        this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.One);

        this.space.onDown.add(() => {
            this.player.shoot();
            this.network.sendShoot(this.player);
        });
    }

    createItem(item) {
        var group = this.game.add.group();
        group.enableBody = true;

        var result = this.objects.byType(item, 'objectsLayer');
        result.forEach(function (element) {
            var sprite = new Item(this.game, element.x, element.y, item);
            sprite.anchor.setTo(0.5, 0.5);
            group.add(sprite);
        }, this);

        this.objects.set(item + 's', group);
    }

    createMiniMap() {
        this.map = this.objects.get('map');
        this.miniMapSize = 2;

        var miniMapBmd = this.game.add.bitmapData();

        for (var l = 0; l < this.map.layers.length; l++) {
            for (var y = 0; y < this.map.height; y++) {
                for (var x = 0; x < this.map.width; x++) {
                    var tile = this.map.getTile(x, y, l);
                    if (tile && this.map.layers[l].name == 'background') {
                        miniMapBmd.ctx.fillStyle = '#1D2A34';
                        miniMapBmd.ctx.fillRect(x * this.miniMapSize, y * this.miniMapSize, this.miniMapSize, this.miniMapSize);
                    } else if (tile && this.map.layers[l].name == 'water') {
                        miniMapBmd.ctx.fillStyle = '#0000ff';
                        miniMapBmd.ctx.fillRect(x * this.miniMapSize, y * this.miniMapSize, this.miniMapSize, this.miniMapSize);
                    } else if (tile && this.map.layers[l].name == 'obstacle') {
                        miniMapBmd.ctx.fillStyle = '#cccccc';
                        miniMapBmd.ctx.fillRect(x * this.miniMapSize, y * this.miniMapSize, this.miniMapSize, this.miniMapSize);
                    }
                }
            }
        }
        this.miniMap = this.game.add.sprite(10, 390, miniMapBmd);
        this.miniMap.fixedToCamera = true;

        var miniMapOverlayBmd = this.game.add.bitmapData();
        this.miniMapOverlay = this.game.add.sprite(10, 390, miniMapOverlayBmd);
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

    createTorchs() {
        var torchGroup = this.game.add.group();
        torchGroup.enableBody = true;

        var result = this.objects.byType('torch', 'objectsLayer');
        result.forEach(function (element) {
            var torch = torchGroup.create(element.x, element.y, "torch");
            torch.animations.add('on', [0, 1, 2, 3], 10, true);
            torch.animations.play('on');
        }, this);
    }

    createFlags() {
        for (var teamName in config.game.teams) {
            var flagGroup = this.game.add.group();
            flagGroup.enableBody = true;
            var flags = this.objects.byProperties({'type': 'flag_' + teamName}, 'objectsLayer');

            flags.forEach(function (element) {
                var flag = new Flag(this.game, element.x, element.y, 'flag');
                flag.setTeam(teamName);
                flagGroup.add(flag);
            }, this);

            this.objects.set('flags.' + teamName, flagGroup);
        }
    }

    createPlayerGroup() {
        var playerGroup = this.game.add.group();
        playerGroup.enableBody = true;

        this.objects.set('playerGroup', playerGroup);
    }
}
