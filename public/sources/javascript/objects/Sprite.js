export default class Sprite extends Phaser.Sprite {
    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);

        this.game.stage.addChild(this);

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