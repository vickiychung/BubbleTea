const Cat = require("./cat");
const Human = require("./human");
const angryHuman = require('./angryHuman');
const Sofa = require("./sofa");
const Table = require("./table");
const Item = require("./item");
const stashedItem = require("./stashedItem");

class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };

    this.itemsNum = 3;
    this.items = [];
    this.stashedItems = [];
    this.stashedItemsPile = [];

    this.addItems();
    this.play(0);
  }

  addItems() {
    for (let i = 0; i < this.itemsNum; i++) {
      this.items.push(new Item(this.dimensions));
    }
  }

  stealItem() {
    for (let i = 0; i < this.items.length; i++) {
      if (Math.floor(this.cat.x) - Math.floor(this.items[i]["x"]) >= 1 &&
        Math.floor(this.cat.x) - Math.floor(this.items[i]["x"]) <= 1.5) {
          this.fetchItem(i);
      }
    }
  }

  fetchItem(itemIdx) {
    this.items[itemIdx]["x"] = this.cat.x;
    this.fetchedIdx = itemIdx;
  }

  stashItem() {
    if (!Number.isInteger(this.fetchedIdx)) return null;

    if (Math.floor(this.cat.x) === Math.floor(this.sofa.x)) {
      this.stashedItems.push(this.items[this.fetchedIdx]);
      this.stashedItems = [...new Set(this.stashedItems)];
      this.stashedItemsPile.push(new stashedItem(this.dimensions));

      this.items.splice(this.fetchedIdx, 1);
      this.fetchedIdx = null;
    }
  }

  play(dirCat) {
    this.cat = new Cat(this.dimensions);
    this.human = new Human(this.dimensions);
    this.sofa = new Sofa(this.dimensions);
    this.table = new Table(this.dimensions);
    this.animate(dirCat);
  }

  lost() {
    return (
      !this.pauseCat && 
      Number.isInteger(this.fetchedIdx) && 
      this.human.status === "checking"
    );
  }

  won() {
    if (this.items.length === 0 && this.stashedItems.length === this.itemsNum) {
      this.gameWon = true;
    }
  }

  happyCat() {
    if (this.gameWon) {
      this.cat.changeImg(this.ctx);
    }
  }

  angry() {
    this.human = new angryHuman(this.dimensions);
    this.human.drawHuman(this.ctx);[]
  }

  animate(dirCat, pauseCat, dt) {
    this.pauseCat = pauseCat;

    this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
    this.sofa.drawSofa(this.ctx);
    this.table.drawTable(this.ctx);
    this.cat.animate(this.ctx, dirCat);
    this.human.animate(this.ctx, dt);

    for (let i = 0; i < this.items.length; i++) {
      if (i === this.fetchedIdx) {
        this.items[i].animate(this.ctx, dirCat);
      } else {
        this.items[i].drawItem(this.ctx);
      }
    }

    for (let i = 0; i < this.stashedItemsPile.length; i++) {
      this.stashedItemsPile[i].drawItem(this.ctx);
    }

    this.won();
    this.happyCat();
    this.stealItem();
    this.stashItem();
  }
}

module.exports = Game;
