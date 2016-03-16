import GameState from './../states/GameState';
import InputService from './../services/InputService';
import PathService from './../services/PathService';
import Preloader from './../services/Preloader';
import Creator from './../services/Creator';
import Updater from './../services/Updater';
import ObjectsService from './../services/ObjectsService';
import NetworkService from './../services/network/NetworkService';
import PlayerFactory from './../factories/PlayerFactory';
import TeamManager from './../services/TeamManager';
import config from './config';
import EventDispatcher from './../events/EventDispatcher';


export default class Bootstrapper {
    constructor() {
        this.bottle = {};
        this.game = {};
    }

    run() {
        this.bottle = new Bottle();
        this.game = new Phaser.Game(config.game.size.width, config.game.size.height, Phaser.AUTO, 'game');

        this.registerBindings();

        this.bottle.container.EventDispatcher.registerListeners();

        this.game.state.add('Game', this.bottle.container.GameState);
        this.game.state.start('Game');
    }

    registerBindings() {
        this.bottle.service('$container', () => this.bottle.container);
        this.bottle.service('game', () => this.game);
        this.bottle.service('config', () => config);
        this.bottle.service('InputService', InputService, 'game', '$container');
        this.bottle.service('PathService', PathService);
        this.bottle.service('ObjectsService', ObjectsService, 'game');
        this.bottle.service('NetworkService', NetworkService, '$container');
        this.bottle.service('PlayerFactory', PlayerFactory, 'game', '$container');
        this.bottle.service('Preloader', Preloader, 'game', '$container');
        this.bottle.service('TeamManager', TeamManager, 'game', '$container');
        this.bottle.service('Creator', Creator, 'game', '$container');
        this.bottle.service('Updater', Updater, 'game', '$container');
        this.bottle.service('GameState', GameState, 'game', '$container');
        this.bottle.service('EventDispatcher', EventDispatcher, '$container');

    }


    static bootstrap() {
        return (new Bootstrapper()).run();
    }
}
