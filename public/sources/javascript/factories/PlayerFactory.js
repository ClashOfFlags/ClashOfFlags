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

        player.scale.x = this.get('scale', 1.5);
        player.scale.y = this.get('scale', 1.5);

        player.anchor.setTo(0.5, 0.5);

        player.animations.add('walk', [0, 1, 2, 3], 12, true);

        this.get('team').addPlayer(player);
        player.team = this.get('team');
        player.number = this.get('number');

        var style = { font: "16px Arial", fill: (player.team.name == "red") ? "#f00" : "#00f", align: "center", width: player.width};

        player.name = this.game.add.text(0, 0, "Player " + this.get('number') + ' ' + + this.get('networkId'), style);
        player.name.anchor.setTo(0.5, 0.5);
        player.updateName();
        player.health = 100;

        var playerGroup = this.objects.get('playerGroup');
        playerGroup.add(player);

        return player;
    }

}
