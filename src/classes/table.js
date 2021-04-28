const CONSTANTS = {
  TABLE_WIDTH: 50,
  TABLE_HEIGHT: 50
};

class Table {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = 0;
    this.y = this.dimensions.height / 6;
  }

  drawTable(ctx) {
    ctx.fillStyle = "brown";
    ctx.fillRect(this.x, this.y, CONSTANTS.TABLE_WIDTH, CONSTANTS.TABLE_HEIGHT);
  }
}

module.exports = Table;
