const Game = require('./classes/game');

document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById("game-canvas");
  let game = new Game(canvas);
  let dirCat = 0, pause = true;

  requestAnimationFrame(loop);

  const leftButton = document.getElementById("left-button");
  const rightButton = document.getElementById("right-button");
  const restartButton = document.getElementById("restart-button");

  leftButton.addEventListener("mousedown", e => {
    dirCat = -0.3;
    pause = !pause;
    loop();
  });

  rightButton.addEventListener("mousedown", e => {
    dirCat = 0.3;
    pause = !pause;
    loop();
  });

  restartButton.addEventListener("mousedown", e => {
     dirCat = 0;
    pause = true;
    game = new Game(canvas);
    loop();
  });

  function timestamp() {
    return new Date().getTime();
  }

  let now, dt, last = timestamp();

  function loop() {
    if (pause) {
      return cancelAnimationFrame(loop);
    }

    if (game.lost()) {
      game.angry();
      return cancelAnimationFrame(loop);
    }

    now = timestamp();
    dt = dt + Math.min(1, (now - last) / 1000);
    dt = (now - last) / 1000;

    game.animate(dirCat, pause, dt);

    last = now;

    requestAnimationFrame(loop);
  }

});

console.log("Webpack is working!")