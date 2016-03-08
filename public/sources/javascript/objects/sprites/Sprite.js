export default class Sprite extends Phaser.Sprite {
    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);

        this.key = key;
        this.game.stage.addChild(this);
        this.game.add.existing(this);

        this.boot();
    }

    boot() {
        // Overwrite me from parent
    }

    enableArcadePhysics() {
        return this.game.physics.arcade.enable(this);
    }

    options() {
        return {
        };
    }
}
