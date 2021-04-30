const CONSTANTS = {
  HUMAN_WIDTH: 110,
  HUMAN_HEIGHT: 130
};

const angryHumanImg = new Image();
angryHumanImg.src = './dist/assets/images/angryHuman.png';
// img attribution
// <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

class angryHuman {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = 40;
    this.y = dimensions.height / 2 - 50;
    this.img = angryHumanImg;
    this.status = "angry";
  }

  drawHuman(ctx) {
    ctx.fillStyle = "transparent";
    ctx.fillRect(this.x, this.y, CONSTANTS.HUMAN_WIDTH, CONSTANTS.HUMAN_HEIGHT);
    ctx.drawImage(this.img, this.x, this.y, CONSTANTS.HUMAN_WIDTH, CONSTANTS.HUMAN_HEIGHT);
  }
}

module.exports = angryHuman;
