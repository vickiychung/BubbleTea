const CONSTANTS = {
  HUMAN_WIDTH: 30,
  HUMAN_HEIGHT: 35
};

const humanImg = new Image();
humanImg.src = './assets/images/human.png';

const checkingHumanImg = new Image();
checkingHumanImg.src = './assets/images/checkingHuman.png';
// img attribution
// <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

class Human {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = 10;
    this.y = dimensions.height / 2 - 10;
    this.img = humanImg;
    this.status = "working";
  }

  animate(ctx, dt) {
    this.drawHuman(ctx);
    if (Math.floor(dt * 1000) === 23) {
      this.moveHuman();
    } 
  }

  drawHuman(ctx) {
    ctx.fillStyle = "transparent";
    ctx.fillRect(this.x, this.y, CONSTANTS.HUMAN_WIDTH, CONSTANTS.HUMAN_HEIGHT);
    ctx.drawImage(this.img, this.x, this.y, CONSTANTS.HUMAN_WIDTH, CONSTANTS.HUMAN_HEIGHT);
  }

  moveHuman() {
    this.img = (this.img === checkingHumanImg) ? humanImg : checkingHumanImg;
    this.status = (this.status === "checking") ? "working" : "checking";
  }
}

module.exports = Human;
