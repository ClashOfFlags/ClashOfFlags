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

        this.miniMapOverlay = this.objects.get('miniMapOverlay');
        this.miniMapSize = this.objects.get('miniMapSize');

    }


    update() {
        this.game.physics.arcade.collide(this.player, this.obstacleLayer);
        this.game.physics.arcade.collide(this.player, this.waterlayer);
        this.game.physics.arcade.collide(this.player, this.objects.get('barrels'));
        this.game.physics.arcade.overlap(this.player.weapon.bullets, this.objects.get('barrels'), this.bulletHitBarrel, null, this);
        this.game.physics.arcade.collide(this.objects.get('barrels'), this.obstacleLayer);
        this.game.physics.arcade.collide(this.player.weapon.bullets, this.obstacleLayer, this.bulletHitObstacle, null, this);

        this.inputs.applyToPlayer(this.player);
        this.network.sendPosition(this.player);

        this.updateMiniMap();
    }

    updateMiniMap() {

      this.miniMapOverlay.context.clearRect(0, 0, this.miniMapOverlay.width, this.miniMapOverlay.height);

      this.miniMapOverlay.rect(
        Math.floor(this.player.x / 64) * this.miniMapSize,
        Math.floor(this.player.y / 64) * this.miniMapSize,
        this.miniMapSize * 2, this.miniMapSize * 2, '#FFFF00');
      this.miniMapOverlay.dirty = true;

    }

    bulletHitBarrel(bullet, barrel) {
      this.bulletHitObstacle(bullet);

      this.createExplosionAnimation({
        x: barrel.x,
        y: barrel.y - barrel.height,
        key: 'flame_a',
        frameName: 'flame_a_000',
        frameNameMax: 6,
        frameSpeed:60,
        repeat: false,
        scale: 0.4
      });
      barrel.kill();
    }

    createExplosionAnimation(data) {
      var sprite = this.game.add.sprite(data.x, data.y, data.key);
      sprite.anchor.setTo(0.5, 0.5);
      sprite.scale.x = data.scale;
      sprite.scale.y = data.scale;
      sprite.animations.add('animation', Phaser.Animation.generateFrameNames(data.frameName, 1, data.frameNameMax), data.frameSpeed, data.repeat);
      sprite.animations.play('animation');

      sprite.events.onAnimationComplete.add(function () {
          sprite.kill();
      }, this);
    }

    bulletHitObstacle(bullet) {
      this.createExplosionAnimation({
        x: bullet.x,
        y: bullet.y,
        key: 'explosion',
        frameName: 'fireball_hit_000',
        frameNameMax: 9,
        frameSpeed:100,
        repeat: false,
        scale: 1
      });
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
        this.waterlayer = this.map.createLayer('water');
        this.obstacleLayer = this.map.createLayer('obstacle');
        this.decorationslayer = this.map.createLayer('decorations');

        this.backgroundlayer.resizeWorld();
        this.waterlayer.resizeWorld();
        this.obstacleLayer.resizeWorld();
        this.decorationslayer.resizeWorld();

        //collision on obstacleLayer
        this.map.setCollisionBetween(1, 2000, true, 'obstacle');
        this.map.setCollisionBetween(1, 2000, true, 'water');
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
