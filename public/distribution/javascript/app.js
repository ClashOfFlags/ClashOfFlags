(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    }]);

    return InputService;
}();

exports.default = InputService;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjectsService = function () {
    function ObjectsService(game) {
        _classCallCheck(this, ObjectsService);

        this.objects = {};
    }

    _createClass(ObjectsService, [{
        key: "set",
        value: function set(name, value) {
            this.objects[name] = value;
        }
    }, {
        key: "byType",
        value: function byType(type, layer) {
            var result = [];
            this.map().objects[layer].forEach(function (element) {
                if (element.properties.type === type) {
                    result.push(element);
                }
            });
            return result;
        }
    }, {
        key: "map",
        value: function map() {
            return this.objects.map;
        }
    }]);

    return ObjectsService;
}();

exports.default = ObjectsService;

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _State2 = require('./State');

var _State3 = _interopRequireDefault(_State2);

var _Hero = require('./../objects/Hero');

var _Hero2 = _interopRequireDefault(_Hero);

var _TestCup = require('./../objects/TestCup');

var _TestCup2 = _interopRequireDefault(_TestCup);

var _Item = require('./../objects/Item');

var _Item2 = _interopRequireDefault(_Item);

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

        return _this;
    }

    _createClass(GameState, [{
        key: 'preload',
        value: function preload() {

            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            this.load.tilemap('map', 'assets/tilemaps/map.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.image('gameTiles', 'assets/images/dungeon_tileset_32.png');
            this.game.load.image('player', this.paths.image('player.png'));
            this.game.load.image('cup', this.paths.image('bluecup.png'));
        }
    }, {
        key: 'create',
        value: function create() {

            /***************************
            ****    create map    *****
            ***************************/
            this.createMap();

            /***************************
            ****    create player  *****
            ***************************/
            this.createPlayer();

            /***************************
            *****    controls    ******
            ***************************/
            this.createControls();
        }
    }, {
        key: 'update',
        value: function update() {

            this.game.physics.arcade.collide(this.player, this.blockedLayer);
            this.game.physics.arcade.collide(this.objects.cups, this.blockedLayer, this.destroy, null, this);
            this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);
            this.game.physics.arcade.overlap(this.objects.cups, this.items, this.destroy, null, this);
            this.game.physics.arcade.overlap(this.player, this.waterAreas, this.handleWater, null, this);

            this.player.body.velocity.x = 0;

            this.game.input.enabled = true;

            if (this.cursors.up.isDown || this.wasd.up.isDown) {
                if (this.player.body.velocity.y == 0) this.player.body.velocity.y -= this.player.getSpeed();
            } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
                if (this.player.body.velocity.y == 0) this.player.body.velocity.y += this.player.getSpeed();
            } else {
                this.player.body.velocity.y = 0;
            }
            if (this.cursors.left.isDown || this.wasd.left.isDown) {
                this.player.body.velocity.x -= this.player.getSpeed();
            } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
                this.player.body.velocity.x += this.player.getSpeed();
            }
        }
    }, {
        key: 'collect',
        value: function collect(player, item) {
            item.kill();
        }
    }, {
        key: 'handleWater',
        value: function handleWater(player, water) {
            player.reset(100, 100);
        }
    }, {
        key: 'destroy',
        value: function destroy(cup, door) {
            cup.kill();
        }
    }, {
        key: 'createMap',
        value: function createMap() {
            this.map = this.game.add.tilemap('map');
            //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
            this.map.addTilesetImage('dungeon_tileset_32', 'gameTiles');

            //create layer
            this.backgroundlayer = this.map.createLayer('backgroundLayer');
            this.blockedLayer = this.map.createLayer('blockedLayer');

            //collision on blockedLayer
            this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');

            this.objects.set('map', this.map);

            /***************************
            ******     items     ******
            ***************************/
            this.createItems();
            this.createWaterAreas();
        }
    }, {
        key: 'createPlayer',
        value: function createPlayer() {
            var _this2 = this;

            var playerStartPos = this.objects.byType('playerStart', 'objectsLayer');
            this.player = new _Hero2.default(this.game, playerStartPos[0].x, playerStartPos[0].y, 'player');
            this.player.scale.x = 2;
            this.player.scale.y = 2;

            /***************************
            ******     cups     ******
            ***************************/

            this.objects.cups = this.game.add.group();

            var cups = this.objects.cups;
            cups.enableBody = true;
            cups.physicsBodyType = Phaser.Physics.ARCADE;

            cups.createMultiple(50, 'cup');
            cups.setAll('checkWorldBounds', true);
            cups.setAll('outOfBoundsKill', true);

            this.game.input.onDown.add(function () {
                var cup = cups.getFirstDead();

                cup.reset(_this2.player.body.x, _this2.player.body.y);
                _this2.game.physics.arcade.moveToPointer(cup, 300);
            });
        }
    }, {
        key: 'createItems',
        value: function createItems() {
            this.items = this.game.add.group();
            this.items.enableBody = true;
            var result = this.objects.byType('item', 'objectsLayer');
            result.forEach(function (element) {
                this.createFromTiledObject(element, this.items);
            }, this);
        }
    }, {
        key: 'createWaterAreas',
        value: function createWaterAreas() {
            this.waterAreas = this.game.add.group();
            this.waterAreas.enableBody = true;
            var result = this.objects.byType('water', 'objectsLayer');
            result.forEach(function (element) {
                this.createFromTiledObject(element, this.waterAreas);
            }, this);
        }

        //find objects in a Tiled layer that containt a property called "type" equal to a certain value

        //create a sprite from an object

    }, {
        key: 'createFromTiledObject',
        value: function createFromTiledObject(element, group) {
            var sprite = group.create(element.x, element.y, element.properties.sprite);

            if (!element.properties.sprite) {
                sprite.body.setSize(element.width, element.height);
            }

            //copy all properties to the sprite
            Object.keys(element.properties).forEach(function (key) {
                sprite[key] = element.properties[key];
            });
        }
    }, {
        key: 'createControls',
        value: function createControls() {
            this.cursors = this.inputs.cursorKeys();
            this.wasd = {
                up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
                down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
                left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
                right: this.game.input.keyboard.addKey(Phaser.Keyboard.D)
            };

            this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.One);
        }
    }]);

    return GameState;
}(_State3.default);

exports.default = GameState;

},{"./../objects/Hero":7,"./../objects/Item":8,"./../objects/TestCup":10,"./State":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var State = function () {
    function State() {
        _classCallCheck(this, State);
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

},{}],6:[function(require,module,exports){
'use strict';

var _GameState = require('./States/GameState');

var _GameState2 = _interopRequireDefault(_GameState);

var _InputService = require('./Services/InputService');

var _InputService2 = _interopRequireDefault(_InputService);

var _PathService = require('./Services/PathService');

var _PathService2 = _interopRequireDefault(_PathService);

var _ObjectsService = require('./Services/ObjectsService');

var _ObjectsService2 = _interopRequireDefault(_ObjectsService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var game = game || {};

game = new Phaser.Game(640, 640, Phaser.AUTO, '');

var player,
    cursors,
    cups,
    keys = {};

var bottle = new Bottle();

bottle.service('$container', function () {
  return bottle.container;
});
bottle.service('game', function () {
  return game;
});
bottle.service('InputService', _InputService2.default, 'game');
bottle.service('PathService', _PathService2.default);
bottle.service('ObjectsService', _ObjectsService2.default, 'game');
bottle.service('GameState', _GameState2.default, 'game', '$container');

game.state.add('Game', bottle.container.GameState);
game.state.start('Game');

},{"./Services/InputService":1,"./Services/ObjectsService":2,"./Services/PathService":3,"./States/GameState":4}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Sprite2 = require('./Sprite');

var _Sprite3 = _interopRequireDefault(_Sprite2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hero = function (_Sprite) {
    _inherits(Hero, _Sprite);

    function Hero() {
        _classCallCheck(this, Hero);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Hero).apply(this, arguments));
    }

    _createClass(Hero, [{
        key: 'boot',
        value: function boot() {
            this.enableArcadePhysics();
            this.body.collideWorldBounds = true;
        }
    }, {
        key: 'getSpeed',
        value: function getSpeed() {
            return 200;
        }
    }]);

    return Hero;
}(_Sprite3.default);

exports.default = Hero;

},{"./Sprite":9}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sprite2 = require('./Sprite');

var _Sprite3 = _interopRequireDefault(_Sprite2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = function (_Sprite) {
  _inherits(Item, _Sprite);

  function Item() {
    _classCallCheck(this, Item);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Item).apply(this, arguments));
  }

  return Item;
}(_Sprite3.default);

exports.default = Item;

},{"./Sprite":9}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{"./Sprite":9}]},{},[6])


//# sourceMappingURL=app.js.map
