class Item {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = (this.dimensions.width / 2) * Math.random();
    this.y = this.dimensions.height - 20;
  }

  drawItem(ctx) {
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(
      this.x, this.y, 5, 0, 2 * Math.PI
    );
    ctx.fill();
  }
}

module.exports = Item;
