import GameState from './States/GameState';
import InputService from './Services/InputService';
import PathService from './Services/PathService';
import ObjectsService from './Services/ObjectsService';

var game = game || {};

game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'game');

var player, cursors, cups, keys = {};

var bottle = new Bottle();

bottle.service('$container', () => bottle.container);
bottle.service('game', () => game);
bottle.service('InputService', InputService, 'game');
bottle.service('PathService', PathService);
bottle.service('ObjectsService', ObjectsService, 'game');
bottle.service('GameState', GameState, 'game', '$container');

game.state.add('Game', bottle.container.GameState);
game.state.start('Game');