const CONSTANTS = {
  SOFA_WIDTH: 50,
  SOFA_HEIGHT: 130
};

class Sofa {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = this.dimensions.width - CONSTANTS.SOFA_WIDTH;
    this.y = this.dimensions.height - CONSTANTS.SOFA_HEIGHT;
  }

  drawSofa(ctx) {
    ctx.fillStyle = "#484848";
    ctx.fillRect(this.x, this.y, CONSTANTS.SOFA_WIDTH, CONSTANTS.SOFA_HEIGHT);
  }
}

module.exports = Sofa;
