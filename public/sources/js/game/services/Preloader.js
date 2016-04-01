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
      this.game.load.image('red_dead', this.paths.imagePlayers('red_dead.png'));
      this.game.load.image('blue_dead', this.paths.imagePlayers('blue_dead.png'));

      for (var i = 0; i < 2; i++) {
        var color = (i===0)? "red" : "blue";
        // loadPlayerWithColor(color, "flamer", 46, 26, 52, 26);
        this.loadPlayerWithColor(color, "pistol", 43, 22, 48, 23);
      }
    }

    loadPlayerWithColor(color, type, width, height, shootWidth, shootHeight){
      this.game.load.spritesheet('player_'+color+'_'+type, this.paths.imagePlayers(color+'_'+type+'.png'), width, height);
      this.game.load.spritesheet('player_'+color+'_'+type+'_shoot', this.paths.imagePlayers(color+'_'+type+'_shoot.png'), shootWidth, shootHeight);
    }

    loadItems() {
      this.game.load.image('barrel', this.paths.imageItem('barrel.png'));
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
