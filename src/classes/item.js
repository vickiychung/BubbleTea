const CONSTANTS = {
  ITEM_WIDTH: 20,
  ITEM_HEIGHT: 20
};

// img attribution
// <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
const itemImg = new Image();
itemImg.src = './dist/assets/images/item.png';

class Item {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = (this.dimensions.width / 2) * Math.random();
    this.y = this.dimensions.height - 25;
    this.img = itemImg;
  }

  drawItem(ctx) {
    ctx.fillStyle = "transparent";
    ctx.fillRect(this.x, this.y, CONSTANTS.ITEM_WIDTH, CONSTANTS.ITEM_HEIGHT);
    ctx.drawImage(this.img, this.x, this.y, CONSTANTS.ITEM_WIDTH, CONSTANTS.ITEM_HEIGHT);
  }
}

module.exports = Item;
