const cat = require('../assets/images/cat.png');

class Cat {
  constructor(ctx, pos) {
    this.cat = new Image();
    this.cat.src = cat;

    this.ctx = ctx;
    this.pos = pos;
  }

  drawCat(x, y) {
    this.ctx.drawImage(this.cat, x, y, 140, 250);
  }

  move(dir) {
    if (dir === 1) {
      this.drawCat(pos[0] + 1, pos[1]);
    } else {
      this.drawCat(pos[0] - 1, pos[1]);
    }
  }
}

module.exports = Cat;
