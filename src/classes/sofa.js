const CONSTANTS = {
  SOFA_WIDTH: 300,
  SOFA_HEIGHT: 380
};

const sofaImg = new Image();
sofaImg.src = './dist/assets/images/sofa.png'

class Sofa {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = this.dimensions.width - CONSTANTS.SOFA_WIDTH - 20;
    this.y = this.dimensions.height - CONSTANTS.SOFA_HEIGHT - 10;
  }

  drawSofa(ctx) {
    ctx.fillStyle = "beige";
    ctx.fillRect(this.x, this.y, CONSTANTS.SOFA_WIDTH, CONSTANTS.SOFA_HEIGHT);
    ctx.drawImage(sofaImg, this.x, this.y, CONSTANTS.SOFA_WIDTH, CONSTANTS.SOFA_HEIGHT);
  }
}

module.exports = Sofa;
