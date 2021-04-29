const CONSTANTS = {
  CAT_WIDTH: 30,
  CAT_HEIGHT: 25
};

const catImg = new Image();
catImg.src = './dist/assets/images/cat.png';

const happyCatImg = new Image();
happyCatImg.src = './dist/assets/images/happyCat.png';

class Cat {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = this.dimensions.width / 2;
    this.y = this.dimensions.height - 40;
    this.img = catImg;
  }

  animate(ctx, dir) {
    this.moveCat(dir);
    this.drawCat(ctx);
  }

  drawCat(ctx) {
    ctx.fillStyle = "transparent";
    ctx.fillRect(this.x, this.y, CONSTANTS.CAT_WIDTH, CONSTANTS.CAT_HEIGHT);
    ctx.drawImage(this.img, this.x, this.y, CONSTANTS.CAT_WIDTH, CONSTANTS.CAT_HEIGHT);
  }

  moveCat(dir) {
    this.x += dir;
  }

  changeImg(ctx) {
    this.img = happyCatImg;
    this.drawCat(ctx);
  }
}

module.exports = Cat;
