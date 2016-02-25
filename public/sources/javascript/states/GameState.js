import State from './State';
import Hero from './../objects/Hero';
import TestCup from './../objects/TestCup';

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
        this.game.load.spritesheet('fire', 'assets/images/fire.png', 32, 32);
        this.game.load.spritesheet('water', 'assets/images/water.png', 32, 32);
        this.game.load.spritesheet('waterStone', 'assets/images/waterStone.png', 32, 32);
    }

    create() {

        /***************************
        ****    create map    *****
        ***************************/
        this.createMap();

        /***************************
        ****    create player  *****
        ***************************/
        this.createPlayer();

        /***************************
        *****    controls    ******
        ***************************/
        this.createControls();
    }

    update() {

      this.game.physics.arcade.collide(this.player, this.blockedLayer);
      this.game.physics.arcade.collide(this.objects.cups, this.blockedLayer, this.destroy, null, this);
      this.game.physics.arcade.overlap(this.player, this.fire, this.fireOn, null, this);
      this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);
      this.game.physics.arcade.overlap(this.objects.cups, this.items, this.destroy, null, this);
      this.game.physics.arcade.overlap(this.player, this.waterAreas, this.handleWater, null, this);


        this.player.body.velocity.x = 0;

        this.game.input.enabled = true;

        if (this.cursors.up.isDown || this.wasd.up.isDown) {
            if (this.player.body.velocity.y == 0)
                this.player.body.velocity.y -= this.player.getSpeed();
        }
        else if (this.cursors.down.isDown || this.wasd.down.isDown) {
            if (this.player.body.velocity.y == 0)
                this.player.body.velocity.y += this.player.getSpeed();
        }
        else {
            this.player.body.velocity.y = 0;
        }
        if (this.cursors.left.isDown || this.wasd.left.isDown) {
            this.player.body.velocity.x -= this.player.getSpeed();
        }
        else if (this.cursors.right.isDown || this.wasd.right.isDown) {
            this.player.body.velocity.x += this.player.getSpeed();
        }


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

    destroy(cup, door) {
      cup.kill();
    }

    createMap(){
      this.map = this.game.add.tilemap('map');
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

      this.fire = this.game.add.group();
      this.fire.enableBody = true;
      var singleFire = this.fire.create(200, 150, 'fire');
      singleFire.animations.add('on', [0, 1, 2, 3], 10, true);
      singleFire.animations.add('off', [4], 0, false);
      singleFire.animations.play('off');
    }

    createPlayer() {
      var playerStartPos = this.findObjectsByType('playerStart', this.map, 'objectsLayer');
      this.player = new Hero(this.game, playerStartPos[0].x, playerStartPos[0].y, 'player');
      this.player.scale.x = 2;
      this.player.scale.y = 2;

      /***************************
      ******     cups     ******
      ***************************/

      this.objects.cups = this.game.add.group();

      var cups = this.objects.cups;
      cups.enableBody = true;
      cups.physicsBodyType = Phaser.Physics.ARCADE;

      cups.createMultiple(50, 'cup');
      cups.setAll('checkWorldBounds', true);
      cups.setAll('outOfBoundsKill', true);

      this.game.input.onDown.add(() =>  {
          var cup = cups.getFirstDead();

          cup.reset(this.player.body.x, this.player.body.y);
          this.game.physics.arcade.moveToPointer(cup, 300);
      });
    }

    createItems() {
      this.items = this.game.add.group();
      this.items.enableBody = true;
      var result = this.findObjectsByType('item', this.map, 'objectsLayer');
      result.forEach(function(element){
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
      this.wasd = {
        up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
     };

      this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.One);
    }
}
