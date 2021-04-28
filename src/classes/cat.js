const CONSTANTS = {
  CAT_WIDTH: 40,
  CAT_HEIGHT: 30
};

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
  }

  moveCat(dir) {
    this.x += dir;
  }

}

module.exports = Cat;
