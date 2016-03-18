export default class Preloader {

    constructor(game, $container) {
        this.game = game;
        this.$container = $container;
        this.paths = $container.PathService;
    }

    run() {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.loadTilemaps();
        this.loadTilset();
        this.loadWeapon();
        this.loadAnimation();
        this.loadPlayer();
        this.loadMap();
        this.loadItems();
    }

    loadTilemaps() {
      this.game.load.tilemap('map', this.paths.tilemaps('map_philipp.json'), null, Phaser.Tilemap.TILED_JSON);
    }

    loadTilset() {
      this.game.load.image('dungeon_tileset_64', this.paths.imageTilset('dungeon_tileset_64.png'));
      this.game.load.image('objects_tilset_64', this.paths.imageTilset('objects_tilset_64.png'));
    }

    loadWeapon() {
      this.game.load.atlas('fireball_hit', this.paths.imageWeapon('fireball_hit.png'), this.paths.imageWeapon('fireball_hit.json'));
      this.game.load.atlas('fireball', this.paths.imageWeapon('fireball.png'), this.paths.imageWeapon('fireball.json'));
    }

    loadAnimation() {
      this.game.load.atlas('onfireanimation', this.paths.imageAnimation('onfireanimation.png'), this.paths.imageAnimation('onfireanimation.json'));
      this.game.load.atlas('flame_a', this.paths.imageAnimation('flame_a.png'), this.paths.imageAnimation('flame_a.json'));
    }

    loadMap() {
      this.game.load.spritesheet('torch', this.paths.imageMap('torch.png'), 64, 64);
      this.game.load.spritesheet('water', this.paths.imageMap('water.png'), 32, 32);
      this.game.load.spritesheet('flag', this.paths.imageMap('flag.png'), 64, 64);
      this.game.load.spritesheet('waterStone', this.paths.imageMap('waterStone.png'), 32, 32);
    }

    loadPlayer() {
      this.game.load.spritesheet('player', this.paths.imagePlayer('green_male_marine_flamer.png'), 46, 26);
      this.game.load.spritesheet('player_shoot', this.paths.imagePlayer('green_male_marine_flamer_shoot.png'), 52, 26);
      this.game.load.image('green_marine_dead', this.paths.imagePlayer('green_marine_dead.png'));
    }

    loadItems() {
      this.game.load.image('barrel', this.paths.imageItem('barrel.png'));
    }

}
