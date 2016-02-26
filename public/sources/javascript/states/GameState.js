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

        this.load.tilemap('map', 'assets/tilemaps/map.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('gameTiles', 'assets/images/dungeon_tileset_32.png');
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
        this.game.physics.arcade.collide(this.player, this.blockedLayer);
        this.game.physics.arcade.collide(this.objects.cups, this.blockedLayer, this.destroy, null, this);
        this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);
        this.game.physics.arcade.overlap(this.player, this.fire, this.fireOn, null, this);
        this.game.physics.arcade.overlap(this.player, this.waterAreas, this.handleWater, null, this);

        this.player.body.velocity.x = 0;

        this.game.input.enabled = true;

        this.inputs.applyToPlayer(this.player);

    }

    collect(player, item) {
        this.player.setSpeed(this.player.getSpeed() + 100);
        item.kill();
    }

    handleWater(player, water) {
        player.reset(100, 100);
    }

    fireOn(player, fire) {
      fire.animations.play('on');
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
        this.objects.set('map', this.game.add.tilemap('map'));
        this.map = this.objects.get('map');

        //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
        this.map.addTilesetImage('dungeon_tileset_32', 'gameTiles');

        //create layer
        this.backgroundlayer = this.map.createLayer('backgroundLayer');
        this.blockedLayer = this.map.createLayer('blockedLayer');

        //collision on blockedLayer
        this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');


      /***************************
      ******     items     ******
      ***************************/
      this.createItems();
      this.createWaterAreas();

      this.explosions = this.game.add.group();
      this.explosions.createMultiple(50, 'explsoion');

      this.fire = this.game.add.group();
      this.fire.enableBody = true;
      var singleFire = this.fire.create(200, 150, 'fire');
      singleFire.animations.add('on', [0, 1, 2, 3], 10, true);
      singleFire.animations.add('off', [4], 0, false);
      singleFire.animations.play('off');
    }

    createPlayer() {
        var playerStartPos = this.objects.byType('playerStart', 'objectsLayer');
        this.player = new Hero(this.game, playerStartPos[0].x, playerStartPos[0].y, 'player');
        this.player.scale.x = 2;
        this.player.scale.y = 2;

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
            this.game.physics.arcade.moveToPointer(cup, 300);

            var targetAngle = this.game.math.angleBetween(cup.x + cup.width/2, cup.y + cup.height/2, this.game.input.activePointer.x, this.game.input.activePointer.y);

            cup.rotation = targetAngle;
            cup.pivot.x = cup.width * 0.5;
            cup.pivot.y = cup.height * 0.5;

            cup.x = cup.x  + cup.width / 2 + this.player.width / 2;
            cup.y = cup.y  + cup.height / 2 + this.player.height / 2;
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

    createWaterAreas() {
      this.waterAreas = this.game.add.group();
      this.waterAreas.enableBody = true;
      var result = this.findObjectsByType('water', this.map, 'objectsLayer');
      result.forEach(function(element){
        this.createWaterObject(element, this.waterAreas);
      }, this);
    }

    //create a sprite from an object
    createWaterObject(element, group) {
      var sprite = group.create(element.x, element.y, element.properties.sprite);

      sprite.animations.add('on', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
      sprite.animations.play('on');

      //copy all properties to the sprite
      Object.keys(element.properties).forEach(function(key){
        sprite[key] = element.properties[key];
      });
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
