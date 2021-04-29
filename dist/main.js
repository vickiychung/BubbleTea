/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/classes/angryHuman.js":
/*!***********************************!*\
  !*** ./src/classes/angryHuman.js ***!
  \***********************************/
/***/ ((module) => {

const CONSTANTS = {
  HUMAN_WIDTH: 30,
  HUMAN_HEIGHT: 35
};

const angryHumanImg = new Image();
angryHumanImg.src = './dist/assets/images/angryHuman.png';
// img attribution
// <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

class angryHuman {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = 10;
    this.y = dimensions.height / 2 - 10;
    this.img = angryHumanImg;
    this.status = "angry";
  }

  drawHuman(ctx) {
    ctx.fillStyle = "transparent";
    ctx.fillRect(this.x, this.y, CONSTANTS.HUMAN_WIDTH, CONSTANTS.HUMAN_HEIGHT);
    ctx.drawImage(this.img, this.x, this.y, CONSTANTS.HUMAN_WIDTH, CONSTANTS.HUMAN_HEIGHT);
  }
}

module.exports = angryHuman;


/***/ }),

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
catImg.src = './dist/assets/images/cat.png';

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

  drawCat(ctx) {
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
const angryHuman = __webpack_require__(/*! ./angryHuman */ "./src/classes/angryHuman.js");
const Sofa = __webpack_require__(/*! ./sofa */ "./src/classes/sofa.js");
const Table = __webpack_require__(/*! ./table */ "./src/classes/table.js");
const Item = __webpack_require__(/*! ./item */ "./src/classes/item.js");

class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };

    this.itemsNum = 3;
    this.items = [];
    this.stashedItems = [];

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
      if (Math.floor(this.items[i]["x"]) === Math.floor(this.cat.x)) {
        this.fetchItem(i);
      }
    }
  }

  fetchItem(itemIdx) {
    this.items[itemIdx]["x"] = this.cat.x;
    this.fetchedIdx = itemIdx;
  }

  stashItem() {
    if (!Number.isInteger(this.fetchedIdx)) return null;

    if (Math.floor(this.cat.x) === Math.floor(this.sofa.x)) {
      this.stashedItems.push(this.items[this.fetchedIdx]);
      this.stashedItems = [...new Set(this.stashedItems)];

      this.items.splice(this.fetchedIdx, 1);
      this.fetchedIdx = null;
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
    return (!this.pauseCat && this.human.status === "checking");
  }

  won() {
    return (this.items.length === 0 && this.stashedItems.length === this.itemsNum);
  }

  angry() {
    this.human = new angryHuman(this.dimensions);
    this.human.drawHuman(this.ctx);
  }

  restart() {
    this.cat = new Cat(this.dimensions);
    this.human = new Human(this.dimensions);
    this.sofa = new Sofa(this.dimensions);
    this.table = new Table(this.dimensions);
  }

  animate(dirCat, pauseCat, dt) {
    this.pauseCat = pauseCat;

    this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
    this.sofa.drawSofa(this.ctx);
    this.table.drawTable(this.ctx);
    this.cat.animate(this.ctx, dirCat);
    this.human.animate(this.ctx, dt);

    for (let i = 0; i < this.items.length; i++) {
      if (i === this.fetchedIdx) {
        this.items[i].animate(this.ctx, dirCat);
      } else {
        this.items[i].drawItem(this.ctx);
      }
    }

    this.stealItem();
    this.stashItem();
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
humanImg.src = './dist/assets/images/human.png';

const checkingHumanImg = new Image();
checkingHumanImg.src = './dist/assets/images/checkingHuman.png';
// img attribution
// <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

class Human {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = 13;
    this.y = dimensions.height / 2 - 10;
    this.img = humanImg;
    this.status = "working";
  }

  animate(ctx, dt) {
    this.drawHuman(ctx);
    if (Math.floor(dt * 1000) === 23) {
      this.moveHuman();
    } 
  }

  drawHuman(ctx) {
    ctx.fillStyle = "transparent";
    ctx.fillRect(this.x, this.y, CONSTANTS.HUMAN_WIDTH, CONSTANTS.HUMAN_HEIGHT);
    ctx.drawImage(this.img, this.x, this.y, CONSTANTS.HUMAN_WIDTH, CONSTANTS.HUMAN_HEIGHT);
  }

  moveHuman() {
    this.img = (this.img === checkingHumanImg) ? humanImg : checkingHumanImg;
    this.status = (this.status === "checking") ? "working" : "checking";
  }
}

module.exports = Human;


/***/ }),

/***/ "./src/classes/item.js":
/*!*****************************!*\
  !*** ./src/classes/item.js ***!
  \*****************************/
/***/ ((module) => {

const CONSTANTS = {
  ITEM_WIDTH: 20,
  ITEM_HEIGHT: 20
};

// img attribution
// <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
const itemImg = new Image();
itemImg.src = './dist/assets/images/item.png';

class Item {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = (this.dimensions.width / 2) * Math.random();
    this.y = this.dimensions.height - 25;
    this.img = itemImg;
  }

  animate(ctx, dir) {
    this.moveItem(dir);
    this.drawItem(ctx);
  }

  drawItem(ctx) {
    ctx.fillStyle = "transparent";
    ctx.fillRect(this.x, this.y, CONSTANTS.ITEM_WIDTH, CONSTANTS.ITEM_HEIGHT);
    ctx.drawImage(this.img, this.x, this.y, CONSTANTS.ITEM_WIDTH, CONSTANTS.ITEM_HEIGHT);
  }

  moveItem(dir) {
    this.x += dir;
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
  SOFA_WIDTH: 80,
  SOFA_HEIGHT: 100
};

const sofaImg = new Image();
sofaImg.src = './dist/assets/images/sofa.png'

// img attribution
// Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>

class Sofa {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = this.dimensions.width - CONSTANTS.SOFA_WIDTH - 3;
    this.y = this.dimensions.height - CONSTANTS.SOFA_HEIGHT - 5;
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
tableImg.src = './dist/assets/images/table.png';
// img attribution
// <div>Icons made by <a href="" title="monkik">monkik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

class Table {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = 3;
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
  let dirCat = 0, pauseCat = true, pauseGame = true;

  requestAnimationFrame(loop);

  const leftButton = document.getElementById("left-button");
  const rightButton = document.getElementById("right-button");
  const pauseButton = document.getElementById("pause-button");
  const restartButton = document.getElementById("restart-button");

  const gameInstruct = document.getElementById("instruction");
  const playingText = document.getElementById("playing-text");
  const gameoverText = document.getElementById("gameover-text");
  const wonText = document.getElementById("won-text");

  leftButton.addEventListener("mousedown", e => {
    dirCat = -0.3;
    pauseCat = !pauseCat;
  });

  rightButton.addEventListener("mousedown", e => {
    dirCat = 0.3;
    pauseCat = !pauseCat;
  });

  pauseButton.addEventListener("mousedown", e => {
    pauseGame = !pauseGame;

    if (!pauseGame) {
      gameInstruct.classList.add("hidden");
      gameoverText.classList.add("hidden");
      wonText.classList.add("hidden");
      playingText.classList.remove("hidden");
    } else {
      playingText.classList.add("hidden");
      gameoverText.classList.add("hidden");
      wonText.classList.add("hidden");
      gameInstruct.classList.remove("hidden");
    }

    loop();
  })

  restartButton.addEventListener("mousedown", e => {
    gameoverText.classList.add("hidden");
    playingText.classList.add("hidden");
    wonText.classList.add("hidden");
    gameInstruct.classList.remove("hidden");

    dirCat = 0;
    pauseCat = true;
    pauseGame = true;
    game = new Game(canvas);
  });

  function timestamp() {
    return new Date().getTime();
  }

  let now, dt, last = timestamp();

  function loop() {
    if (pauseCat) {
      dirCat = 0;
    }

    if (pauseGame) {
      return cancelAnimationFrame(loop);
    }

    // if (game.lost()) {
    //   game.angry();
      
    //   gameInstruct.classList.add("hidden");
    //   playingText.classList.add("hidden");
    //   wonText.classList.add("hidden");
    //   gameoverText.classList.remove("hidden");

    //   return cancelAnimationFrame(loop);
    // }

    if (game.won()) {
      gameInstruct.classList.add("hidden");
      playingText.classList.add("hidden");
      gameoverText.classList.add("hidden");
      wonText.classList.remove("hidden");

      return cancelAnimationFrame(loop);
    }

    now = timestamp();
    dt = dt + Math.min(1, (now - last) / 1000);
    dt = (now - last) / 1000;

    game.animate(dirCat, pauseCat, dt);

    last = now;

    requestAnimationFrame(loop);
  }
  window.game = game;
  window.game.stashedItems = game.stashedItems;
});

console.log("Webpack is working!")
})();

/******/ })()
;
//# sourceMappingURL=main.js.map