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
        this.loadRanks();
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
      this.game.load.atlas('fireball_red_hit', this.paths.imageWeapon('fireball_red_hit.png'), this.paths.imageWeapon('fireball_red_hit.json'));
      this.game.load.atlas('fireball_red', this.paths.imageWeapon('fireball_red.png'), this.paths.imageWeapon('fireball_red.json'));
    }

    loadAnimation() {
      this.game.load.atlas('onfireanimation', this.paths.imageAnimation('onfireanimation.png'), this.paths.imageAnimation('onfireanimation.json'));
      this.game.load.atlas('flame_a', this.paths.imageAnimation('flame_a.png'), this.paths.imageAnimation('flame_a.json'));
      this.game.load.atlas('splatter_animation', this.paths.imageAnimation('splatter_animation.png'), this.paths.imageAnimation('splatter_animation.json'));
      this.game.load.atlas('smoke', this.paths.imageAnimation('smoke.png'), this.paths.imageAnimation('smoke.json'));
    }

    loadMap() {
      this.game.load.spritesheet('torch', this.paths.imageMap('torch.png'), 64, 64);
      this.game.load.spritesheet('water', this.paths.imageMap('water.png'), 32, 32);
      this.game.load.spritesheet('flag', this.paths.imageMap('flag.png'), 64, 64);
      this.game.load.spritesheet('waterStone', this.paths.imageMap('waterStone.png'), 32, 32);
    }

    loadPlayer() {
      this.game.load.image('red_dead', this.paths.imagePlayers('red_dead.png'));
      this.game.load.image('blue_dead', this.paths.imagePlayers('blue_dead.png'));

      for (var i = 0; i < 2; i++) {
        var color = (i===0)? "red" : "blue";
        this.loadPlayerWithColor(color, "pistol", 43, 22, 48, 23);
        this.loadPlayerWithColor(color, "flamer", 45, 27, 54, 26);
        this.loadPlayerWithColor(color, "laser", 44, 26, 45, 23);
        this.loadPlayerWithColor(color, "plasma", 45, 24, 52, 24);
        this.loadPlayerWithColor(color, "rifle", 43, 25, 59, 24);
        this.loadPlayerWithColor(color, "pistol2", 38, 22, 46, 23);
        this.loadPlayerWithColor(color, "flamer2", 46, 26, 52, 25);
        this.loadPlayerWithColor(color, "laser2", 44, 25, 45, 22);
        this.loadPlayerWithColor(color, "plasma2", 45, 22, 50, 23);
        this.loadPlayerWithColor(color, "rifle2", 44, 22, 57, 23);
      }
    }

    loadPlayerWithColor(color, type, width, height, shootWidth, shootHeight){
      this.game.load.spritesheet('player_'+color+'_'+type, this.paths.imagePlayers(color+'_'+type+'.png'), width, height);
      this.game.load.spritesheet('player_'+color+'_'+type+'_shoot', this.paths.imagePlayers(color+'_'+type+'_shoot.png'), shootWidth, shootHeight);
    }

    loadItems() {
      this.game.load.image('barrel', this.paths.imageItem('barrel.png'));
      this.game.load.image('treasureChest_full', this.paths.imageItem('treasureChest_full.png'));
      this.game.load.image('treasureChest_empty', this.paths.imageItem('treasureChest_empty.png'));
      this.game.load.image('treasureChest_close', this.paths.imageItem('treasureChest_close.png'));
    }

    loadRanks() {
        for(let i = 1; i <= 75; i++) {
            const assetKey = 'rank' + i;
            const imageName = 'Rank_' + i + '.png';
            const imageUrl = this.paths.imageRank(imageName)

            this.game.load.image(assetKey, imageUrl);
        }
    }

}
