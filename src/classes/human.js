const CONSTANTS = {
  HUMAN_WIDTH: 30,
  HUMAN_HEIGHT: 35
};

class Human {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = 10;
    this.y = 0 + dimensions.height / 2 + 20;
    this.color = "black";
  }

  animate(ctx, catPause, dt) {
    this.drawHuman(ctx);

    if (Math.floor(dt * 1000) === 25) {
      this.moveHuman(ctx, catPause);
    }
  }

  drawHuman(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, CONSTANTS.HUMAN_WIDTH, CONSTANTS.HUMAN_HEIGHT);
  }

  moveHuman(ctx, catPause) {
    if (!catPause) {
      this.color = "pink";
      ctx.fillRect(this.x, this.y, CONSTANTS.HUMAN_WIDTH, CONSTANTS.HUMAN_HEIGHT);

      alert("lose");
    }
  }
}

module.exports = Human;
