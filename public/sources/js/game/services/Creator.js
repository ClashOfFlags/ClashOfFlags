import Team from './../objects/values/Team';
import config from './../setup/config';
import Flag from './../objects/sprites/Flag';
import Item from './../objects/sprites/Item';
import Base from './../objects/sprites/Base';
import TreasureChest from './../objects/sprites/TreasureChest';

export default class Creator {

    constructor(game, $container) {
        this.game = game;
        this.$container = $container;

        this.inputs = $container.InputService;
        this.objects = this.$container.ObjectsService;
        this.network = $container.NetworkService;
        this.playerFactory = this.$container.PlayerFactory;
        this.teamManager = $container.TeamManager;
        this.tutorial = $container.Tutorial;
    }

    run() {
        this.createMap();
        this.createTorchs();
        this.createPlayerGroup();
        this.createBulletGroup();
        this.createTeams();
        this.createFlags();
        this.createItem('barrel');
        this.createTreasureChest();
        this.createMiniMap();
        this.createStatusbar();
        this.createTutorialHints();
        this.createBases();


        eventSystem().on('network.handshake:after', (payload) => {
            this.player = payload.hero;
            this.game.camera.follow(this.player);
            this.objects.set('hero', payload.hero);
            this.createControls();

        });

        this.network.connect();
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
            this.tutorial.hideShootHint();
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

    createTreasureChest() {
        var group = this.game.add.group();
        var id = 1;
        group.enableBody = true;

        var result = this.objects.byType('treasureChest', 'objectsLayer');
        result.forEach(function (element) {
            var sprite = new TreasureChest(this.game, element.x, element.y, 'treasureChest_full');
            sprite.anchor.setTo(0.5, 0.5);
            sprite.setID(id);
            group.add(sprite);
            this.objects.set('treasureChest.' + id, sprite);
            id++;
        }, this);

        this.objects.set('treasureChests', group);
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
                .key('player_'+team.name+'_pistol')
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
                var flag = new Flag(this.game, element.x, element.y, 'flag_' + teamName);
                flag.setTeam(teamName);
                flag.setSpawn(element.x, element.y);
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

    createBulletGroup() {
        var bulletGroup = this.game.add.group();
        bulletGroup.enableBody = true;

        this.objects.set('bulletGroup', bulletGroup);
    }

    createStatusbar() {
      var graphics = this.game.add.graphics();
      graphics.beginFill(0xffffff);
      graphics.drawRect(0, 40, 800, 3);
      graphics.drawRect(400, 0, 3, 40);
      graphics.endFill();
      graphics.fixedToCamera = true;
      window.graphics = graphics;

      for (var teamName in this.teamManager.teams) {
        var style = { font: "23px Arial", fill: (teamName === "red") ? "#f00" : "#00f", align: "center"};
        var text = this.game.add.text((teamName === "red") ? 150 : 600, 5, this.teamManager.teams[teamName].points + "/" + this.teamManager.maxPoints, style);
        text.fixedToCamera = true;
        this.objects.set('points.' + teamName, text);

        for (var i = 0; i < 3; i++) {
          var flag = this.game.add.sprite((teamName === "red") ? 300 + 30 * i: 410 + 30 * i, 5, 'flag_' + teamName);
          flag.fixedToCamera = true;
          this.objects.set('statusFlag' + i + '.' + teamName, flag);
        }
      }
    }

    createTutorialHints(){
      this.createMoveHint();
      this.createShootHint();
      this.createMapHint();
    }

    createMapHint() {
      var graphics = this.game.add.graphics();
      var mapHint = this.game.add.group();
      var style = { font: "18px Arial", fill: "#fff"};

      var startHintX = 250;
      var startHintY = 470;

      graphics.beginFill(0xffffff);
      graphics.drawRect(startHintX, startHintY, 510, 60);
      graphics.endFill();

      var text = this.game.add.text(startHintX + 10, startHintY + 5, "There are two teams in this game. \nYou have to steal all the flags out of the enemy‘s base.", style);
      text.fixedToCamera = true;
      mapHint.add(text);

      graphics.beginFill(0xff0000);
      graphics.drawCircle(110, 410, 60);
      graphics.endFill();

      graphics.beginFill(0x0000ff);
      graphics.drawCircle(110, 570, 60);
      graphics.endFill();

      var startX = 160;
      var startY = 430;
      var width = 30;
      var height = 120;

      graphics.beginFill(0xffff00);
      graphics.moveTo(startX, startY);
      graphics.lineTo(startX - width, startY + height/4);
      graphics.lineTo(startX - width / 2, startY + height/4);
      graphics.lineTo(startX - width / 2, startY + height - height/4);
      graphics.lineTo(startX - width, startY + height - height/4);
      graphics.lineTo(startX, startY + height);
      graphics.lineTo(startX + width, startY + height - height/4);
      graphics.lineTo(startX + width / 2, startY + height - height/4);
      graphics.lineTo(startX + width / 2, startY + height/4);
      graphics.lineTo(startX + width, startY + height/4);
      graphics.endFill();

      graphics.alpha = 0.5;
      graphics.fixedToCamera = true;
      window.graphics = graphics;
      mapHint.add(graphics);

      this.objects.set('mapHint', mapHint);

      mapHint.visible = false;
    }

    createShootHint() {
      var graphics = this.game.add.graphics();
      var shootHint = this.game.add.group();
      var style = { font: "18px Arial", fill: "#fff"};

      var startHintX = 10;
      var startHintY = 60;

      graphics.beginFill(0xffffff);
      graphics.drawRect(startHintX, startHintY, 250, 90);
      graphics.endFill();

      var text = this.game.add.text(90, startHintY + 5, "shoot with", style);
      text.fixedToCamera = true;
      shootHint.add(text);

      graphics.beginFill(0xffff00);
      graphics.drawRect(startHintX + 10, startHintY + 40, 230, 30);
      graphics.endFill();

      var text = this.game.add.text(110, startHintY + 45, "space", style);
      text.fixedToCamera = true;
      shootHint.add(text);

      graphics.alpha = 0.5;
      graphics.fixedToCamera = true;
      window.graphics = graphics;
      shootHint.add(graphics);

      this.objects.set('shootHint', shootHint);

      shootHint.visible = false;
    }

    createMoveHint() {
      var graphics = this.game.add.graphics();
      var moveHint = this.game.add.group();
      var style = { font: "18px Arial", fill: "#fff"};

      var startHintX = 10;
      var startHintY = 60;

      graphics.beginFill(0xffffff);
      graphics.drawRect(startHintX, startHintY, 250, 150);
      graphics.endFill();

      var keyWidth = 30;
      var keyStartY = startHintX + 160;
      var keyStartX;

      for (var i = 0; i < 2; i++) {
        keyStartX = 130 * i + startHintX + 10;
        graphics.beginFill(0xffff00);
        graphics.drawRect(keyStartX, keyStartY, keyWidth, keyWidth);
        var text = this.game.add.text(keyStartX + ((i === 0)? 8: 7), keyStartY + 2, (i === 0)? "A": "←", style);
        text.fixedToCamera = true;
        moveHint.add(text);
        graphics.drawRect(keyStartX + keyWidth + 5, keyStartY, keyWidth, keyWidth);
        var text = this.game.add.text(keyStartX + ((i === 0)? 8: 10) + keyWidth + 5, keyStartY + 2, (i === 0)? "S": "↓", style);
        text.fixedToCamera = true;
        moveHint.add(text);
        graphics.drawRect(keyStartX + keyWidth + 5, keyStartY - keyWidth - 5, keyWidth, keyWidth);
        var text = this.game.add.text(keyStartX + ((i === 0)? 7: 10) + keyWidth +5, keyStartY + 2 - keyWidth - 5, (i === 0)? "W": "↑", style);
        text.fixedToCamera = true;
        moveHint.add(text);
        graphics.drawRect(keyStartX + keyWidth * 2 + 10, keyStartY, keyWidth, keyWidth);
        var text = this.game.add.text(keyStartX + 7 + keyWidth * 2 + 10, keyStartY + 2, (i === 0)? "D": "→", style);
        text.fixedToCamera = true;
        moveHint.add(text);
        graphics.endFill();
      }

      var text = this.game.add.text(90, startHintY + 5, "move with", style);
      text.fixedToCamera = true;
      moveHint.add(text);
      var text = this.game.add.text(130, startHintY + 40, "or", style);
      text.fixedToCamera = true;
      moveHint.add(text);

      graphics.alpha = 0.5;
      graphics.fixedToCamera = true;
      window.graphics = graphics;
      moveHint.add(graphics);

      this.objects.set('moveHint', moveHint);
    }

    createBases() {
        var baseGroup = this.game.add.group();
        baseGroup.enableBody = true;
        var bases = this.objects.byProperties({'type': 'gold'}, 'objectsLayer');
        bases.forEach(function (element) {
            var base = new Base(this.game, element.x, element.y, 'gold');
            base.setTeam(element.properties.team);
            baseGroup.add(base);
        }, this);
        this.objects.set('bases', baseGroup);
    }
}
