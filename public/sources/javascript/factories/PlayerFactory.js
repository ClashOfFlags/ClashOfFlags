import AbstractFactory from './AbstractFactory';
import Builder from './Builder';
import Player from './../objects/sprites/Player';

export default class PlayerFactory extends AbstractFactory {

    constructor(game, $container) {
        super(game);
        this.required = ['key', 'position', 'team', 'number'];
        this.objects = $container.ObjectsService;
    }

    team(team) {
        return this.set('team', team);
    }

    position(position) {
        return this.set('position', position);
    }

    scale(factor) {
        return this.set('scale', factor);
    }

    key(key) {
        return this.set('key', key);
    }

    number(number) {
        return this.set('number', number);
    }

    doMake() {
        const player = new Player(this.game, this.get('position').x, this.get('position').y, this.get('key'));

        player.spawnPos = this.get('position');

        player.scale.x = this.get('scale', 2.0);
        player.scale.y = this.get('scale', 2.0);

        player.anchor.setTo(0.5, 0.5);

        player.animations.add('walk', [0, 1, 2, 3], 12, true);

        this.get('team').addPlayer(player);
        player.team = this.get('team');
        player.number = this.get('number');

        var style = { font: "16px Arial", fill: (player.team.name == "red") ? "#f00" : "#00f", align: "center", width: player.width};

        player.name = this.game.add.text(0, 0, "Player " + this.get('number'), style);
        player.name.anchor.setTo(0.5, 0.5);
        player.updateName();
        player.health = 100;

        var healthBMD = this.game.add.bitmapData();
        healthBMD.ctx.fillStyle = '#0AFF12';
        healthBMD.ctx.fillRect(0, 0, 100, 3);
        player.healthbar = this.game.add.sprite(0,0, healthBMD);
        player.updateHealthbar();

        /* Rank */
        player.rankSprite = this.game.add.sprite(0, 0, 'rank1');
        player.rankSprite.scale.x = 0.1;
        player.rankSprite.scale.y = 0.1;
        player.updateRank();
        /* Rank */

        var playerGroup = this.objects.get('playerGroup');
        playerGroup.add(player);

        return player;
    }

}
