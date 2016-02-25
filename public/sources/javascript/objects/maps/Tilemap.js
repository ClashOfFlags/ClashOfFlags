export default class Tilemap extends Phaser.Tilemap {
    constructor(game, key, tileWidth, tileHeight, width, height) {
        super(game, key, tileWidth, tileHeight, width, height);

        this.layers = {
            background : {},
            blocked: {}

        };
        this.createLayers();
    }

    createLayers() {
        this.layers.background = this.createLayer('backgroundLayer');
        this.layers.blocked = this.createLayer('blockedLayer');

        this.setCollisionBetween(1, 2000, true, 'blockedLayer');
        this.layers.background.resizeWorld();
    }


}