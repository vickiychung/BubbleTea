/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/classes/cat.js":
/*!****************************!*\
  !*** ./src/classes/cat.js ***!
  \****************************/
/***/ ((module) => {

const CONSTANTS = {
  CAT_WIDTH: 30,
  CAT_HEIGHT: 25
};

const catImg = new Image();
catImg.src = './assets/images/cat.png';

class Cat {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = this.dimensions.width / 2;
    this.y = this.dimensions.height - 40;
  }

  animate(ctx, dir) {
    this.moveCat(dir);
    this.drawCat(ctx);
  }

  drawCat(ctx){
    ctx.fillStyle = "orange";
    ctx.fillRect(this.x, this.y, CONSTANTS.CAT_WIDTH, CONSTANTS.CAT_HEIGHT);
    ctx.drawImage(catImg, this.x, this.y, CONSTANTS.CAT_WIDTH, CONSTANTS.CAT_HEIGHT);
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
const Item = __webpack_require__(/*! ./item */ "./src/classes/item.js");

class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };

    this.itemsNum = 5;
    this.items = [];
    this.addItems();
    
    this.play(0);
  }

  addItems() {
    for (let i = 0; i < this.itemsNum; i++) {
      this.items.push(new Item(this.dimensions));
    }
  }

  stealItem() {
    for (let i = 0; i < this.items.length; i++) {
      if (Math.floor(this.items[i].x) === Math.floor(this.cat.x)) {
      }
    }
  }

  play(dirCat) {
    this.cat = new Cat(this.dimensions);
    this.human = new Human(this.dimensions);
    this.sofa = new Sofa(this.dimensions);
    this.table = new Table(this.dimensions);
    this.animate(dirCat);
  }

  lost() {
    return (!this.catPause && this.human.status === "angry");
  }

  restart() {
    this.cat = new Cat(this.dimensions);
    this.human = new Human(this.dimensions);
    this.sofa = new Sofa(this.dimensions);
    this.table = new Table(this.dimensions);
  }

  animate(dirCat, catPause, dt) {
    this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
    this.sofa.drawSofa(this.ctx);
    this.table.drawTable(this.ctx);
    this.cat.animate(this.ctx, dirCat);
    this.human.animate(this.ctx, dt);

    for (let i = 0; i < this.items.length; i++) {
      this.items[i].drawItem(this.ctx);
    }

    this.catPause = catPause;

    this.stealItem();
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

const humanImg = new Image();
humanImg.src = './assets/images/human.png';

const angryHumanImg = new Image();
angryHumanImg.src = './assets/images/angryHuman.png';
// img attribution
// <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

class Human {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = 10;
    this.y = dimensions.height / 2 - 10;
    this.img = humanImg;
    this.status = "working";
  }

  animate(ctx, dt) {
    this.drawHuman(ctx);

    if (Math.floor(dt * 1000) === 20) {
      this.moveHuman();
    }
  }

  drawHuman(ctx) {
    ctx.fillStyle = "transparent";
    ctx.fillRect(this.x, this.y, CONSTANTS.HUMAN_WIDTH, CONSTANTS.HUMAN_HEIGHT);
    ctx.drawImage(this.img, this.x, this.y, CONSTANTS.HUMAN_WIDTH, CONSTANTS.HUMAN_HEIGHT);
  }

  moveHuman() {
    this.img = angryHumanImg;
    this.status = "angry";
  }
}

module.exports = Human;


/***/ }),

/***/ "./src/classes/item.js":
/*!*****************************!*\
  !*** ./src/classes/item.js ***!
  \*****************************/
/***/ ((module) => {

class Item {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = (this.dimensions.width / 2) * Math.random();
    this.y = this.dimensions.height - 20;
  }

  drawItem(ctx) {
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(
      this.x, this.y, 5, 0, 2 * Math.PI
    );
    ctx.fill();
  }
}

module.exports = Item;


/***/ }),

/***/ "./src/classes/sofa.js":
/*!*****************************!*\
  !*** ./src/classes/sofa.js ***!
  \*****************************/
/***/ ((module) => {

const CONSTANTS = {
  SOFA_WIDTH: 100,
  SOFA_HEIGHT: 150
};

const sofaImg = new Image();
sofaImg.src = './assets/images/sofa.png'

// img attribution
// Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>

class Sofa {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = this.dimensions.width - CONSTANTS.SOFA_WIDTH + 20;
    this.y = this.dimensions.height - CONSTANTS.SOFA_HEIGHT;
  }

  drawSofa(ctx) {
    ctx.fillStyle = "beige";
    ctx.fillRect(this.x, this.y, CONSTANTS.SOFA_WIDTH, CONSTANTS.SOFA_HEIGHT);
    ctx.drawImage(sofaImg, this.x, this.y, CONSTANTS.SOFA_WIDTH, CONSTANTS.SOFA_HEIGHT);
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

const tableImg = new Image();
tableImg.src = './assets/images/table.png';
// img attribution
// <div>Icons made by <a href="" title="monkik">monkik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

class Table {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = 0;
    this.y = this.dimensions.height / 6;
  }

  drawTable(ctx) {
    ctx.fillStyle = "beige";
    ctx.fillRect(this.x, this.y, CONSTANTS.TABLE_WIDTH, CONSTANTS.TABLE_HEIGHT);
    ctx.drawImage(tableImg, this.x, this.y, CONSTANTS.TABLE_WIDTH, CONSTANTS.TABLE_HEIGHT);
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
  let game = new Game(canvas);

  let dirCat = 0, pause = true;

  requestAnimationFrame(loop);

  const leftButton = document.getElementById("left-button");
  const rightButton = document.getElementById("right-button");

  leftButton.addEventListener("mousedown", e => {
    dirCat = -0.3;
    pause = !pause;
    loop();
  });

  rightButton.addEventListener("mousedown", e => {
    dirCat = 0.3;
    pause = !pause;
    loop();
  });

  function timestamp() {
    return new Date().getTime();
  }

  let now, dt, last = timestamp();

  function loop() {
    if (pause) {
      return cancelAnimationFrame(loop);
    }

    now = timestamp();
    dt = dt + Math.min(1, (now - last) / 1000);
    dt = (now - last) / 1000;
    game.animate(dirCat, pause, dt);

    last = now;

    requestAnimationFrame(loop);

    if (game.lost()) {
      alert("Game over!\n\nRestart?");
      // cancelAnimationFrame(loop);
      // game.restart();
      dirCat = 0;
      pause = true;
      game = new Game(canvas);
      loop();
      // game.animate(dirCat, pause, dt);
      // requestAnimationFrame(loop);
    }
  } 

});

console.log("Webpack is working!")
})();

/******/ })()
;
//# sourceMappingURL=main.js.map