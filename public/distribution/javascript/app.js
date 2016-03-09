(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Team = require('./../objects/values/Team');

var _Team2 = _interopRequireDefault(_Team);

var _config = require('./../setup/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Creator = function () {
    function Creator(game, $container) {
        _classCallCheck(this, Creator);

        this.game = game;
        this.$container = $container;

        this.objects = this.$container.ObjectsService;
        this.playerFactory = this.$container.PlayerFactory;

        this.teamManager = $container.TeamManager;
    }

    _createClass(Creator, [{
        key: 'run',
        value: function run() {
            this.createTorchs();

            this.createKeysRed();

            this.createKeysBlue();

            this.createTeams();

            this.createMiniMap();
        }
    }, {
        key: 'createMiniMap',
        value: function createMiniMap() {
            this.map = this.objects.get('map');
            this.miniMapSize = 2;

            var miniMapBmd = this.game.add.bitmapData();

            for (var l = 0; l < this.map.layers.length; l++) {
                for (var y = 0; y < this.map.height; y++) {
                    for (var x = 0; x < this.map.width; x++) {
                        var tile = this.map.getTile(x, y, l);
                        if (tile && this.map.layers[l].name == 'background') {
                            miniMapBmd.ctx.fillStyle = '#1D2A34';
                            miniMapBmd.ctx.fillRect(x * this.miniMapSize, y * this.miniMapSize, this.miniMapSize, this.miniMapSize);
                        } else if (tile && this.map.layers[l].name == 'water') {
                            miniMapBmd.ctx.fillStyle = '#0000ff';
                            miniMapBmd.ctx.fillRect(x * this.miniMapSize, y * this.miniMapSize, this.miniMapSize, this.miniMapSize);
                        } else if (tile && this.map.layers[l].name == 'obstacle') {
                            miniMapBmd.ctx.fillStyle = '#cccccc';
                            miniMapBmd.ctx.fillRect(x * this.miniMapSize, y * this.miniMapSize, this.miniMapSize, this.miniMapSize);
                        }
                    }
                }
            }
            this.miniMap = this.game.add.sprite(10, 390, miniMapBmd);
            this.miniMap.fixedToCamera = true;

            var miniMapOverlayBmd = this.game.add.bitmapData();
            this.miniMapOverlay = this.game.add.sprite(10, 390, miniMapOverlayBmd);
            this.miniMapOverlay.fixedToCamera = true;

            this.objects.set('miniMapOverlay', miniMapOverlayBmd);
            this.objects.set('miniMapSize', this.miniMapSize);
        }
    }, {
        key: 'createTeams',
        value: function createTeams() {
            for (var teamName in _config2.default.game.teams) {
                var team = new _Team2.default(teamName);
                this.teamManager.add(team);
                this.createPlayersForTeam(team);
            }

            this.objects.set('hero', this.teamManager.hero());
        }
    }, {
        key: 'createPlayersForTeam',
        value: function createPlayersForTeam(team) {
            var spawns = this.objects.byProperties({ 'type': 'spawn', team: team.name }, 'objectsLayer');

            for (var i in _config2.default.game.teams[team.name]) {
                var playerNumber = _config2.default.game.teams[team.name][i];

                var spawn = _.find(spawns, function (current_spawn) {
                    return current_spawn.properties.player == playerNumber;
                });

                var player = this.playerFactory.position(spawn).team(team).number(playerNumber).key('player').make();

                this.objects.set('player.' + playerNumber, player);
            }
        }
    }, {
        key: 'createTorchs',
        value: function createTorchs() {
            var torchGroup = this.game.add.group();
            torchGroup.enableBody = true;

            var result = this.objects.byType('torch', 'objectsLayer');
            result.forEach(function (element) {
                var torch = torchGroup.create(element.x, element.y, "torch");
                torch.animations.add('on', [0, 1, 2, 3], 10, true);
                torch.animations.play('on');
            }, this);
        }
    }, {
        key: 'createKeysRed',
        value: function createKeysRed() {
            var keyRedGroup = this.game.add.group();
            keyRedGroup.enableBody = true;
            var keysRed = this.objects.byProperties({ 'type': 'key_red' }, 'objectsLayer');

            keysRed.forEach(function (element) {
                console.log('RedKey Create');
                var keyRed = keyRedGroup.create(element.x, element.y, 'key');
            }, this);

            this.objects.set('keyRedGroup', keyRedGroup);
        }
    }, {
        key: 'createKeysBlue',
        value: function createKeysBlue() {
            var keyBlueGroup = this.game.add.group();
            keyBlueGroup.enableBody = true;
            var keysBlue = this.objects.byProperties({ 'type': 'key_blue' }, 'objectsLayer');

            keysBlue.forEach(function (element) {
                console.log('BlueKey Create');
                var keyBlue = keyBlueGroup.create(element.x, element.y, 'key');
            }, this);

            this.objects.set('keyBlueGroup', keyBlueGroup);
        }
    }, {
        key: 'createControls',
        value: function createControls() {
            this.cursors = this.inputs.cursorKeys();
            this.wasd = this.inputs.wasd();

            this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.One);
        }
    }]);

    return Creator;
}();

exports.default = Creator;

},{"./../objects/values/Team":18,"./../setup/config":23}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _direction = require('./../objects/values/direction');

var _direction2 = _interopRequireDefault(_direction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputService = function () {
    function InputService(game) {
        _classCallCheck(this, InputService);

        this.game = game;

        this.inputs = {};
    }

    _createClass(InputService, [{
        key: 'cursorKeys',
        value: function cursorKeys() {
            if (!this.inputs.cursorKeys) {
                this.inputs.cursorKeys = this.game.input.keyboard.createCursorKeys();
            }

            return this.inputs.cursorKeys;
        }
    }, {
        key: 'wasd',
        value: function wasd() {
            if (!this.inputs.wasd) {
                this.inputs.wasd = {
                    up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
                    down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
                    left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
                    right: this.game.input.keyboard.addKey(Phaser.Keyboard.D)
                };
            }

            return this.inputs.wasd;
        }
    }, {
        key: 'space',
        value: function space() {
            if (!this.inputs.space) {
                this.inputs.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            }

            return this.inputs.space;
        }
    }, {
        key: 'applyToPlayer',
        value: function applyToPlayer(player) {
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;

            if (this.cursorKeys().up.isDown || this.wasd().up.isDown) {
                player.direction = _direction2.default.UP;
                player.angle = -90;
                player.body.velocity.y -= player.speed;
                player.animations.play('walk');
                player.updateName();
            } else if (this.cursorKeys().down.isDown || this.wasd().down.isDown) {
                player.direction = _direction2.default.BOTTOM;
                player.angle = 90;
                player.body.velocity.y += player.speed;
                player.animations.play('walk');
                player.updateName();
            } else if (this.cursorKeys().left.isDown || this.wasd().left.isDown) {
                player.direction = _direction2.default.LEFT;
                player.angle = 180;
                player.body.velocity.x -= player.speed;
                player.animations.play('walk');
                player.updateName();
            } else if (this.cursorKeys().right.isDown || this.wasd().right.isDown) {
                player.direction = _direction2.default.RIGHT;
                player.angle = 0;
                player.body.velocity.x += player.speed;
                player.animations.play('walk');
                player.updateName();
            } else {
                player.animations.stop();
                player.frame = 0;
            }
        }
    }]);

    return InputService;
}();

exports.default = InputService;

},{"./../objects/values/direction":20}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NetworkService = function () {
    function NetworkService($container) {
        _classCallCheck(this, NetworkService);

        this.$container = $container;
        this.objects = $container.ObjectsService;
        this.playerFactory = $container.PlayerFactory;
        this.teamManager = $container.TeamManager;
        this.socket = io();
        this.player = null;
        this.players = {}; // workaround, should not be here I guess
    }

    _createClass(NetworkService, [{
        key: 'init',
        value: function init() {
            var _this = this;

            this.connect();

            this.socket.on('PlayerConnectEvent', function (player) {
                _this.onPlayerConnect(player);
            });

            this.socket.on('PlayerDisconnectEvent', function (player) {
                _this.onPlayerDisconnect(player);
            });

            this.socket.on('PlayerPositionEvent', function (player) {
                _this.onPlayerPosition(player);
            });

            this.socket.on('PlayerShootEvent', function (data) {
                _this.onPlayerShoot(data);
            });
        }
    }, {
        key: 'connect',
        value: function connect() {
            this.socket.emit('PlayerConnectEvent');
        }
    }, {
        key: 'onPlayerConnect',
        value: function onPlayerConnect(player) {
            var playerStartPos = this.objects.byType('spawn', 'objectsLayer');
            var playerSprite = this.playerFactory.position(playerStartPos[0]).team(this.teamManager.teams.red).key('player').number(11 + player.id).make();

            this.players[player.id] = playerSprite;
        }
    }, {
        key: 'onPlayerDisconnect',
        value: function onPlayerDisconnect(player) {
            var playerSprite = this.players[player.id];

            if (playerSprite) {
                playerSprite.kill();
            }
        }
    }, {
        key: 'onPlayerPosition',
        value: function onPlayerPosition(player) {
            var playerSprite = this.players[player.id];
            playerSprite.x = player.position.x;
            playerSprite.y = player.position.y;
            playerSprite.updateName();
        }
    }, {
        key: 'onPlayerShoot',
        value: function onPlayerShoot(data) {
            //player = this.teamManager.allPlayers()[data.player];

            console.log('shoot over network', data);
        }
    }, {
        key: 'sendPosition',
        value: function sendPosition(player) {
            var position = {
                x: player.x,
                y: player.y
            };

            this.socket.emit('PlayerPositionEvent', position);
        }
    }, {
        key: 'sendShoot',
        value: function sendShoot(player) {
            var data = {
                direction: player.direction,
                x: player.x,
                y: player.y
            };

            this.socket.emit('PlayerShootEvent', data);
        }
    }]);

    return NetworkService;
}();

exports.default = NetworkService;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjectsService = function () {
    function ObjectsService(game) {
        _classCallCheck(this, ObjectsService);

        this.collection = {};
    }

    _createClass(ObjectsService, [{
        key: 'set',
        value: function set(name, value) {

            return _.set(this.collection, name, value);
        }
    }, {
        key: 'byType',
        value: function byType(type, layer) {
            return this.byProperties({ 'type': type }, layer);
        }
    }, {
        key: 'byProperties',
        value: function byProperties(properties, layer) {
            var _this = this;

            var result = [];
            this.map().objects[layer].forEach(function (element) {
                if (element.properties && _this.objectHasProperties(element, properties)) {
                    element.y += 64;
                    result.push(element);
                }
            });
            return result;
        }
    }, {
        key: 'objectHasProperties',
        value: function objectHasProperties(object, properties) {
            for (var key in properties) {
                if (!properties.hasOwnProperty(key)) {
                    continue;
                }

                var hasAttribute = object[key] && properties[key] == object[key];
                var hasProperty = properties[key] == object.properties[key];

                if (hasAttribute || hasProperty) {
                    return true;
                }
            }

            return false;
        }
    }, {
        key: 'get',
        value: function get(name) {
            return _.get(this.collection, name);
        }
    }, {
        key: 'map',
        value: function map() {
            return this.get('map');
        }
    }]);

    return ObjectsService;
}();

exports.default = ObjectsService;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PathService = function () {
    function PathService() {
        _classCallCheck(this, PathService);
    }

    _createClass(PathService, [{
        key: 'image',
        value: function image(imageName) {
            return 'assets/images/' + imageName;
        }
    }]);

    return PathService;
}();

exports.default = PathService;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Preloader = function () {
    function Preloader(game, $container) {
        _classCallCheck(this, Preloader);

        this.game = game;
        this.$container = $container;
        this.paths = $container.PathService;
    }

    _createClass(Preloader, [{
        key: 'run',
        value: function run(gamestate) {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            gamestate.load.tilemap('map', 'assets/tilemaps/map_philipp.json', null, Phaser.Tilemap.TILED_JSON);
            gamestate.load.image('dungeon_tileset_64', 'assets/images/dungeon_tileset_64.png');
            gamestate.load.image('objects_tilset_64', 'assets/images/objects_tilset_64.png');
            this.game.load.image('bullet', this.paths.image('flamer_projectile.png'));
            this.game.load.atlas('explosion', 'assets/images/fireball_hit.png', 'assets/images/fireball_hit.json');
            this.game.load.atlas('fireball', 'assets/images/fireball.png', 'assets/images/fireball.json');
            this.game.load.spritesheet('torch', 'assets/images/torch.png', 64, 64);
            this.game.load.spritesheet('water', 'assets/images/water.png', 32, 32);
            this.game.load.spritesheet('waterStone', 'assets/images/waterStone.png', 32, 32);
            this.game.load.spritesheet('player', this.paths.image('green_male_marine_flamer.png'), 46, 26);
            this.game.load.spritesheet('player_shoot', this.paths.image('green_male_marine_flamer_shoot.png'), 52, 26);
            this.game.load.spritesheet('key', 'assets/images/key.png', 64, 64);
        }
    }]);

    return Preloader;
}();

exports.default = Preloader;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _State2 = require('./State');

var _State3 = _interopRequireDefault(_State2);

var _Hero = require('./../objects/sprites/Hero');

var _Hero2 = _interopRequireDefault(_Hero);

var _Player = require('./../objects/sprites/Player');

var _Player2 = _interopRequireDefault(_Player);

var _TestCup = require('./../objects/sprites/TestCup');

var _TestCup2 = _interopRequireDefault(_TestCup);

var _PlayerFactory = require('./../factories/PlayerFactory');

var _PlayerFactory2 = _interopRequireDefault(_PlayerFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameState = function (_State) {
    _inherits(GameState, _State);

    function GameState(game, $container) {
        _classCallCheck(this, GameState);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GameState).call(this));

        _this.player = {};

        _this.inputs = $container.InputService;
        _this.paths = $container.PathService;
        _this.objects = $container.ObjectsService;
        _this.preloader = $container.Preloader;
        _this.creator = $container.Creator;
        _this.playerFactory = $container.PlayerFactory;
        _this.network = $container.NetworkService;
        window.clashOfFlags = _this; // Publish GameState to window, Vue App needs to access pause() and unpause()
        _this.teamManager = $container.TeamManager;
        return _this;
    }

    _createClass(GameState, [{
        key: 'preload',
        value: function preload() {
            this.preloader.run(this);
        }
    }, {
        key: 'create',
        value: function create() {
            this.initPauseState();

            this.createMap();

            this.creator.run();

            this.player = this.teamManager.hero();

            this.createPlayer();
            this.createControls();
            this.network.init();

            this.miniMapOverlay = this.objects.get('miniMapOverlay');
            this.miniMapSize = this.objects.get('miniMapSize');
        }
    }, {
        key: 'update',
        value: function update() {
            this.game.physics.arcade.collide(this.player, this.obstacleLayer);
            this.game.physics.arcade.collide(this.player, this.waterlayer);
            this.game.physics.arcade.collide(this.player.weapon.bullets, this.obstacleLayer, this.bulletHitObstacle, null, this);

            this.keyRedGroup = this.objects.get('keyRedGroup');
            this.game.physics.arcade.overlap(this.player, this.keyRedGroup, this.playerCollectsKey, null, this);

            this.keyBlueGroup = this.objects.get('keyBlueGroup');
            this.game.physics.arcade.overlap(this.player, this.keyBlueGroup, this.playerCollectsKey, null, this);

            this.inputs.applyToPlayer(this.player);
            this.network.sendPosition(this.player);

            this.updateMiniMap();
        }
    }, {
        key: 'updateMiniMap',
        value: function updateMiniMap() {

            this.miniMapOverlay.context.clearRect(0, 0, this.miniMapOverlay.width, this.miniMapOverlay.height);

            this.miniMapOverlay.rect(Math.floor(this.player.x / 64) * this.miniMapSize, Math.floor(this.player.y / 64) * this.miniMapSize, this.miniMapSize * 2, this.miniMapSize * 2, '#FFFF00');
            this.miniMapOverlay.dirty = true;
        }
    }, {
        key: 'bulletHitObstacle',
        value: function bulletHitObstacle(bullet, obstacle) {
            var singleExplosion = this.explosions.getFirstDead();
            singleExplosion = this.explosions.create(bullet.body.x, bullet.body.y, 'explosion');
            singleExplosion.animations.add('fire', Phaser.Animation.generateFrameNames('fireball_hit_000', 1, 9), 100, false);
            singleExplosion.animations.play('fire');

            singleExplosion.events.onAnimationComplete.add(function () {
                singleExplosion.kill();
            }, this);

            bullet.kill();
        }
    }, {
        key: 'playerCollectsKey',
        value: function playerCollectsKey(player, key) {
            console.log('Key collected');
            //TODO: collect and carry the key by the player
        }
    }, {
        key: 'createMap',
        value: function createMap() {
            this.game.world.setBounds(0, 0, 6400, 6400);

            this.objects.set('map', this.game.add.tilemap('map'));
            this.map = this.objects.get('map');

            //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
            this.map.addTilesetImage('dungeon_tileset_64');
            this.map.addTilesetImage('objects_tilset_64');

            //create layer
            this.backgroundlayer = this.map.createLayer('background');
            this.waterlayer = this.map.createLayer('water');
            this.obstacleLayer = this.map.createLayer('obstacle');
            this.decorationslayer = this.map.createLayer('decorations');

            this.backgroundlayer.resizeWorld();
            this.waterlayer.resizeWorld();
            this.obstacleLayer.resizeWorld();
            this.decorationslayer.resizeWorld();

            //collision on obstacleLayer
            this.map.setCollisionBetween(1, 2000, true, 'obstacle');
            this.map.setCollisionBetween(1, 2000, true, 'water');

            this.explosions = this.game.add.group();
            this.explosions.createMultiple(50, 'explosion');
        }
    }, {
        key: 'createPlayer',
        value: function createPlayer() {

            this.game.camera.follow(this.player);
        }
    }, {
        key: 'createControls',
        value: function createControls() {
            var _this2 = this;

            this.cursors = this.inputs.cursorKeys();
            this.wasd = this.inputs.wasd();
            this.space = this.inputs.space();

            this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.One);

            this.space.onDown.add(function () {
                _this2.player.shoot();
                console.log('send shoot');
                _this2.network.sendShoot(_this2.player);
            });
        }
    }, {
        key: 'pause',
        value: function pause() {
            this.game.input.enabled = false;
            this.game.physics.arcade.isPaused = true;
        }
    }, {
        key: 'unpause',
        value: function unpause() {
            this.game.input.enabled = true;
            this.game.physics.arcade.isPaused = false;
        }
    }, {
        key: 'initPauseState',
        value: function initPauseState() {
            var isGameDivVisible = $('#game').is(':visible');

            if (isGameDivVisible) {
                this.unpause();
                return;
            }

            this.pause();
        }
    }]);

    return GameState;
}(_State3.default);

exports.default = GameState;

},{"./../factories/PlayerFactory":11,"./../objects/sprites/Hero":14,"./../objects/sprites/Player":15,"./../objects/sprites/TestCup":17,"./State":8}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var State = function () {
    function State(game, $container) {
        _classCallCheck(this, State);

        this.game = game;
        this.$container = $container;
    }

    _createClass(State, [{
        key: "preload",
        value: function preload() {}
    }, {
        key: "create",
        value: function create() {}
    }, {
        key: "update",
        value: function update() {}
    }]);

    return State;
}();

exports.default = State;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Builder = require('./Builder');

var _Builder2 = _interopRequireDefault(_Builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AbstractFactory = function () {
    function AbstractFactory(game) {
        _classCallCheck(this, AbstractFactory);

        this.game = game;
        this.rebuild();
    }

    _createClass(AbstractFactory, [{
        key: 'rebuild',
        value: function rebuild() {
            this.builder = new _Builder2.default();
        }
    }, {
        key: 'set',
        value: function set(key, value) {
            this.builder.set(key, value);
            return this;
        }
    }, {
        key: 'get',
        value: function get(key, defaultValue) {
            return this.builder.get(key, defaultValue);
        }
    }, {
        key: 'has',
        value: function has(key) {
            return this.builder.has(key);
        }
    }, {
        key: 'validate',
        value: function validate() {
            this.assertThatRequiredFieldsAreSet();
        }
    }, {
        key: 'assertThatRequiredFieldsAreSet',
        value: function assertThatRequiredFieldsAreSet() {
            if (!this.required) {
                return true;
            }

            for (var i in this.required) {
                var key = this.required[i];

                if (!this.has(key)) {
                    throw new Error('Cannot build ' + this.constructor.name + ', "' + key + '" is missing.');
                }
            }

            return true;
        }
    }, {
        key: 'make',
        value: function make() {
            this.validate();

            var object = this.doMake();

            this.rebuild();

            return object;
        }
    }]);

    return AbstractFactory;
}();

exports.default = AbstractFactory;

},{"./Builder":10}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Builder = function () {
    function Builder() {
        _classCallCheck(this, Builder);

        this.attributes = {};
    }

    _createClass(Builder, [{
        key: "get",
        value: function get(key, defaultValue) {
            if (!this.has(key)) {
                return defaultValue;
            }

            return this.attributes[key];
        }
    }, {
        key: "set",
        value: function set(key, value) {
            this.attributes[key] = value;
        }
    }, {
        key: "has",
        value: function has(key) {
            return this.attributes.hasOwnProperty(key);
        }
    }]);

    return Builder;
}();

exports.default = Builder;

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractFactory2 = require('./AbstractFactory');

var _AbstractFactory3 = _interopRequireDefault(_AbstractFactory2);

var _Builder = require('./Builder');

var _Builder2 = _interopRequireDefault(_Builder);

var _Player = require('./../objects/sprites/Player');

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlayerFactory = function (_AbstractFactory) {
    _inherits(PlayerFactory, _AbstractFactory);

    function PlayerFactory(game) {
        _classCallCheck(this, PlayerFactory);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PlayerFactory).call(this, game));

        _this.required = ['key', 'position', 'team', 'number'];
        return _this;
    }

    _createClass(PlayerFactory, [{
        key: 'team',
        value: function team(_team) {
            return this.set('team', _team);
        }
    }, {
        key: 'position',
        value: function position(_position) {
            return this.set('position', _position);
        }
    }, {
        key: 'scale',
        value: function scale(factor) {
            return this.set('scale', factor);
        }
    }, {
        key: 'key',
        value: function key(_key) {
            return this.set('key', _key);
        }
    }, {
        key: 'number',
        value: function number(_number) {
            return this.set('number', _number);
        }
    }, {
        key: 'doMake',
        value: function doMake() {
            var player = new _Player2.default(this.game, this.get('position').x, this.get('position').y, this.get('key'));

            player.scale.x = this.get('scale', 1.5);
            player.scale.y = this.get('scale', 1.5);

            player.anchor.setTo(0.5, 0.5);

            player.animations.add('walk', [0, 1, 2, 3], 12, true);

            this.get('team').addPlayer(player);
            player.team = this.get('team');

            var style = { font: "16px Arial", fill: "#fff", align: "center", width: player.width };

            player.name = this.game.add.text(0, 0, "Player " + this.get('number'), style);
            player.name.anchor.setTo(0.5, 0.5);
            player.updateName();
            player.health = 100;

            return player;
        }
    }]);

    return PlayerFactory;
}(_AbstractFactory3.default);

exports.default = PlayerFactory;

},{"./../objects/sprites/Player":15,"./AbstractFactory":9,"./Builder":10}],12:[function(require,module,exports){
'use strict';

var _Bootstrapper = require('./setup/Bootstrapper');

var _Bootstrapper2 = _interopRequireDefault(_Bootstrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Bootstrapper2.default.bootstrap();

},{"./setup/Bootstrapper":22}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Sprite2 = require('./Sprite');

var _Sprite3 = _interopRequireDefault(_Sprite2);

var _config = require('../../setup/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bullet = function (_Sprite) {
  _inherits(Bullet, _Sprite);

  function Bullet() {
    _classCallCheck(this, Bullet);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Bullet).apply(this, arguments));
  }

  _createClass(Bullet, [{
    key: 'boot',
    value: function boot() {
      this.enableArcadePhysics();
      this.checkWorldBounds = true;
      this.outOfBoundsKill = true;

      this.game.time.events.add(Phaser.Timer.SECOND * _config2.default.game.weapons[this.key].lifetime, this.killBullet, this);
    }
  }, {
    key: 'killBullet',
    value: function killBullet() {
      this.kill();
    }
  }]);

  return Bullet;
}(_Sprite3.default);

exports.default = Bullet;

},{"../../setup/config":23,"./Sprite":16}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Player2 = require('./Player');

var _Player3 = _interopRequireDefault(_Player2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hero = function (_Player) {
  _inherits(Hero, _Player);

  function Hero() {
    _classCallCheck(this, Hero);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Hero).apply(this, arguments));
  }

  return Hero;
}(_Player3.default);

exports.default = Hero;

},{"./Player":15}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Sprite2 = require('./Sprite');

var _Sprite3 = _interopRequireDefault(_Sprite2);

var _direction = require('./../values/direction');

var _direction2 = _interopRequireDefault(_direction);

var _Weapon = require('./../values/Weapon');

var _Weapon2 = _interopRequireDefault(_Weapon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = function (_Sprite) {
    _inherits(Player, _Sprite);

    function Player() {
        _classCallCheck(this, Player);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Player).apply(this, arguments));
    }

    _createClass(Player, [{
        key: 'boot',
        value: function boot() {
            this.speed = 400;
            this.enableArcadePhysics();
            this.body.collideWorldBounds = true;
            this.direction = _direction2.default.RIGHT;
            this.weapon = new _Weapon2.default(this, this.game);
            this.number = 1;
        }
    }, {
        key: 'collect',
        value: function collect(item) {
            item.kill();
        }
    }, {
        key: 'shoot',
        value: function shoot() {
            this.weapon.shoot();
        }
    }, {
        key: 'changeSpriteToNormal',
        value: function changeSpriteToNormal() {
            this.player.loadTexture('player', 0, true);
        }
    }, {
        key: 'updateName',
        value: function updateName() {
            this.name.x = this.x;
            this.name.y = this.y - this.height * 1.2;
        }
    }]);

    return Player;
}(_Sprite3.default);

exports.default = Player;

},{"./../values/Weapon":19,"./../values/direction":20,"./Sprite":16}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sprite = function (_Phaser$Sprite) {
    _inherits(Sprite, _Phaser$Sprite);

    function Sprite(game, x, y, key, frame) {
        _classCallCheck(this, Sprite);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Sprite).call(this, game, x, y, key, frame));

        _this.key = key;
        _this.game.stage.addChild(_this);
        _this.game.add.existing(_this);

        _this.boot();
        return _this;
    }

    _createClass(Sprite, [{
        key: "boot",
        value: function boot() {
            // Overwrite me from parent
        }
    }, {
        key: "enableArcadePhysics",
        value: function enableArcadePhysics() {
            return this.game.physics.arcade.enable(this);
        }
    }, {
        key: "options",
        value: function options() {
            return {};
        }
    }]);

    return Sprite;
}(Phaser.Sprite);

exports.default = Sprite;

},{}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sprite = require('./Sprite');

var _Sprite2 = _interopRequireDefault(_Sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TestCup = function TestCup() {
  _classCallCheck(this, TestCup);
};

exports.default = TestCup;

},{"./Sprite":16}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Team = function () {
    function Team(name) {
        _classCallCheck(this, Team);

        this.name = name;
        this.players = [];
    }

    _createClass(Team, [{
        key: "addPlayer",
        value: function addPlayer(player) {
            this.players.push(player);
        }
    }]);

    return Team;
}();

exports.default = Team;

},{}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
      value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Bullet = require('../sprites/Bullet');

var _Bullet2 = _interopRequireDefault(_Bullet);

var _direction = require('./direction');

var _direction2 = _interopRequireDefault(_direction);

var _config = require('../../setup/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Weapon = function () {
      function Weapon(player, game) {
            _classCallCheck(this, Weapon);

            this.game = game;
            this.player = player;
            this.nextShotAt = Date.now() + _config2.default.game.weapons.fireball.shotDelay;

            this.bullets = game.add.group();
            this.bullets.enableBody = true;
            this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

            this.weapon = 'fireball';
      }

      _createClass(Weapon, [{
            key: 'shoot',
            value: function shoot() {
                  if (this.nextShotAt > Date.now()) {
                        return;
                  }

                  this.nextShotAt = Date.now() + _config2.default.game.weapons.fireball.shotDelay;

                  this.player.loadTexture('player_shoot', 0, true);
                  this.game.time.events.add(Phaser.Timer.SECOND * 0.2, this.player.changeSpriteToNormal, this);

                  var bullet = new _Bullet2.default(this.game, this.player.body.center.x, this.player.body.center.y, this.weapon);
                  bullet.animations.add(this.weapon, Phaser.Animation.generateFrameNames(this.weapon + '_000', 1, 6), 60, true);
                  bullet.animations.play(this.weapon);
                  bullet.anchor.setTo(0.5, 0.5);

                  if (this.player.direction === _direction2.default.BOTTOM) {
                        bullet.body.velocity.y = _config2.default.game.weapons[this.weapon].bulletSpeed;
                        bullet.angle = 180;
                  } else if (this.player.direction === _direction2.default.UP) {
                        bullet.angle = 0;
                        bullet.body.velocity.y = -_config2.default.game.weapons[this.weapon].bulletSpeed;
                  } else if (this.player.direction === _direction2.default.RIGHT) {
                        bullet.angle = 90;
                        bullet.body.velocity.x = _config2.default.game.weapons[this.weapon].bulletSpeed;
                  } else if (this.player.direction === _direction2.default.LEFT) {
                        bullet.angle = -90;
                        bullet.body.velocity.x = -_config2.default.game.weapons[this.weapon].bulletSpeed;
                  }

                  this.bullets.add(bullet);
            }
      }]);

      return Weapon;
}();

exports.default = Weapon;

},{"../../setup/config":23,"../sprites/Bullet":13,"./direction":20}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    TOP: Symbol('top'),
    BOTTOM: Symbol('bottom'),
    RIGHT: Symbol('right'),
    LEFT: Symbol('left')
};

},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TeamManager = function () {
    function TeamManager(game, $container) {
        _classCallCheck(this, TeamManager);

        this.game = game;
        this.$container = $container;
        this.teams = {};
    }

    _createClass(TeamManager, [{
        key: 'add',
        value: function add(team) {
            this.teams[team.name] = team;
        }
    }, {
        key: 'hero',
        value: function hero() {
            return this.teams['red'].players[1];
        }
    }, {
        key: 'findPlayer',
        value: function findPlayer(number) {
            //TODO: iterate through teams and search for player with the number number
        }
    }, {
        key: 'allPlayers',
        value: function allPlayers() {

            var players = {};

            for (var teamName in this.teams) {
                for (var i in this.teams[teamName].players) {
                    var player = this.teams[teamName].players[i];

                    players[player.number] = player;
                }
            }

            return players;
        }
    }]);

    return TeamManager;
}();

exports.default = TeamManager;

},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameState = require('./../States/GameState');

var _GameState2 = _interopRequireDefault(_GameState);

var _InputService = require('./../Services/InputService');

var _InputService2 = _interopRequireDefault(_InputService);

var _PathService = require('./../Services/PathService');

var _PathService2 = _interopRequireDefault(_PathService);

var _Preloader = require('./../Services/Preloader');

var _Preloader2 = _interopRequireDefault(_Preloader);

var _Creator = require('./../Services/Creator');

var _Creator2 = _interopRequireDefault(_Creator);

var _ObjectsService = require('./../Services/ObjectsService');

var _ObjectsService2 = _interopRequireDefault(_ObjectsService);

var _NetworkService = require('./../Services/NetworkService');

var _NetworkService2 = _interopRequireDefault(_NetworkService);

var _PlayerFactory = require('./../factories/PlayerFactory');

var _PlayerFactory2 = _interopRequireDefault(_PlayerFactory);

var _TeamManager = require('./../services/TeamManager');

var _TeamManager2 = _interopRequireDefault(_TeamManager);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bootstrapper = function () {
    function Bootstrapper() {
        _classCallCheck(this, Bootstrapper);

        this.bottle = {};
        this.game = {};
    }

    _createClass(Bootstrapper, [{
        key: 'run',
        value: function run() {
            this.bottle = new Bottle();
            this.game = new Phaser.Game(_config2.default.game.size.width, _config2.default.game.size.height, Phaser.AUTO, 'game');

            this.registerBindings();

            this.game.state.add('Game', this.bottle.container.GameState);
            this.game.state.start('Game');
        }
    }, {
        key: 'registerBindings',
        value: function registerBindings() {
            var _this = this;

            this.bottle.service('$container', function () {
                return _this.bottle.container;
            });
            this.bottle.service('game', function () {
                return _this.game;
            });
            this.bottle.service('config', function () {
                return _config2.default;
            });
            this.bottle.service('InputService', _InputService2.default, 'game');
            this.bottle.service('PathService', _PathService2.default);
            this.bottle.service('ObjectsService', _ObjectsService2.default, 'game');
            this.bottle.service('NetworkService', _NetworkService2.default, '$container');
            this.bottle.service('PlayerFactory', _PlayerFactory2.default, 'game', '$container');
            this.bottle.service('Preloader', _Preloader2.default, 'game', '$container');
            this.bottle.service('TeamManager', _TeamManager2.default, 'game', '$container');
            this.bottle.service('Creator', _Creator2.default, 'game', '$container');
            this.bottle.service('GameState', _GameState2.default, 'game', '$container');
        }
    }], [{
        key: 'bootstrap',
        value: function bootstrap() {
            return new Bootstrapper().run();
        }
    }]);

    return Bootstrapper;
}();

exports.default = Bootstrapper;

},{"./../Services/Creator":1,"./../Services/InputService":2,"./../Services/NetworkService":3,"./../Services/ObjectsService":4,"./../Services/PathService":5,"./../Services/Preloader":6,"./../States/GameState":7,"./../factories/PlayerFactory":11,"./../services/TeamManager":21,"./config":23}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    game: {
        size: {
            width: 800,
            height: 600
        },
        teams: {
            'red': [1, 2, 3, 4, 5],
            'blue': [6, 7, 8, 9, 10]
        },
        weapons: {
            'fireball': {
                bulletSpeed: 600,
                lifetime: 2.5,
                shotDelay: 300
            }
        }
    }
};

},{}]},{},[12])


//# sourceMappingURL=app.js.map
