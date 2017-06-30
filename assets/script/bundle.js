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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Grid = (function () {
    function Grid(height, width) {
        this.height = height;
        this.width = width;
        this.matrix = [];
        this.tileIndexes = {
            wall: 0,
            way: 1,
            open: 2
        };
        this.tileDisplays = {
            wall: '#',
            way: 'o',
            open: '='
        };
        this.tileLinks = [
            this.tileDisplays.wall,
            this.tileDisplays.way,
            this.tileDisplays.open
        ];
        this.realHeight = (this.height * 2) + 1;
        this.realWidth = (this.width * 2) + 1;
        this.createGrid();
        this.displayGridInHTML('zone');
    }
    Grid.prototype.createGrid = function () {
        var cellUid = 0;
        for (var y = 0; y < this.realHeight; y++) {
            this.matrix.push([]);
            for (var x = 0; x < this.realWidth; x++) {
                if (((y + 1) % 2 !== 0) || ((x + 1) % 2 !== 0)) {
                    this.matrix[y].push(this.tileIndexes.wall);
                }
                else {
                    this.matrix[y].push(++cellUid);
                }
            }
        }
    };
    Grid.prototype.createLab = function () {
        var closedCells = this.height * this.width;
        this.getRandomInt(1, closedCells);
        var cell = 'TODO';
    };
    Grid.prototype.createNextWay = function () {
        var directions = ['top', 'right', 'bottom', 'left'];
        var previousTile = this.matrix[this.previousWay.y][this.previousWay.x];
        while (directions.length) {
            var nextTile = { x: 0, y: 0 };
            var directionIdx = this.getRandomInt(0, directions.length - 1);
            var nextDirectionCoords = {
                'top': {
                    x: this.previousWay.x,
                    y: this.previousWay.y - 1
                },
                'top-right': {
                    x: this.previousWay.x + 1,
                    y: this.previousWay.y - 1
                },
                'right': {
                    x: this.previousWay.x + 1,
                    y: this.previousWay.y
                },
                'bottom-right': {
                    x: this.previousWay.x + 1,
                    y: this.previousWay.y + 1
                },
                'bottom': {
                    x: this.previousWay.x,
                    y: this.previousWay.y + 1
                },
                'bottom-left': {
                    x: this.previousWay.x - 1,
                    y: this.previousWay.y + 1
                },
                'left': {
                    x: this.previousWay.x - 1,
                    y: this.previousWay.y
                },
                'top-left': {
                    x: this.previousWay.x - 1,
                    y: this.previousWay.y - 1
                }
            };
            var direction = directions[directionIdx];
            var nextCoords = nextDirectionCoords[direction];
            var line = this.matrix[nextCoords.y];
            if ((!line) || isNaN(line[nextCoords.x]) || (line[nextCoords.x] === this.tileIndexes.wall)) {
                directions.splice(directionIdx, 1);
            }
            else {
                this.matrix[nextCoords.y][nextCoords.x] = this.tileIndexes.wall;
                this.previousWay.x = nextCoords.x;
                this.previousWay.y = nextCoords.y;
                directions.length = 0;
            }
        }
    };
    Grid.prototype.createIO = function () {
        this.entrance = {
            y: this.getRandomInt(1, this.height - 2),
            x: 0
        };
        this.exit = {
            y: this.getRandomInt(1, this.height - 2),
            x: this.matrix.length - 1
        };
        this.previousWay = this.entrance;
        this.matrix[this.entrance.y][this.entrance.x] = this.tileIndexes.way;
        this.matrix[this.exit.y][this.exit.x] = this.tileIndexes.way;
    };
    Grid.prototype.displayGridInHTML = function (elementId) {
        var _this = this;
        var zone = document.getElementById(elementId);
        this.matrix.forEach(function (line) {
            line.forEach(function (tileIdx) {
                zone.appendChild(_this.createHtmlElement('span', _this.tileLinks[tileIdx] || tileIdx + ''));
            });
            zone.appendChild(_this.createLimit());
        });
    };
    Grid.prototype.createHtmlElement = function (element, text) {
        var tile = document.createElement(element);
        tile.innerText = text;
        return tile;
    };
    Grid.prototype.createLimit = function () {
        var nextLine = document.createElement('br');
        return nextLine;
    };
    Grid.prototype.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    return Grid;
}());
var grid1 = new Grid(4, 4);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map