const Cat = require("./cat");
const Sofa = require("./sofa");
const Table = require("./table");

class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };

    // this.update = () => {
    //   Game.clear();
    //   this.restart();
    // }

    // this.registerEvents();
    // this.restart();
    this.play(0);
  }

  play(dir) {
    this.playing = true;
    this.cat = new Cat(this.dimensions);
    this.sofa = new Sofa(this.dimensions);
    this.table = new Table(this.dimensions);
    this.animate(dir);
  }

  // restart(dir) {
  //   this.cat = new Cat(this.dimensions);
  //   this.sofa = new Sofa(this.dimensions);
  //   this.table = new Table(this.dimensions);
  //   this.animate(dir);
  // }

  // registerEvents() {
  //   this.boundLeftClickHandler = this.leftClick.bind(this);
  //   this.boundRightClickHandler = this.rightClick.bind(this);

  //   const leftButton = document.getElementById("left-button");
  //   const rightButton = document.getElementById("right-button")
  //   leftButton.addEventListener("mousedown", this.boundLeftClickHandler);
  //   rightButton.addEventListener("mousedown", this.boundRightClickHandler);
  // }

  // leftClick(e) {
  //   if (!this.playing) {
  //     this.play();
  //   }
  //   this.dir = -1;

  //   console.log("left")

  //   // this.update();
  // }

  // rightClick(e) {
  //   if (!this.playing) {
  //     this.play();
  //   }
  //   this.dir = 1;

  //   console.log("right")

  //   // this.update();
  // }
  
  animate(dir) {
    this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
    this.sofa.drawSofa(this.ctx);
    this.table.drawTable(this.ctx);
    this.cat.animate(this.ctx, dir);
  }

  
}

module.exports = Game;
