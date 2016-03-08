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
        this.creator = $container.Creator;
        this.playerFactory = $container.PlayerFactory;
        this.network = $container.NetworkService;
        window.clashOfFlags = this; // Publish GameState to window, Vue App needs to access pause() and unpause()
        this.teamManager = $container.TeamManager;
    }

    preload() {
        this.preloader.run(this);

    }

    create() {
        this.initPauseState();

        this.createMap();

        this.creator.run();

        this.player = this.teamManager.hero();

        this.createPlayer();
        this.createControls();
        this.network.init();
    }


    update() {
        this.game.physics.arcade.collide(this.player, this.obstacleLayer);
        this.game.physics.arcade.collide(this.player.weapon.bullets, this.obstacleLayer, this.bulletHitObstacle, null, this);

        this.inputs.applyToPlayer(this.player);
        this.network.sendPosition(this.player);
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

        this.explosions = this.game.add.group();
        this.explosions.createMultiple(50, 'explosion');
    }

    createPlayer() {

        this.game.camera.follow(this.player);
    }


    createControls() {
        this.cursors = this.inputs.cursorKeys();
        this.wasd = this.inputs.wasd();
        this.space = this.inputs.space();

        this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.One);

        this.space.onDown.add(() => {
            this.player.shoot();
            console.log('send shoot');
            this.network.sendShoot(this.player);
        });
    }

    pause() {
        this.game.input.enabled = false;
        this.game.physics.arcade.isPaused = true;
    }

    unpause() {
        this.game.input.enabled = true;
        this.game.physics.arcade.isPaused = false;
    }

    initPauseState() {
        const isGameDivVisible = $('#game').is(':visible');

        if (isGameDivVisible) {
            this.unpause();
            return;
        }

        this.pause();
    }

}
