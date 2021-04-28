const CONSTANTS = {
  HUMAN_WIDTH: 30,
  HUMAN_HEIGHT: 35
};

class Human {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = 10;
    this.y = dimensions.height / 2 - 10;
    this.color = "black";
  }

  animate(ctx, dt) {
    this.drawHuman(ctx);

    if (Math.floor(dt * 1000) === 25) {
      this.moveHuman();
    }
  }

  drawHuman(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, CONSTANTS.HUMAN_WIDTH, CONSTANTS.HUMAN_HEIGHT);
  }

  moveHuman() {
    this.color = "pink";
  }
}

module.exports = Human;
