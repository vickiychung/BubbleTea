const Cat = require("./cat");

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
