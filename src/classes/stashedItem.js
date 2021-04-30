const CONSTANTS = {
  ITEM_WIDTH: 60,
  ITEM_HEIGHT: 60
};

const itemImg = new Image();
itemImg.src = './dist/assets/images/item.png';

class stashedItem {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = this.getRandInt(this.dimensions.width - 20, this.dimensions.width - 300);
    this.y = this.dimensions.height - 120;
    this.img = itemImg;
  }

  getRandInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  drawItem(ctx) {
    ctx.fillStyle = "transparent";
    ctx.fillRect(this.x, this.y, CONSTANTS.ITEM_WIDTH, CONSTANTS.ITEM_HEIGHT);
    ctx.drawImage(this.img, this.x, this.y, CONSTANTS.ITEM_WIDTH, CONSTANTS.ITEM_HEIGHT);
  }
}

module.exports = stashedItem;
