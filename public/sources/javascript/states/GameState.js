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

        this.game.load.image('player', this.paths.image('player.png'));
        this.game.load.image('cup', this.paths.image('bluecup.png'));
    }

    create() {
        this.player = new Hero(this.game, 10, 10, 'player');


        this.cursors = this.inputs.cursorKeys();

        this.game.input.onDown.add(() =>  {
            var cup = cups.getFirstDead();

            cup.reset(this.player.body.x, this.player.body.y);
            this.game.physics.arcade.moveToPointer(cup, 300);

        });

        this.objects.cups = this.game.add.group();

        var cups = this.objects.cups;
        cups.enableBody = true;
        cups.physicsBodyType = Phaser.Physics.ARCADE;

        cups.createMultiple(50, 'cup');
        cups.setAll('checkWorldBounds', true);
        cups.setAll('outOfBoundsKill', true);

        this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.One);
    }

    update() {

        this.player.body.velocity.x = 0;

        this.game.input.enabled = true;

        if (this.cursors.up.isDown) {
            if (this.player.body.velocity.y == 0)
                this.player.body.velocity.y -= 50;
        }
        else if (this.cursors.down.isDown) {
            if (this.player.body.velocity.y == 0)
                this.player.body.velocity.y += 50;
        }
        else {
            this.player.body.velocity.y = 0;
        }
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x -= 50;
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x += 50;
        }


    }
}