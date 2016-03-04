import AbstractFactory from './AbstractFactory';
import Builder from './Builder';
import Player from './../objects/sprites/Player';

export default class PlayerFactory extends AbstractFactory {

    constructor(game) {
        super(game);
        this.required = ['key', 'position', 'team', 'number'];
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

        player.scale.x = this.get('scale', 4);
        player.scale.y = this.get('scale', 4);

        this.get('team').addPlayer(player);
        player.team = this.get('team');

        return player;
    }

}