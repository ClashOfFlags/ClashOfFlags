/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _vue = __webpack_require__(1);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _vueRouter = __webpack_require__(2);
	
	var _vueRouter2 = _interopRequireDefault(_vueRouter);
	
	var _App = __webpack_require__(3);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _router = __webpack_require__(11);
	
	var _router2 = _interopRequireDefault(_router);
	
	__webpack_require__(38);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_vue2.default.config.debug = true;
	
	_vue2.default.use(_vueRouter2.default);
	_router2.default.start(_App2.default, 'app');

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = Vue;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = VueRouter;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(4)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] app/client/components/App.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(7)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/Marc/GitHub/ClashOfFlags/app/client/components/App.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Navbar = __webpack_require__(5);
	
	var _Navbar2 = _interopRequireDefault(_Navbar);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    components: { Navbar: _Navbar2.default }
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_template__ = __webpack_require__(6)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/Marc/GitHub/ClashOfFlags/app/client/components/Navbar.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "\n<nav class=\"navbar navbar-full navbar-light bg-faded\">\n    <a class=\"navbar-brand\" v-link=\"{ path: '/', exact: true }\">Clash of Flags</a>\n    <div class=\"nav navbar-nav\">\n        <a class=\"nav-item nav-link\" v-link=\"{ path: '/', exact: true }\">Play</a>\n        <a class=\"nav-item nav-link\" v-link=\"{ path: '/login' }\">Login</a>\n        <a class=\"nav-item nav-link\" v-link=\"{ path: '/register' }\">Register</a>\n        <a class=\"nav-item nav-link\" v-link=\"{ path: '/about' }\">About</a>\n    </div>\n</nav>\n";

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "\n<navbar></navbar>\n<div class=\"container\">\n    <router-view></router-view>\n</div>\n";

/***/ },
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _vueRouter = __webpack_require__(2);
	
	var _vueRouter2 = _interopRequireDefault(_vueRouter);
	
	var _Game = __webpack_require__(12);
	
	var _Game2 = _interopRequireDefault(_Game);
	
	var _Login = __webpack_require__(14);
	
	var _Login2 = _interopRequireDefault(_Login);
	
	var _Register = __webpack_require__(25);
	
	var _Register2 = _interopRequireDefault(_Register);
	
	var _About = __webpack_require__(30);
	
	var _About2 = _interopRequireDefault(_About);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* Views */
	
	/* Views */
	var routerOptions = {
	    hashbang: false,
	    history: true,
	    linkActiveClass: 'active',
	    saveScrollPosition: true
	};
	var router = new _vueRouter2.default(routerOptions);
	
	exports.default = router;
	
	/* Routes */
	
	router.map({
	    '/': {
	        component: _Game2.default
	    },
	    '/login': {
	        component: _Login2.default
	    },
	    '/register': {
	        component: _Register2.default
	    },
	    '/about': {
	        component: _About2.default
	    }
	});
	
	router.redirect({
	    '*': '/'
	});
	/* Routes */

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(13)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] app/client/components/views/Game.vue: named exports in *.vue files are ignored.")}
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/Marc/GitHub/ClashOfFlags/app/client/components/views/Game.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    route: {
	        activate: function activate() {
	            setTimeout(function () {
	                $('#game').show();
	                window.clashOfFlags.unpause();
	            }, 1);
	        },
	        deactivate: function deactivate() {
	            window.clashOfFlags.pause();
	            $('#game').hide();
	        }
	    }
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(15)
	__vue_script__ = __webpack_require__(19)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] app/client/components/views/Login.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(24)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/Marc/GitHub/ClashOfFlags/app/client/components/views/Login.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(16);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Login.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Login.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(17)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.center-block {\n    float: none;\n}\n", "", {"version":3,"sources":["/./app/client/components/views/Login.vue?0ea3fd74"],"names":[],"mappings":";AAsBA;IACA,YAAA;CACA","file":"Login.vue","sourcesContent":["<template>\n    <div class=\"row\">\n        <div class=\"col-xs-4 center-block\">\n            <h1>Login</h1>\n            <div class=\"form-group\">\n                <label for=\"username\">Username</label>\n                <input id=\"username\" type=\"text\" class=\"form-control\" placeholder=\"Username\">\n            </div>\n            <div class=\"form-group\">\n                <label for=\"password\">Password</label>\n                <input id=\"password\" type=\"password\" class=\"form-control\" placeholder=\"Password\">\n            </div>\n            <button type=\"button\" class=\"btn btn-primary btn-block\">Login</button>\n            <hr>\n            <a class=\"text-muted\" v-link=\"{ path: '/register' }\">Need an account?</a>\n            <br>\n            <a class=\"text-muted\" v-link=\"{ path: '/forgot/password' }\">Forgot your password?</a>\n        </div>\n    </div>\n</template>\n\n<style>\n    .center-block {\n        float: none;\n    }\n</style>\n\n<script type=\"text/babel\">\n    import api from '../../api';\n\n    export default {\n        data() {\n            return {\n                username: '',\n                password: ''\n            };\n        },\n        methods: {\n            register() {\n                api.login(this.username, this.password);\n            }\n        }\n    };\n</script>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 17 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if (media) {
			styleElement.setAttribute("media", media);
		}
	
		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _api = __webpack_require__(20);
	
	var _api2 = _interopRequireDefault(_api);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    data: function data() {
	        return {
	            username: '',
	            password: ''
	        };
	    },
	
	    methods: {
	        register: function register() {
	            _api2.default.login(this.username, this.password);
	        }
	    }
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _register = __webpack_require__(21);
	
	var _register2 = _interopRequireDefault(_register);
	
	var _login = __webpack_require__(23);
	
	var _login2 = _interopRequireDefault(_login);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    register: _register2.default,
	    login: _login2.default
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _socket = __webpack_require__(22);
	
	var _socket2 = _interopRequireDefault(_socket);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = register;
	
	
	function register(email, username, password) {
	    return _socket2.default.emit('register', {
	        email: email,
	        username: username,
	        password: password
	    });
	}

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var socket = io();
	
	exports.default = {
	    emit: emit
	};
	
	
	function emit(event, payload) {
	    return new Promise(function (resolve, reject) {
	        socket.emit(event, payload, function (response) {
	            return resolve(response);
	        });
	    });
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _socket = __webpack_require__(22);
	
	var _socket2 = _interopRequireDefault(_socket);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = login;
	
	
	function login(username, password) {
	    return _socket2.default.emit('login', {
	        username: username,
	        password: password
	    });
	}

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"row\">\n    <div class=\"col-xs-4 center-block\">\n        <h1>Login</h1>\n        <div class=\"form-group\">\n            <label for=\"username\">Username</label>\n            <input id=\"username\" type=\"text\" class=\"form-control\" placeholder=\"Username\">\n        </div>\n        <div class=\"form-group\">\n            <label for=\"password\">Password</label>\n            <input id=\"password\" type=\"password\" class=\"form-control\" placeholder=\"Password\">\n        </div>\n        <button type=\"button\" class=\"btn btn-primary btn-block\">Login</button>\n        <hr>\n        <a class=\"text-muted\" v-link=\"{ path: '/register' }\">Need an account?</a>\n        <br>\n        <a class=\"text-muted\" v-link=\"{ path: '/forgot/password' }\">Forgot your password?</a>\n    </div>\n</div>\n";

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(26)
	__vue_script__ = __webpack_require__(28)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] app/client/components/views/Register.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(29)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/Marc/GitHub/ClashOfFlags/app/client/components/views/Register.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(27);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Register.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Register.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(17)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.center-block {\n    float: none;\n}\n", "", {"version":3,"sources":["/./app/client/components/views/Register.vue?92930f48"],"names":[],"mappings":";AA+DA;IACA,YAAA;CACA","file":"Register.vue","sourcesContent":["<template>\n    <div class=\"row\">\n        <div class=\"col-xs-4 center-block\">\n            <h1>Register</h1>\n            <validator name=\"validation\">\n                <!-- Email -->\n                <form-group :field=\"$validation.email\">\n                    <label class=\"form-control-label\" for=\"email\">Email</label>\n                    <input id=\"email\"\n                           type=\"email\"\n                           class=\"form-control\"\n                           placeholder=\"name@domain.com\"\n                           v-model=\"email\"\n                           v-validate:email=\"{ email: true }\">\n                    <validation-messages :field=\"$validation.email\">\n                        <span v-show=\"$validation.email.email\">Please enter a valid email address</span>\n                    </validation-messages>\n                </form-group>\n                <!-- Email -->\n                <!-- Username -->\n                <form-group :field=\"$validation.username\">\n                    <label for=\"username\">Username</label>\n                    <input id=\"username\"\n                           type=\"text\"\n                           class=\"form-control\"\n                           placeholder=\"Username\"\n                           v-model=\"username\"\n                           v-validate:username=\"{ minlength: 3, maxlength: 16 }\">\n                    <validation-messages :field=\"$validation.username\">\n                        <span v-show=\"$validation.username.minlength\">Your username must be at least 3 characters long</span>\n                        <br>\n                        <span v-show=\"$validation.username.maxlength\">Your username cannot be longer than 16 characters</span>\n                    </validation-messages>\n                </form-group>\n                <!-- Username -->\n                <!-- Password -->\n                <form-group :field=\"$validation.password\">\n                    <label for=\"password\">Password</label>\n                    <input id=\"password\"\n                           type=\"password\"\n                           class=\"form-control\"\n                           placeholder=\"Password\"\n                           v-model=\"password\"\n                           v-validate:password=\"{ required: true, minlength: 8, maxlength: 100 }\">\n                    <validation-messages :field=\"$validation.password\">\n                        <span v-show=\"$validation.password.required\">Please enter a password</span>\n                        <span v-show=\"$validation.password.minlength\">Your password should be at least 8 characters long</span>\n                        <br>\n                        <span v-show=\"$validation.password.maxlength\">Your password cannot be longer than 100 characters</span>\n                    </validation-messages>\n                </form-group>\n                <!-- Password -->\n                <!-- Submit -->\n                <button type=\"button\" class=\"btn btn-primary btn-block\" :disabled=\"$validation.invalid\" @click=\"register()\">Register</button>\n                <!-- Submit -->\n            </validator>\n            <hr>\n            <a class=\"text-muted\" v-link=\"{ path: '/login' }\">Already have an account?</a>\n        </div>\n    </div>\n</template>\n\n<style>\n    .center-block {\n        float: none;\n    }\n</style>\n\n<script type=\"text/babel\">\n    import api from '../../api';\n\n    export default {\n        data() {\n            return {\n                email: '',\n                username: '',\n                password: ''\n            };\n        },\n        methods: {\n            register() {\n                api.register(this.email, this.username, this.password)\n                    .then(data => {\n                        console.log(data);\n                    });\n            }\n        }\n    };\n</script>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _api = __webpack_require__(20);
	
	var _api2 = _interopRequireDefault(_api);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    data: function data() {
	        return {
	            email: '',
	            username: '',
	            password: ''
	        };
	    },
	
	    methods: {
	        register: function register() {
	            _api2.default.register(this.email, this.username, this.password).then(function (data) {
	                console.log(data);
	            });
	        }
	    }
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"row\">\n    <div class=\"col-xs-4 center-block\">\n        <h1>Register</h1>\n        <validator name=\"validation\">\n            <!-- Email -->\n            <form-group :field=\"$validation.email\">\n                <label class=\"form-control-label\" for=\"email\">Email</label>\n                <input id=\"email\"\n                       type=\"email\"\n                       class=\"form-control\"\n                       placeholder=\"name@domain.com\"\n                       v-model=\"email\"\n                       v-validate:email=\"{ email: true }\">\n                <validation-messages :field=\"$validation.email\">\n                    <span v-show=\"$validation.email.email\">Please enter a valid email address</span>\n                </validation-messages>\n            </form-group>\n            <!-- Email -->\n            <!-- Username -->\n            <form-group :field=\"$validation.username\">\n                <label for=\"username\">Username</label>\n                <input id=\"username\"\n                       type=\"text\"\n                       class=\"form-control\"\n                       placeholder=\"Username\"\n                       v-model=\"username\"\n                       v-validate:username=\"{ minlength: 3, maxlength: 16 }\">\n                <validation-messages :field=\"$validation.username\">\n                    <span v-show=\"$validation.username.minlength\">Your username must be at least 3 characters long</span>\n                    <br>\n                    <span v-show=\"$validation.username.maxlength\">Your username cannot be longer than 16 characters</span>\n                </validation-messages>\n            </form-group>\n            <!-- Username -->\n            <!-- Password -->\n            <form-group :field=\"$validation.password\">\n                <label for=\"password\">Password</label>\n                <input id=\"password\"\n                       type=\"password\"\n                       class=\"form-control\"\n                       placeholder=\"Password\"\n                       v-model=\"password\"\n                       v-validate:password=\"{ required: true, minlength: 8, maxlength: 100 }\">\n                <validation-messages :field=\"$validation.password\">\n                    <span v-show=\"$validation.password.required\">Please enter a password</span>\n                    <span v-show=\"$validation.password.minlength\">Your password should be at least 8 characters long</span>\n                    <br>\n                    <span v-show=\"$validation.password.maxlength\">Your password cannot be longer than 100 characters</span>\n                </validation-messages>\n            </form-group>\n            <!-- Password -->\n            <!-- Submit -->\n            <button type=\"button\" class=\"btn btn-primary btn-block\" :disabled=\"$validation.invalid\" @click=\"register()\">Register</button>\n            <!-- Submit -->\n        </validator>\n        <hr>\n        <a class=\"text-muted\" v-link=\"{ path: '/login' }\">Already have an account?</a>\n    </div>\n</div>\n";

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_template__ = __webpack_require__(31)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/Marc/GitHub/ClashOfFlags/app/client/components/views/About.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"jumbotron jumbotron-fluid\">\n    <div class=\"container\">\n        <h1 class=\"display-4\">About Clash of Flags</h1>\n        <p class=\"lead\">\n            This project has been created by <strong><a href=\"http://schneider.click\" target=\"_blank\">Simon Schneider</a></strong>, <strong><a href=\"http://schemel.me\" target=\"_blank\">Philipp Schemel</a></strong>, <strong>Jochen Walther</strong> & <strong><a href=\"http://vornetran.de\" target=\"_blank\">Marc Vornetran</a></strong> for the <i>\"Games and Gaming\"</i> course at the <strong>Cooperative State University</strong> in <strong>Karlsruhe</strong>.</p>\n        </p>\n    </div>\n</div>\n";

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(33)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] app/client/components/forms/FormGroup.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(34)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/Marc/GitHub/ClashOfFlags/app/client/components/forms/FormGroup.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    props: ['field'],
	    computed: {
	        hasDanger: function hasDanger() {
	            var field = this.field;
	            var hasDanger = false;
	
	            if (field) {
	                hasDanger = field.invalid && field.dirty;
	            }
	
	            return {
	                'has-danger': hasDanger
	            };
	        }
	    }
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"form-group\" :class=\"hasDanger\">\n    <slot></slot>\n</div>\n";

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(36)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] app/client/components/forms/ValidationMessages.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(37)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/Marc/GitHub/ClashOfFlags/app/client/components/forms/ValidationMessages.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    props: ['field'],
	    computed: {
	        invalidAndTouched: function invalidAndTouched() {
	            var field = this.field;
	
	            if (field) {
	                return field.invalid && field.touched;
	            }
	
	            return false;
	        }
	    }
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = "\n<p class=\"text-danger\" v-show=\"invalidAndTouched\">\n    <slot></slot>\n</p>\n";

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _vue = __webpack_require__(1);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _FormGroup = __webpack_require__(32);
	
	var _FormGroup2 = _interopRequireDefault(_FormGroup);
	
	var _ValidationMessages = __webpack_require__(35);
	
	var _ValidationMessages2 = _interopRequireDefault(_ValidationMessages);
	
	__webpack_require__(39);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_vue2.default.component('form-group', _FormGroup2.default);
	_vue2.default.component('validation-messages', _ValidationMessages2.default);

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _vue = __webpack_require__(1);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _email = __webpack_require__(40);
	
	var _email2 = _interopRequireDefault(_email);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_vue2.default.validator('email', _email2.default);

/***/ },
/* 40 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = email;
	function email(value) {
	    if (value === undefined || value === null || value.length === 0) {
	        return false;
	    }
	
	    if (value.indexOf('@') === -1) {
	        return false;
	    }
	
	    if (value.length < 5 || value.length > 254) {
	        return false;
	    }
	
	    var simpleEmailRegex = /\S+@\S+/;
	
	    if (!simpleEmailRegex.test(value)) {
	        return false;
	    }
	
	    return true;
	};

/***/ }
/******/ ]);
//# sourceMappingURL=app-vue.js.map