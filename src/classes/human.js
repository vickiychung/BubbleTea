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

  animate(ctx, dt) {
    this.drawHuman(ctx);

    console.log(dt*1000);
    
    let last;

    const min = 20, max = 50;
    let rand = Math.floor(Math.random() * (max - min + 1) + min);
    if (dt * 1000 >= 20 && dt * 1000 <= 50) {
      this.moveHuman(ctx);
    }

    last = dt;
  }

  drawHuman(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, CONSTANTS.HUMAN_WIDTH, CONSTANTS.HUMAN_HEIGHT);
  }

  moveHuman(ctx) {
    const colors = ["black", "pink"];
    let rand = Math.floor(Math.random() * 2);
    let randColor = colors[rand];

    ctx.fillStyle = randColor;
    ctx.fillRect(this.x, this.y, CONSTANTS.HUMAN_WIDTH, CONSTANTS.HUMAN_HEIGHT);
  }

  // randomTurn(ctx) {
  //   const min = 3, max = 5;
  //   let rand = Math.floor(Math.random() * (max - min + 1) + min);
  //   window.setTimeout(this.moveHuman(ctx), rand * 1000000000000000);
  // }
}

module.exports = Human;
