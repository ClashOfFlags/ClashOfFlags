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

        this.teamManager = $container.TeamManager;
    }

    _createClass(Creator, [{
        key: 'run',
        value: function run() {
            this.createTeams();
        }
    }, {
        key: 'createTeams',
        value: function createTeams() {
            for (var teamName in _config2.default.game.teams) {
                var team = new _Team2.default(teamName);
                this.teamManager.add(team);
                this.createPlayersForTeam(team);
            }
        }
    }, {
        key: 'createPlayersForTeam',
        value: function createPlayersForTeam(team) {
            var playerStartPos = this.objects.byProperties({ 'type': 'spawn', team: team.name }, 'objectsLayer');

            for (var playerNumber in _config2.default.game.teams[team.name]) {
                this.player = this.playerFactory.position(playerStartPos[0]).team(team).name(playerNumber).key('player').make();
            }
        }
    }]);

    return Creator;
}();

exports.default = Creator;

},{"./../objects/values/Team":16,"./../setup/config":20}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputService = function () {
    function InputService(game) {
        _classCallCheck(this, InputService);

        this.game = game;

        this.inputs = {};
    }

    _createClass(InputService, [{
        key: "cursorKeys",
        value: function cursorKeys() {
            if (!this.inputs.cursorKeys) {
                this.inputs.cursorKeys = this.game.input.keyboard.createCursorKeys();
            }

            return this.inputs.cursorKeys;
        }
    }, {
        key: "wasd",
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
        key: "applyToPlayer",
        value: function applyToPlayer(player) {
            if (this.cursorKeys().up.isDown || this.wasd().up.isDown) {
                if (player.body.velocity.y == 0) player.body.velocity.y -= player.getSpeed();
            } else if (this.cursorKeys().down.isDown || this.wasd().down.isDown) {
                if (player.body.velocity.y == 0) player.body.velocity.y += player.getSpeed();
            } else {
                player.body.velocity.y = 0;
            }
            if (this.cursorKeys().left.isDown || this.wasd().left.isDown) {
                player.body.velocity.x -= player.getSpeed();
            } else if (this.cursorKeys().right.isDown || this.wasd().right.isDown) {
                player.body.velocity.x += player.getSpeed();
            }
        }
    }]);

    return InputService;
}();

exports.default = InputService;

},{}],3:[function(require,module,exports){
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
            this.collection[name] = value;
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
            return this.collection[name];
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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
            this.game.load.image('player', this.paths.image('player.png'));
            this.game.load.image('cup', this.paths.image('bluecup.png'));
            this.game.load.image('bullet', this.paths.image('flamer_projectile.png'));
            this.game.load.atlas('explosion', 'assets/images/fireball_hit.png', 'assets/images/fireball_hit.json');
            this.game.load.atlas('fireball', 'assets/images/fireball.png', 'assets/images/fireball.json');
            this.game.load.spritesheet('torch', 'assets/images/torch.png', 64, 64);
            this.game.load.spritesheet('water', 'assets/images/water.png', 32, 32);
            this.game.load.spritesheet('waterStone', 'assets/images/waterStone.png', 32, 32);
        }
    }]);

    return Preloader;
}();

exports.default = Preloader;

},{}],6:[function(require,module,exports){
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

            this.creator.run();

            this.createMap();
            this.createPlayer();
            this.createControls();
        }
    }, {
        key: 'update',
        value: function update() {
            this.game.physics.arcade.collide(this.player, this.obstacleLayer);
            this.game.physics.arcade.collide(this.objects.cups, this.obstacleLayer, this.destroy, null, this);

            this.player.body.velocity.x = 0;

            this.inputs.applyToPlayer(this.player);
        }
    }, {
        key: 'destroy',
        value: function destroy(cup, obstacle) {

            var singleExplosion = this.explosions.getFirstDead();
            singleExplosion = this.explosions.create(cup.x, cup.y, 'explosion');
            singleExplosion.animations.add('fire', Phaser.Animation.generateFrameNames('fireball_hit_000', 1, 9), 100, false);
            // singleExplosion.scale.x = 0.7;
            // singleExplosion.scale.y = 0.7;
            singleExplosion.x = singleExplosion.x - singleExplosion.width / 2;
            singleExplosion.y = singleExplosion.y - singleExplosion.height / 2;
            singleExplosion.animations.play('fire');

            singleExplosion.events.onAnimationComplete.add(function () {
                singleExplosion.kill();
            }, this);

            cup.kill();
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
            this.obstacleLayer = this.map.createLayer('obstacle');
            this.decorationslayer = this.map.createLayer('decorations');

            //collision on obstacleLayer
            this.map.setCollisionBetween(1, 2000, true, 'obstacle');

            /***************************
             ******     items     ******
             ***************************/
            this.createObjects();

            this.explosions = this.game.add.group();
            this.explosions.createMultiple(50, 'explosion');
        }
    }, {
        key: 'createPlayer',
        value: function createPlayer() {
            var _this2 = this;

            this.game.camera.follow(this.player);

            this.objects.cups = this.game.add.group();

            var cups = this.objects.cups;
            cups.enableBody = true;
            cups.physicsBodyType = Phaser.Physics.ARCADE;

            cups.createMultiple(50, 'fireball');
            cups.setAll('checkWorldBounds', true);
            cups.setAll('outOfBoundsKill', true);

            cups.callAll('animations.add', 'animations', 'fireball', Phaser.Animation.generateFrameNames('fireball_000', 1, 6), 60, true);
            cups.callAll('animations.play', 'animations', 'fireball');

            this.game.input.onDown.add(function () {
                var cup = cups.getFirstDead();

                cup.reset(_this2.player.body.x - cup.width / 2, _this2.player.body.y - cup.height / 2);

                _this2.game.physics.arcade.moveToPointer(cup, 500);

                cup.pivot.x = cup.width * 0.5;
                cup.pivot.y = cup.height * 0.5;

                cup.x = cup.x + cup.width / 2 + _this2.player.width / 2;
                cup.y = cup.y + cup.height / 2 + _this2.player.height / 2;
            });
        }
    }, {
        key: 'createObjects',
        value: function createObjects() {
            this.torchGroup = this.game.add.group();
            this.torchGroup.enableBody = true;
            var result = this.objects.byType('torch', 'objectsLayer');
            result.forEach(function (element) {
                var torch = this.torchGroup.create(element.x, element.y, "torch");
                torch.animations.add('on', [0, 1, 2, 3], 10, true);
                torch.animations.play('on');
            }, this);
        }
    }, {
        key: 'createControls',
        value: function createControls() {
            this.cursors = this.inputs.cursorKeys();
            this.wasd = this.inputs.wasd();

            this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.One);
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

},{"./../factories/PlayerFactory":10,"./../objects/sprites/Hero":12,"./../objects/sprites/Player":13,"./../objects/sprites/TestCup":15,"./State":7}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AbstractFactory = function () {
    function AbstractFactory() {
        _classCallCheck(this, AbstractFactory);
    }

    _createClass(AbstractFactory, [{
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
    }]);

    return AbstractFactory;
}();

exports.default = AbstractFactory;

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PlayerFactory).call(this));

        _this.game = game;

        _this.builder = new _Builder2.default();

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
        key: 'make',
        value: function make() {
            this.validate();

            var player = new _Player2.default(this.game, this.get('position').x, this.get('position').y, this.get('key'));

            player.scale.x = this.get('scale', 4);
            player.scale.y = this.get('scale', 4);

            this.builder = new _Builder2.default();

            return player;
        }
    }]);

    return PlayerFactory;
}(_AbstractFactory3.default);

exports.default = PlayerFactory;

},{"./../objects/sprites/Player":13,"./AbstractFactory":8,"./Builder":9}],11:[function(require,module,exports){
'use strict';

var _Bootstrapper = require('./setup/Bootstrapper');

var _Bootstrapper2 = _interopRequireDefault(_Bootstrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Bootstrapper2.default.bootstrap();

var socket = io();

console.log('socket.io!');

},{"./setup/Bootstrapper":19}],12:[function(require,module,exports){
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

},{"./Player":13}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Sprite2 = require('./Sprite');

var _Sprite3 = _interopRequireDefault(_Sprite2);

var _direction = require('./../values/direction');

var _direction2 = _interopRequireDefault(_direction);

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
            this.speed = 500;
            this.enableArcadePhysics();
            this.body.collideWorldBounds = true;
            this.direction = _direction2.default.BOTTOM;
            this.number = 1;
        }
    }, {
        key: 'getSpeed',
        value: function getSpeed() {
            return this.speed;
        }
    }, {
        key: 'setSpeed',
        value: function setSpeed(newSpeed) {
            this.speed = newSpeed;
        }
    }, {
        key: 'collect',
        value: function collect(item) {
            item.kill();
        }
    }]);

    return Player;
}(_Sprite3.default);

exports.default = Player;

},{"./../values/direction":17,"./Sprite":14}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{"./Sprite":14}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TeamManager = function () {
    function TeamManager(game, $container) {
        _classCallCheck(this, TeamManager);

        this.name = name;
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
            return this.teams['red'][0];
        }
    }]);

    return TeamManager;
}();

exports.default = TeamManager;

},{}],19:[function(require,module,exports){
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

},{"./../Services/Creator":1,"./../Services/InputService":2,"./../Services/ObjectsService":3,"./../Services/PathService":4,"./../Services/Preloader":5,"./../States/GameState":6,"./../factories/PlayerFactory":10,"./../services/TeamManager":18,"./config":20}],20:[function(require,module,exports){
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
        }
    }
};

},{}]},{},[11])


//# sourceMappingURL=app.js.map
