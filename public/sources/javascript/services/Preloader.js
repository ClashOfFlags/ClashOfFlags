export default class Preloader {

    constructor(game, $container) {
        this.game = game;
        this.$container = $container;
        this.paths = $container.PathService;
    }

    run(gamestate) {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        gamestate.load.tilemap('map', 'assets/tilemaps/map_philipp.json', null, Phaser.Tilemap.TILED_JSON);
        gamestate.load.image('dungeon_tileset_64', 'assets/images/dungeon_tileset_64.png');
        gamestate.load.image('objects_tilset_64', 'assets/images/objects_tilset_64.png');
        this.game.load.image('bullet', this.paths.image('flamer_projectile.png'));
        this.game.load.atlas('explosion', 'assets/images/fireball_hit.png', 'assets/images/fireball_hit.json');
        this.game.load.atlas('fireball', 'assets/images/fireball.png', 'assets/images/fireball.json');
        this.game.load.atlas('onfireanimation', 'assets/images/onfireanimation.png', 'assets/images/onfireanimation.json');
        this.game.load.atlas('flame_a', 'assets/images/flame_a.png', 'assets/images/flame_a.json');
        this.game.load.spritesheet('torch', 'assets/images/torch.png', 64, 64);
        this.game.load.spritesheet('water', 'assets/images/water.png', 32, 32);
        this.game.load.spritesheet('waterStone', 'assets/images/waterStone.png', 32, 32);
        this.game.load.spritesheet('player', this.paths.image('green_male_marine_flamer.png'), 46, 26);
        this.game.load.spritesheet('player_shoot', this.paths.image('green_male_marine_flamer_shoot.png'), 52, 26);
        this.game.load.spritesheet('key', 'assets/images/key.png', 64, 64);

        this.loadItems();
    }

    loadItems() {
      this.game.load.image('barrel', this.paths.image('barrel.png'));
    }

}
