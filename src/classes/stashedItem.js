const CONSTANTS = {
  ITEM_WIDTH: 60,
  ITEM_HEIGHT: 60
};

const itemImg = new Image();
itemImg.src = './dist/assets/images/item.png';

class stashedItem {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = (this.dimensions.width) * Math.random();
    this.y = this.dimensions.height - 120;
    this.img = itemImg;
  }

  drawItem(ctx) {
    ctx.fillStyle = "transparent";
    ctx.fillRect(this.x, this.y, CONSTANTS.ITEM_WIDTH, CONSTANTS.ITEM_HEIGHT);
    ctx.drawImage(this.img, this.x, this.y, CONSTANTS.ITEM_WIDTH, CONSTANTS.ITEM_HEIGHT);
  }
}

module.exports = stashedItem;
