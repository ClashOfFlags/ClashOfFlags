import State from './State';
import Hero from './../objects/sprites/Hero';
import TestCup from './../objects/sprites/TestCup';
import Item from './../objects/sprites/Item';

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
        this.game.physics.arcade.overlap(this.player, this.items, this.player.collect, null, this);
        this.game.physics.arcade.overlap(this.objects.cups, this.items, this.destroy, null, this);
        this.game.physics.arcade.overlap(this.player, this.waterAreas, this.handleWater, null, this);

        this.player.body.velocity.x = 0;

        this.game.input.enabled = true;

        this.inputs.applyToPlayer(this.player);
    }


    handleWater(player, water) {
        player.reset(100, 100);
    }

    destroy(cup, door) {
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
    }

    createPlayer() {
        var playerStartPos = this.objects.byType('playerStart', 'objectsLayer');
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

        this.game.input.onDown.add(() => {
            var cup = cups.getFirstDead();

            cup.reset(this.player.body.x, this.player.body.y);
            this.game.physics.arcade.moveToPointer(cup, 300);

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
        var result = this.objects.byType('water', 'objectsLayer');
        result.forEach(function (element) {
            this.createFromTiledObject(element, this.waterAreas);
        }, this);
    }

    //create a sprite from an object
    createFromTiledObject(element, group) {
        var sprite = group.create(element.x, element.y, element.properties.sprite);

        if (!element.properties.sprite) {
            sprite.body.setSize(element.width, element.height);
        }

        //copy all properties to the sprite
        Object.keys(element.properties).forEach(function (key) {
            sprite[key] = element.properties[key];
        });
    }

    createControls() {
        this.cursors = this.inputs.cursorKeys();
        this.wasd = this.inputs.wasd();

        this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.One);
    }
}
