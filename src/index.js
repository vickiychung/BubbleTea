const Game = require('./classes/game');

document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById("game-canvas");
  let game = new Game(canvas);
  let dirCat = 0, pauseCat = true, pauseGame = true;

  requestAnimationFrame(loop);

  const leftButton = document.getElementById("left-button");
  const rightButton = document.getElementById("right-button");
  const pauseButton = document.getElementById("pause-button");
  const restartButton = document.getElementById("restart-button");

  leftButton.addEventListener("mousedown", e => {
    dirCat = -0.3;
    pauseCat = !pauseCat;
    // loop();
  });

  rightButton.addEventListener("mousedown", e => {
    dirCat = 0.3;
    pauseCat = !pauseCat;
    // loop();
  });

  pauseButton.addEventListener("mousedown", e => {
    pauseGame = !pauseGame;
    loop();
  })

  restartButton.addEventListener("mousedown", e => {
    dirCat = 0;
    pauseCat = true;
    game = new Game(canvas);
    loop();
  });

  function timestamp() {
    return new Date().getTime();
  }

  let now, dt, last = timestamp();

  function loop() {
    if (pauseCat) {
      // return cancelAnimationFrame(loop);
      dirCat = 0;
    }

    if (pauseGame) {
      return cancelAnimationFrame(loop);
    }

    if (game.lost()) {
      game.angry();
      // alert("lost")
      return cancelAnimationFrame(loop);
    }

    now = timestamp();
    dt = dt + Math.min(1, (now - last) / 1000);
    dt = (now - last) / 1000;

    game.animate(dirCat, pauseCat, dt);

    last = now;

    requestAnimationFrame(loop);
  }

});

console.log("Webpack is working!")