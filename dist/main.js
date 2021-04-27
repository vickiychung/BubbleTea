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
    this.x += dir;
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
const Human = __webpack_require__(/*! ./human */ "./src/classes/human.js");
const Sofa = __webpack_require__(/*! ./sofa */ "./src/classes/sofa.js");
const Table = __webpack_require__(/*! ./table */ "./src/classes/table.js");

class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };

    // this.restart();
    this.play(0);
  }

  play(dirCat) {
    this.playing = true;
    this.cat = new Cat(this.dimensions);
    this.human = new Human(this.dimensions);
    this.sofa = new Sofa(this.dimensions);
    this.table = new Table(this.dimensions);
    this.animate(dirCat);
  }

  // restart(dir) {
  //   this.cat = new Cat(this.dimensions);
  //   this.sofa = new Sofa(this.dimensions);
  //   this.table = new Table(this.dimensions);
  //   this.animate(dir);
  // }
  
  animate(dirCat, dt) {
    this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
    this.sofa.drawSofa(this.ctx);
    this.table.drawTable(this.ctx);
    this.cat.animate(this.ctx, dirCat);
    this.human.animate(this.ctx, dt);
  }

  
}

module.exports = Game;


/***/ }),

/***/ "./src/classes/human.js":
/*!******************************!*\
  !*** ./src/classes/human.js ***!
  \******************************/
/***/ ((module) => {

const CONSTANTS = {
  HUMAN_WIDTH: 30,
  HUMAN_HEIGHT: 35
};

class Human {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = 10;
    this.y = 0 + dimensions.height / 2 + 20;
  }

  animate(ctx, dt) {
    console.log(dt);
    this.drawHuman(ctx);

    // this.randomTurn(ctx);
  }

  drawHuman(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, CONSTANTS.HUMAN_WIDTH, CONSTANTS.HUMAN_HEIGHT);
  }

  moveHuman(ctx) {
    const colors = ["black", "pink"];
    let rand = Math.floor(Math.random() * 2);
    let randColor = colors[rand];

    ctx.fillStyle = randColor;
    ctx.fillRect(this.x, this.y, CONSTANTS.HUMAN_WIDTH, CONSTANTS.HUMAN_HEIGHT);
  }

  // randomTurn(ctx) {
  //   const min = 3, max = 5;
  //   let rand = Math.floor(Math.random() * (max - min + 1) + min);
  //   window.setTimeout(this.moveHuman(ctx), rand * 1000000000000000);
  // }
}

module.exports = Human;


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

  const game = new Game(canvas);
  let dirCat = 0, pause = true;
  // loop();
  requestAnimationFrame(loop);
  // randomTurn();

  const leftButton = document.getElementById("left-button");
  const rightButton = document.getElementById("right-button");
  // const playButton = document.getElementById("play-button");

  leftButton.addEventListener("mousedown", e => {
    dirCat = -1;
    pause = !pause;
    loop();
  });

  rightButton.addEventListener("mousedown", e => {
    dirCat = 1;
    pause = !pause;
    loop();
  });

  // playButton.addEventListener("mousedown", e => {
  //   pause = false;
  //   loop();
  // })

  // function randomTurn() {
  //    console.log(turnHuman);

  //   const min = 3, max = 5;
  //   let rand = Math.floor(Math.random() * (max - min + 1) + min);
  //   turnHuman = !turnHuman;
  //   window.setTimeout(randomTurn(), rand * 1000);
  // }

  function timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
  }

  let now, dt = 0, last = timestamp(), step = 1/60;

  function loop() {
    if (pause) {
      return cancelAnimationFrame(loop);
    }

    now = timestamp();
    dt = dt + Math.min(1, (now - last) / 1000);
    while (dt > step) {
      dt = dt - step;
    }

    game.animate(dirCat, dt);

    last = now;

    requestAnimationFrame(loop);
  } 

});

console.log("Webpack is working!")
})();

/******/ })()
;
//# sourceMappingURL=main.js.map