import GameState from './../States/GameState';
import InputService from './../Services/InputService';
import PathService from './../Services/PathService';
import Preloader from './../Services/Preloader';
import Creator from './../Services/Creator';
import ObjectsService from './../Services/ObjectsService';
import PlayerFactory from './../factories/PlayerFactory';
import TeamManager from './../services/TeamManager';
import config from './config';


export default class Bootstrapper {
    constructor() {
        this.bottle = {};
        this.game = {};
    }

    run() {
        this.bottle = new Bottle();
        this.game = new Phaser.Game(config.game.size.width, config.game.size.height, Phaser.AUTO, 'game');

        this.registerBindings();

        this.game.state.add('Game', this.bottle.container.GameState);
        this.game.state.start('Game');

    }

    registerBindings() {
        this.bottle.service('$container', () => this.bottle.container);
        this.bottle.service('game', () => this.game);
        this.bottle.service('config', () => config);
        this.bottle.service('InputService', InputService, 'game');
        this.bottle.service('PathService', PathService);
        this.bottle.service('ObjectsService', ObjectsService, 'game');
        this.bottle.service('PlayerFactory', PlayerFactory, 'game', '$container');
        this.bottle.service('Preloader', Preloader, 'game', '$container');
        this.bottle.service('TeamManager', TeamManager, 'game', '$container');
        this.bottle.service('Creator', Creator, 'game', '$container');
        this.bottle.service('GameState', GameState, 'game', '$container');
    }


    static bootstrap() {
        return (new Bootstrapper()).run();
    }
}



