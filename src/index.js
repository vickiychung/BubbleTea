const Game = require('./classes/game');

document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById("game-canvas");

  const game = new Game(canvas);
  let dir = 0, pause = false;
  loop();

  const leftButton = document.getElementById("left-button");
  const rightButton = document.getElementById("right-button");
  const pauseButton = document.getElementById("pause-button");

  leftButton.addEventListener("mousedown", e => {
    dir = -1;
  });

  rightButton.addEventListener("mousedown", e => {
    dir = 1;
  })

  pauseButton.addEventListener("mousedown", e => {
    pause = !pause;
    loop();
  })

  function loop() {
    if (pause) {
      return cancelAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
    game.animate(dir);
  } 

});

console.log("Webpack is working!")