const CONSTANTS = {
  CAT_WIDTH: 40,
  CAT_HEIGHT: 30
};

class Cat {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = this.dimensions.width / 3;
    this.y = this.dimensions.height / 2;
  }

  animate(ctx) {
    this.drawCat(ctx);
  }

  drawCat(ctx){
    ctx.fillStyle = "orange";
    ctx.fillRect(this.x, this.y, CONSTANTS.CAT_WIDTH, CONSTANTS.CAT_HEIGHT);
  }
}

module.exports = Cat;
