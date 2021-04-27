const Cat = require("./cat");
const Sofa = require("./sofa");
const Table = require("./table");

class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };

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
  
  animate(dir) {
    this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
    this.sofa.drawSofa(this.ctx);
    this.table.drawTable(this.ctx);
    this.cat.animate(this.ctx, dir);
  }

  
}

module.exports = Game;
