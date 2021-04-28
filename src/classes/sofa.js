const CONSTANTS = {
  SOFA_WIDTH: 80,
  SOFA_HEIGHT: 100
};

const sofaImg = new Image();
sofaImg.src = './dist/assets/images/sofa.png'

// img attribution
// Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>

class Sofa {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = this.dimensions.width - CONSTANTS.SOFA_WIDTH - 3;
    this.y = this.dimensions.height - CONSTANTS.SOFA_HEIGHT - 5;
  }

  drawSofa(ctx) {
    ctx.fillStyle = "beige";
    ctx.fillRect(this.x, this.y, CONSTANTS.SOFA_WIDTH, CONSTANTS.SOFA_HEIGHT);
    ctx.drawImage(sofaImg, this.x, this.y, CONSTANTS.SOFA_WIDTH, CONSTANTS.SOFA_HEIGHT);
  }
}

module.exports = Sofa;
