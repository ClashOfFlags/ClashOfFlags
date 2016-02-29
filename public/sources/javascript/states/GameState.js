import State from './State';
import Hero from './../objects/sprites/Hero';
import TestCup from './../objects/sprites/TestCup';

export default class GameState extends State {
    constructor(game, $container) {
        super();

        this.player = {};

        this.inputs = $container.InputService;
        this.paths = $container.PathService;
        this.objects = $container.ObjectsService;

    }

    preload() {

        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.load.tilemap('map', 'assets/tilemaps/map_philipp.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('dungeon_tileset_64', 'assets/images/dungeon_tileset_64.png');
        this.load.image('objects_tilset_64', 'assets/images/objects_tilset_64.png');
        this.game.load.image('player', this.paths.image('player.png'));
        this.game.load.image('cup', this.paths.image('bluecup.png'));
        this.game.load.image('bullet', this.paths.image('flamer_projectile.png'));
        this.game.load.atlasJSONHash('explosion', 'assets/images/onfireanimation.png', 'assets/images/onfireanimation.json');
        this.game.load.spritesheet('fire', 'assets/images/fire.png', 32, 32);
        this.game.load.spritesheet('water', 'assets/images/water.png', 32, 32);
        this.game.load.spritesheet('waterStone', 'assets/images/waterStone.png', 32, 32);
    }

    create() {
        this.createMap();
        this.createPlayer();
        this.createControls();
    }

    update() {
        this.game.physics.arcade.collide(this.player, this.obstacleLayer);
        this.game.physics.arcade.collide(this.objects.cups, this.obstacleLayer, this.destroy, null, this);

        this.player.body.velocity.x = 0;

        this.game.input.enabled = true;

        this.inputs.applyToPlayer(this.player);

    }

    destroy(cup, obstacle) {

        var singleExplosion = this.explosions.getFirstDead();
        singleExplosion = this.explosions.create(cup.x, cup.y, 'explosion');
        singleExplosion.animations.add('fire', Phaser.Animation.generateFrameNames('onfire_000', 1, 9), 100, false);
        singleExplosion.scale.x = 0.7;
        singleExplosion.scale.y = 0.7;
        singleExplosion.x = singleExplosion.x - singleExplosion.width / 2;
        singleExplosion.y = singleExplosion.y - singleExplosion.height / 2;
        singleExplosion.animations.play('fire');
        singleExplosion.animations.play('fire');

        singleExplosion.events.onAnimationComplete.add(function () {
          singleExplosion.kill();
        }, this);

        cup.kill();
    }

    createMap() {
        this.game.world.setBounds(0, 0, 6400, 6400);

        // this.objects.set('map', this.game.add.tilemap('map'));
        // this.map = this.objects.get('map');
        this.map = this.game.add.tilemap('map');

        //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
        this.map.addTilesetImage('dungeon_tileset_64');
        this.map.addTilesetImage('objects_tilset_64');

        //create layer
        this.backgroundlayer = this.map.createLayer('background');
        this.obstacleLayer = this.map.createLayer('obstacle');
        this.decorationslayer = this.map.createLayer('decorations');

        //collision on obstacleLayer
        this.map.setCollisionBetween(1, 2000, true, 'obstacle');


      /***************************
      ******     items     ******
      ***************************/
      // this.createItems();

      this.explosions = this.game.add.group();
      this.explosions.createMultiple(50, 'explosion');
    }

    createPlayer() {
        // var playerStartPos = this.objects.byType('playerStart', 'objectsLayer');
        // var playerStartPos = this.findObjectsByType('', this.map, 'objectsLayer');
        // this.player = new Hero(this.game, playerStartPos[0].x, playerStartPos[0].y, 'player');
        this.player = new Hero(this.game, 100, 100, 'player');
        this.player.scale.x = 4;
        this.player.scale.y = 4;

        this.game.camera.follow(this.player);

        /***************************
         ******     cups     ******
         ***************************/

        this.objects.cups = this.game.add.group();

        var cups = this.objects.cups;
        cups.enableBody = true;
        cups.physicsBodyType = Phaser.Physics.ARCADE;

        cups.createMultiple(50, 'bullet');
        cups.setAll('checkWorldBounds', true);
        cups.setAll('outOfBoundsKill', true);

        this.game.input.onDown.add(() => {
            var cup = cups.getFirstDead();

            cup.reset(this.player.body.x - cup.width / 2, this.player.body.y - cup.height / 2);
            this.game.physics.arcade.moveToPointer(cup, 2000);

            var targetAngle = this.game.math.angleBetween(cup.center.x, cup.center.y, this.game.input.activePointer.x, this.game.input.activePointer.y);

            cup.rotation = targetAngle;
            cup.pivot.x = cup.width * 0.5;
            cup.pivot.y = cup.height * 0.5;

            cup.x = cup.center.x + this.player.center.x;
            cup.y = cup.center.y + this.player.center.y;
      });
    }

    createItems() {
        this.items = this.game.add.group();
        this.items.enableBody = true;
        var result = this.objects.byType('item', 'objectsLayer');
        result.forEach(function (element) {
            this.createFromTiledObject(element, this.items);
        }, this);
    }

    //find objects in a Tiled layer that containt a property called "type" equal to a certain value
    findObjectsByType(type, map, layer) {
      var result = [];
      map.objects[layer].forEach(function(element){
        if(element.properties.type === type) {
          element.y -= map.tileHeight;
          result.push(element);
        }
      });
      return result;
    }

    //create a sprite from an object
    createFromTiledObject(element, group) {
        var sprite = group.create(element.x, element.y, element.properties.sprite);

      //copy all properties to the sprite
      Object.keys(element.properties).forEach(function(key){
        sprite[key] = element.properties[key];
      });
    }

    createControls() {
        this.cursors = this.inputs.cursorKeys();
        this.wasd = this.inputs.wasd();

        this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.One);
    }
}
