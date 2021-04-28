const Game = require('./classes/game');

document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById("game-canvas");
  let game = new Game(canvas);

  let dirCat = 0, pause = true;

  requestAnimationFrame(loop);

  const leftButton = document.getElementById("left-button");
  const rightButton = document.getElementById("right-button");

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

  function timestamp() {
    return new Date().getTime();
  }

  let now, dt, last = timestamp();

  function loop() {
    if (pause) {
      return cancelAnimationFrame(loop);
    }

    now = timestamp();
    dt = dt + Math.min(1, (now - last) / 1000);
    dt = (now - last) / 1000;
    game.animate(dirCat, pause, dt);

    last = now;

    requestAnimationFrame(loop);

    if (game.lost()) {
      alert("Game over!\n\nRestart?");
      // cancelAnimationFrame(loop);
      // game.restart();
      dirCat = 0;
      pause = true;
      game = new Game(canvas);
      loop();
      // game.animate(dirCat, pause, dt);
      // requestAnimationFrame(loop);
    }
  } 

});

console.log("Webpack is working!")