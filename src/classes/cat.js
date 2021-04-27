// const cat = require('../assets/images/cat.png');
const CONSTANTS = {
  CAT_WIDTH: 40,
  CAT_HEIGHT: 30
};

class Cat {
  // constructor(ctx, pos) {
  //   this.cat = new Image();
  //   this.cat.src = cat;

  //   this.ctx = ctx;
  //   this.pos = pos;
  // }
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = this.dimensions.width / 3;
    this.y = this.dimensions.height / 2;
  }

  animate(ctx) {
    this.drawCat(ctx);
  }

  // drawCat(x, y) {
  //   this.ctx.drawImage(this.cat, x, y, 140, 250);
  // }
  drawCat(ctx){
    ctx.fillStyle = "orange";
    ctx.fillRect(this.x, this.y, CONSTANTS.CAT_WIDTH, CONSTANTS.CAT_HEIGHT);
    console.log("draw cat");
  }

  // move(dir) {
  //   if (dir === 1) {
  //     this.drawCat(pos[0] + 1, pos[1]);
  //   } else {
  //     this.drawCat(pos[0] - 1, pos[1]);
  //   }
  // }
}

module.exports = Cat;
