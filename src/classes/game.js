const Cat = require("./cat");
const Human = require("./human");
const angryHuman = require('./angryHuman');
const Sofa = require("./sofa");
const Table = require("./table");
const Item = require("./item");

class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };

    this.itemsNum = 3;
    this.items = [];
    this.stashedItems = [];

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
      if (Math.floor(this.items[i]["x"]) === Math.floor(this.cat.x)) {
        this.fetchItem(i);
      }
    }
  }

  fetchItem(itemIdx) {
    this.items[itemIdx]["x"] = this.cat.x;
    this.fetchedIdx = itemIdx;
  }

  stashItem() {
    if (this.fetchedIdx === undefined) return null;

    // if (Math.floor(this.items[this.fetchedIdx]["x"]) === Math.floor(this.sofa.x)) {
    //   console.log("if")
    //   this.stashedItems.push(this.items[this.fetchedIdx]);
    //   this.stashedItems = [...new Set(this.stashedItems)];

    //   this.items.splice(this.fetchedIdx, 1);
    //   this.fetchedIdx = null;
    // }
    console.log(Math.floor(this.cat.x) === Math.floor(this.sofa.x));
     if (Math.floor(this.cat.x) === Math.floor(this.sofa.x)) {
      console.log("if")
      this.stashedItems.push(this.items[this.fetchedIdx]);
      this.stashedItems = [...new Set(this.stashedItems)];

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
    return (!this.pauseCat && this.human.status === "checking");
  }

  angry() {
    this.human = new angryHuman(this.dimensions);
    this.human.drawHuman(this.ctx);
  }

  restart() {
    this.cat = new Cat(this.dimensions);
    this.human = new Human(this.dimensions);
    this.sofa = new Sofa(this.dimensions);
    this.table = new Table(this.dimensions);
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

    this.stealItem();
    // this.stashItem();

    if (this.fetchedIdx) {
      this.stashItem();
    }
  }
}

module.exports = Game;
