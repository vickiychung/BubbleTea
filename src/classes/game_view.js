const Game = require('./game');

class GameView {
  constructor(ctx, game) {
    this.ctx = ctx;
    this.game = game;
  }

  start() {
    this.game.draw(this.ctx);
  }
}

module.exports = GameView;
