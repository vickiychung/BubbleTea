/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/classes/cat.js":
/*!****************************!*\
  !*** ./src/classes/cat.js ***!
  \****************************/
/***/ ((module) => {

const CONSTANTS = {
  CAT_WIDTH: 40,
  CAT_HEIGHT: 30
};

class Cat {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = this.dimensions.width / 2;
    this.y = this.dimensions.height / 2;
  }

  animate(ctx, dir) {
    this.moveCat(dir);
    this.drawCat(ctx);
  }

  drawCat(ctx){
    ctx.fillStyle = "orange";
    ctx.fillRect(this.x, this.y, CONSTANTS.CAT_WIDTH, CONSTANTS.CAT_HEIGHT);
  }

  moveCat(dir) {
    if (dir === 1) {
      this.x += 3;
    } else {
      this.x -= 3;
    }
  }
}

module.exports = Cat;


/***/ }),

/***/ "./src/classes/game.js":
/*!*****************************!*\
  !*** ./src/classes/game.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Cat = __webpack_require__(/*! ./cat */ "./src/classes/cat.js");
const Sofa = __webpack_require__(/*! ./sofa */ "./src/classes/sofa.js");
const Table = __webpack_require__(/*! ./table */ "./src/classes/table.js");

class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.registerEvents();
    this.restart();
  }

  play() {
    this.playing = true;
    this.animate();
  }

  restart() {
    this.cat = new Cat(this.dimensions);
    this.sofa = new Sofa(this.dimensions);
    this.table = new Table(this.dimensions);
    this.animate();
  }

  registerEvents() {
    this.boundLeftClickHandler = this.leftClick.bind(this);
    this.boundRightClickHandler = this.rightClick.bind(this);

    const leftButton = document.getElementById("left-button");
    const rightButton = document.getElementById("right-button")
    leftButton.addEventListener("mousedown", this.boundLeftClickHandler);
    rightButton.addEventListener("mousedown", this.boundRightClickHandler);
    // this.ctx.canvas.addEventListener("mousedown", this.boundClickHandler);
  }

  leftClick(e) {
    if (!this.playing) {
      this.play();
    }
    this.dir = -1;
  }

  rightClick(e) {
    if (!this.playing) {
      this.play();
    }
    this.dir = 1;
  }
  
  animate() {
    this.sofa.drawSofa(this.ctx);
    this.table.drawTable(this.ctx);
    this.cat.animate(this.ctx, this.dir);

     if (this.playing) {
      requestAnimationFrame(this.animate.bind(this));
    }
  }
}

module.exports = Game;


/***/ }),

/***/ "./src/classes/sofa.js":
/*!*****************************!*\
  !*** ./src/classes/sofa.js ***!
  \*****************************/
/***/ ((module) => {

const CONSTANTS = {
  SOFA_WIDTH: 50,
  SOFA_HEIGHT: 130
};

class Sofa {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = this.dimensions.width - CONSTANTS.SOFA_WIDTH;
    this.y = this.dimensions.height - CONSTANTS.SOFA_HEIGHT;
  }

  drawSofa(ctx) {
    ctx.fillStyle = "#484848";
    ctx.fillRect(this.x, this.y, CONSTANTS.SOFA_WIDTH, CONSTANTS.SOFA_HEIGHT);
  }
}

module.exports = Sofa;


/***/ }),

/***/ "./src/classes/table.js":
/*!******************************!*\
  !*** ./src/classes/table.js ***!
  \******************************/
/***/ ((module) => {

const CONSTANTS = {
  TABLE_WIDTH: 50,
  TABLE_HEIGHT: 50
};

class Table {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = 0;
    this.y = this.dimensions.height / 3;
  }

  drawTable(ctx) {
    ctx.fillStyle = "brown";
    ctx.fillRect(this.x, this.y, CONSTANTS.TABLE_WIDTH, CONSTANTS.TABLE_HEIGHT);
  }
}

module.exports = Table;


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
const Game = __webpack_require__(/*! ./classes/game */ "./src/classes/game.js");

document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById("game-canvas");

  new Game(canvas);
});

console.log("Webpack is working!")
})();

/******/ })()
;
//# sourceMappingURL=main.js.map