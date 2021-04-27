const Cat = require("./cat");
const Sofa = require("./sofa");
const Table = require("./table");

class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.registerEvents();
    this.restart();
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
    this.dir = -1;
    console.log(this.dir);
  }

  rightClick(e) {
    this.dir = 1
    console.log(this.dir);
  }
  
  animate() {
    this.sofa.drawSofa(this.ctx);
    this.table.drawTable(this.ctx);
    this.cat.animate(this.ctx, this.dir);
  }
}

module.exports = Game;
