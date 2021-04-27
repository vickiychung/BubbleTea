const Game = require('./classes/game');

document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById("game-canvas");

  new Game(canvas);
});

console.log("Webpack is working!")