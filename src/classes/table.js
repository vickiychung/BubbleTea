const CONSTANTS = {
  TABLE_WIDTH: 180,
  TABLE_HEIGHT: 200
};

const tableImg = new Image();
tableImg.src = './dist/assets/images/table.png';

class Table {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = 10;
    this.y = this.dimensions.height / 6;
  }

  drawTable(ctx) {
    ctx.fillStyle = "beige";
    ctx.fillRect(this.x, this.y, CONSTANTS.TABLE_WIDTH, CONSTANTS.TABLE_HEIGHT);
    ctx.drawImage(tableImg, this.x, this.y, CONSTANTS.TABLE_WIDTH, CONSTANTS.TABLE_HEIGHT);
  }
}

module.exports = Table;
