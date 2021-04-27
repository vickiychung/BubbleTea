const CONSTANTS = {
  HUMAN_WIDTH: 30,
  HUMAN_HEIGHT: 35
};

class Human {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = 10;
    this.y = 0 + dimensions.height / 2 + 20;
  }

  animate(ctx, dir) {
    this.drawHuman(ctx);
  }

  drawHuman(ctx) {
    ctx.fillStyle = "pink";
    ctx.fillRect(this.x, this.y, CONSTANTS.HUMAN_WIDTH, CONSTANTS.HUMAN_HEIGHT);
  }
}

module.exports = Human;
