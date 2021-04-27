// const GameView = require('./classes/game_view');
const Game = require('./classes/game');
// const Cat = require("./classes/cat");

document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById("game-canvas");
  // let context = canvas.getContext("2d");

  // window.context = context;

  new Game(canvas);
  // const gameView = new GameView(context, game);
  // gameView.start();
  
  // window.gameView = gameView;
});

console.log("Webpack is working!")