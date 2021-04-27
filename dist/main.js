/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/classes/cat.js":
/*!****************************!*\
  !*** ./src/classes/cat.js ***!
  \****************************/
/***/ ((module) => {

// const cat = require('../assets/images/cat.png');
const CONSTANTS = {
  CAT_WIDTH: 40,
  CAT_HEIGHT: 30
};

class Cat {
  // constructor(ctx, pos) {
  //   this.cat = new Image();
  //   this.cat.src = cat;

  //   this.ctx = ctx;
  //   this.pos = pos;
  // }
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = this.dimensions.width / 3;
    this.y = this.dimensions.height / 2;
  }

  animate(ctx) {
    this.drawCat(ctx);
  }

  // drawCat(x, y) {
  //   this.ctx.drawImage(this.cat, x, y, 140, 250);
  // }
  drawCat(ctx){
    ctx.fillStyle = "orange";
    ctx.fillRect(this.x, this.y, CONSTANTS.CAT_WIDTH, CONSTANTS.CAT_HEIGHT);
    console.log("draw cat");
  }

  // move(dir) {
  //   if (dir === 1) {
  //     this.drawCat(pos[0] + 1, pos[1]);
  //   } else {
  //     this.drawCat(pos[0] - 1, pos[1]);
  //   }
  // }
}

module.exports = Cat;


/***/ }),

/***/ "./src/classes/game.js":
/*!*****************************!*\
  !*** ./src/classes/game.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Cat = __webpack_require__(/*! ./cat */ "./src/classes/cat.js");

class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.restart();
  }

  restart() {
    this.cat = new Cat(this.dimensions);
    this.animate();
  }

  animate() {
    this.cat.animate(this.ctx);
  }
}

module.exports = Game;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
// const GameView = require('./classes/game_view');
const Game = __webpack_require__(/*! ./classes/game */ "./src/classes/game.js");
// const Cat = require("./classes/cat");

document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById("game-canvas");
  // let context = canvas.getContext("2d");

  // window.context = context;

  new Game(canvas);
  // const gameView = new GameView(context, game);
  // gameView.start();
  
  // window.gameView = gameView;
});

console.log("Webpack is working!")
})();

/******/ })()
;
//# sourceMappingURL=main.js.map