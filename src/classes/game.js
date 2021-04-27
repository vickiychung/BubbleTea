const Cat = require("./cat");
const Sofa = require("./sofa");

class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.restart();
  }

  restart() {
    this.cat = new Cat(this.dimensions);
    this.sofa = new Sofa(this.dimensions);
    this.animate();
  }

  animate() {
    this.sofa.drawSofa(this.ctx);
    this.cat.animate(this.ctx);
  }
}

module.exports = Game;
