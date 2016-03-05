import State from './State';
import Hero from './../objects/sprites/Hero';
import Player from './../objects/sprites/Player';
import TestCup from './../objects/sprites/TestCup';
import PlayerFactory from './../factories/PlayerFactory';

export default class GameState extends State {
    constructor(game, $container) {
        super();

        this.player = {};

        this.inputs = $container.InputService;
        this.paths = $container.PathService;
        this.objects = $container.ObjectsService;
        this.preloader = $container.Preloader;
        this.playerFactory = $container.PlayerFactory;


        /*
         pause() and unpause() will be called from Game.vue component
         If input is enabled on e.g. Login or Register page the form inputs will not work
         */
        window.clashOfFlags = {
            pause() {
                game.input.enabled = false;
                game.physics.arcade.isPaused = true;
            },
            unpause() {
                game.input.enabled = true;
                game.physics.arcade.isPaused = false;
            }
        };
    }

    preload() {
        this.preloader.run(this);

    }

    create() {
        window.clashOfFlags.pause();
        this.createMap();
        this.createPlayer();
        this.createControls();
    }

    update() {
        this.game.physics.arcade.collide(this.player, this.obstacleLayer);
        this.game.physics.arcade.collide(this.player.weapon.bullets, this.obstacleLayer, this.bulletHitObstacle, null, this);

        this.inputs.applyToPlayer(this.player);

    }

    bulletHitObstacle(bullet, obstacle) {
        var singleExplosion = this.explosions.getFirstDead();
        singleExplosion = this.explosions.create(bullet.body.x, bullet.body.y, 'explosion');
        singleExplosion.animations.add('fire', Phaser.Animation.generateFrameNames('fireball_hit_000', 1, 9), 100, false);
        singleExplosion.animations.play('fire');

        singleExplosion.events.onAnimationComplete.add(function () {
            singleExplosion.kill();
        }, this);

        bullet.kill();
    }

    createMap() {
        this.game.world.setBounds(0, 0, 6400, 6400);

        this.objects.set('map', this.game.add.tilemap('map'));
        this.map = this.objects.get('map');

        //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
        this.map.addTilesetImage('dungeon_tileset_64');
        this.map.addTilesetImage('objects_tilset_64');

        //create layer
        this.backgroundlayer = this.map.createLayer('background');
        this.obstacleLayer = this.map.createLayer('obstacle');
        this.decorationslayer = this.map.createLayer('decorations');

        this.backgroundlayer.resizeWorld();
        this.obstacleLayer.resizeWorld();
        this.decorationslayer.resizeWorld();

        //collision on obstacleLayer
        this.map.setCollisionBetween(1, 2000, true, 'obstacle');


        /***************************
         ******     items     ******
         ***************************/
        this.createObjects();

        this.explosions = this.game.add.group();
        this.explosions.createMultiple(50, 'explosion');
    }

    createPlayer() {
        var playerStartPos = this.objects.byType('spawn', 'objectsLayer');

        this.player = this.playerFactory
            .position(playerStartPos[0])
            .team('red')
            .key('player')
            .make();

        this.game.camera.follow(this.player);
    }

    createObjects() {
        this.torchGroup = this.game.add.group();
        this.torchGroup.enableBody = true;
        var result = this.objects.byType('torch', 'objectsLayer');
        result.forEach(function (element) {
            var torch = this.torchGroup.create(element.x, element.y, "torch");
            torch.animations.add('on', [0, 1, 2, 3], 10, true);
            torch.animations.play('on');
        }, this);
    }

    createControls() {
        this.cursors = this.inputs.cursorKeys();
        this.wasd = this.inputs.wasd();
        this.space = this.inputs.space();

        this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.One);

        this.space.onDown.add(() => {
          this.player.shoot();
        });
    }
}
