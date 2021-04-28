const CONSTANTS = {
  TABLE_WIDTH: 50,
  TABLE_HEIGHT: 50
};

const tableImg = new Image();
tableImg.src = './dist/assets/images/table.png';
// img attribution
// <div>Icons made by <a href="" title="monkik">monkik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

class Table {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = 0;
    this.y = this.dimensions.height / 6;
  }

  drawTable(ctx) {
    ctx.fillStyle = "beige";
    ctx.fillRect(this.x, this.y, CONSTANTS.TABLE_WIDTH, CONSTANTS.TABLE_HEIGHT);
    ctx.drawImage(tableImg, this.x, this.y, CONSTANTS.TABLE_WIDTH, CONSTANTS.TABLE_HEIGHT);
  }
}

module.exports = Table;
