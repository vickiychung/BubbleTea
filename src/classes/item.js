const CONSTANTS = {
  ITEM_WIDTH: 60,
  ITEM_HEIGHT: 60
};

// img attribution
// <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
const itemImg = new Image();
itemImg.src = './dist/assets/images/item.png';

class Item {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = (this.dimensions.width / 2 - 10) * Math.random();
    this.y = this.dimensions.height - 120;
    this.img = itemImg;
  }

  animate(ctx, dir) {
    this.moveItem(dir);
    this.drawItem(ctx);
  }

  drawItem(ctx) {
    ctx.fillStyle = "transparent";
    ctx.fillRect(this.x, this.y, CONSTANTS.ITEM_WIDTH, CONSTANTS.ITEM_HEIGHT);
    ctx.drawImage(this.img, this.x, this.y, CONSTANTS.ITEM_WIDTH, CONSTANTS.ITEM_HEIGHT);
  }

  moveItem(dir) {
    this.x += dir;
  }
}

module.exports = Item;
