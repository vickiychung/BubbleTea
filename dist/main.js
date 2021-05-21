/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/classes/angryHuman.js":
/*!***********************************!*\
  !*** ./src/classes/angryHuman.js ***!
  \***********************************/
/***/ ((module) => {

const CONSTANTS = {
  HUMAN_WIDTH: 110,
  HUMAN_HEIGHT: 130
};

const angryHumanImg = new Image();
angryHumanImg.src = './dist/assets/images/angryHuman.png';

class angryHuman {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = 40;
    this.y = dimensions.height / 2 - 50;
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
  CAT_WIDTH: 100,
  CAT_HEIGHT: 110
};

const catImg = new Image();
catImg.src = './dist/assets/images/cat.png';

const happyCatImg = new Image();
happyCatImg.src = './dist/assets/images/happyCat.png';

class Cat {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = this.dimensions.width / 2;
    this.y = this.dimensions.height - 180;
    this.img = catImg;
  }

  animate(ctx, dir) {
    this.moveCat(dir);
    this.drawCat(ctx);
  }

  drawCat(ctx) {
    ctx.fillStyle = "transparent";
    ctx.fillRect(this.x, this.y, CONSTANTS.CAT_WIDTH, CONSTANTS.CAT_HEIGHT);
    ctx.drawImage(this.img, this.x, this.y, CONSTANTS.CAT_WIDTH, CONSTANTS.CAT_HEIGHT);
  }

  moveCat(dir) {
    this.x += dir;
  }

  changeImg(ctx) {
    this.img = happyCatImg;
    this.drawCat(ctx);
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
const stashedItem = __webpack_require__(/*! ./stashedItem */ "./src/classes/stashedItem.js");

class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };

    this.itemsNum = 3;
    this.items = [];
    this.stashedItems = [];
    this.stashedItemsPile = [];

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
      this.stashedItemsPile.push(new stashedItem(this.dimensions));

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
    return (
      !this.pauseCat && 
      Number.isInteger(this.fetchedIdx) && 
      this.human.status === "checking"
    );
  }

  won() {
    if (this.items.length === 0 && this.stashedItems.length === this.itemsNum) {
      this.gameWon = true;
    }
  }

  happyCat() {
    if (this.gameWon) {
      this.cat.changeImg(this.ctx);
    }
  }

  angry() {
    this.human = new angryHuman(this.dimensions);
    this.human.drawHuman(this.ctx);[]
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

    for (let i = 0; i < this.stashedItemsPile.length; i++) {
      this.stashedItemsPile[i].drawItem(this.ctx);
    }

    this.won();
    this.happyCat();
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
  HUMAN_WIDTH: 110,
  HUMAN_HEIGHT: 130
};

const humanImg = new Image();
humanImg.src = './dist/assets/images/human.png';

const checkingHumanImg = new Image();
checkingHumanImg.src = './dist/assets/images/checkingHuman.png';

class Human {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = 40;
    this.y = dimensions.height / 2 - 50;
    this.img = humanImg;
    this.status = "working";
  }

  animate(ctx, dt) {
    this.drawHuman(ctx);
    
    if (dt * 1000 === 23) {
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
  ITEM_WIDTH: 60,
  ITEM_HEIGHT: 60
};

const itemImg = new Image();
itemImg.src = './dist/assets/images/item.png';

class Item {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = (this.dimensions.width / 2 - 10) * Math.random();
    this.y = this.dimensions.height - 120;
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
  SOFA_WIDTH: 300,
  SOFA_HEIGHT: 380
};

const sofaImg = new Image();
sofaImg.src = './dist/assets/images/sofa.png'

class Sofa {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = this.dimensions.width - CONSTANTS.SOFA_WIDTH - 20;
    this.y = this.dimensions.height - CONSTANTS.SOFA_HEIGHT - 10;
  }

  drawSofa(ctx) {
    ctx.fillStyle = "beige";
    ctx.fillRect(this.x, this.y, CONSTANTS.SOFA_WIDTH, CONSTANTS.SOFA_HEIGHT);
    ctx.drawImage(sofaImg, this.x, this.y, CONSTANTS.SOFA_WIDTH, CONSTANTS.SOFA_HEIGHT);
  }
}

module.exports = Sofa;


/***/ }),

/***/ "./src/classes/stashedItem.js":
/*!************************************!*\
  !*** ./src/classes/stashedItem.js ***!
  \************************************/
/***/ ((module) => {

const CONSTANTS = {
  ITEM_WIDTH: 60,
  ITEM_HEIGHT: 60
};

const itemImg = new Image();
itemImg.src = './dist/assets/images/item.png';

class stashedItem {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = this.getRandInt(this.dimensions.width - 300, this.dimensions.width - 90);
    this.y = this.dimensions.height - 140;
    this.img = itemImg;
  }

  getRandInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  drawItem(ctx) {
    ctx.fillStyle = "transparent";
    ctx.fillRect(this.x, this.y, CONSTANTS.ITEM_WIDTH, CONSTANTS.ITEM_HEIGHT);
    ctx.drawImage(this.img, this.x, this.y, CONSTANTS.ITEM_WIDTH, CONSTANTS.ITEM_HEIGHT);
  }
}

module.exports = stashedItem;


/***/ }),

/***/ "./src/classes/table.js":
/*!******************************!*\
  !*** ./src/classes/table.js ***!
  \******************************/
/***/ ((module) => {

const CONSTANTS = {
  TABLE_WIDTH: 180,
  TABLE_HEIGHT: 200
};

const tableImg = new Image();
tableImg.src = './dist/assets/images/table.png';

class Table {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = 10;
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

  const musicControls = document.getElementById("music-controls");
  const musicPlay = document.getElementById("music-play");
  const musicPause = document.getElementById("music-pause");
  const music = document.getElementById("music");

  const leftButton = document.getElementById("left-button");
  const rightButton = document.getElementById("right-button");
  const pauseButton = document.getElementById("pause-button");
  const restartButton = document.getElementById("restart-button");

  const gameInstruct = document.getElementById("instruction");
  const playingText = document.getElementById("playing-text");
  const gameoverText = document.getElementById("gameover-text");
  const wonText = document.getElementById("won-text");

  musicControls.addEventListener("click", e => {
    if (music.paused) {
      music.play();
      musicPlay.classList.add("hidden");
      musicPause.classList.remove("hidden");
    } else {
      music.pause();
      musicPause.classList.add("hidden");
      musicPlay.classList.remove("hidden");
    }
  })

  document.addEventListener("keydown", e => {
    if (e.defaultPrevented) return;
    e.preventDefault();

    switch(e.code) {
      case "ArrowLeft":
        dirCat = -1.3;
        pauseCat = !pauseCat;
        break;
      case "ArrowRight":
        dirCat = 1.3;
        pauseCat = !pauseCat;
        break;
      case "KeyR":
        gameoverText.classList.add("hidden");
        playingText.classList.add("hidden");
        wonText.classList.add("hidden");
        gameInstruct.classList.remove("hidden");

        dirCat = 0;
        pauseCat = true;
        pauseGame = true;
        game = new Game(canvas);
        break;
      case "Space":
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
        break;
    }
  })

  leftButton.addEventListener("mousedown", e => {
    dirCat = -1.3;
    pauseCat = !pauseCat;
  });

  rightButton.addEventListener("mousedown", e => {
    dirCat = 1.3;
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

    if (game.lost()) {
      game.angry();
      
      gameInstruct.classList.add("hidden");
      playingText.classList.add("hidden");
      wonText.classList.add("hidden");
      gameoverText.classList.remove("hidden");

      return cancelAnimationFrame(loop);
    }

    if (game.gameWon) {
      gameInstruct.classList.add("hidden");
      playingText.classList.add("hidden");
      gameoverText.classList.add("hidden");
      wonText.classList.remove("hidden");

      return cancelAnimationFrame(loop);
    }

    now = timestamp();
    dt = (now - last) / 1000;

    game.animate(dirCat, pauseCat, dt);

    last = now;

    requestAnimationFrame(loop);
  }
});

})();

/******/ })()
;
//# sourceMappingURL=main.js.map