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

  const gameInstruct = document.getElementById("instruction");
  const playingText = document.getElementById("playing-text");
  const gameoverText = document.getElementById("gameover-text");

  leftButton.addEventListener("mousedown", e => {
    dirCat = -0.3;
    pauseCat = !pauseCat;
  });

  rightButton.addEventListener("mousedown", e => {
    dirCat = 0.3;
    pauseCat = !pauseCat;
  });

  pauseButton.addEventListener("mousedown", e => {
    pauseGame = !pauseGame;

    if (!pauseGame) {
      gameInstruct.classList.add("hidden");
      gameoverText.classList.add("hidden");
      playingText.classList.remove("hidden");
    } else {
      playingText.classList.add("hidden");
      gameoverText.classList.add("hidden");
      gameInstruct.classList.remove("hidden");
    }

    loop();
  })

  restartButton.addEventListener("mousedown", e => {
    gameoverText.classList.add("hidden");
    playingText.classList.add("hidden");
    gameInstruct.classList.remove("hidden");

    dirCat = 0;
    pauseCat = true;
    pauseGame = true;
    game = new Game(canvas);
  });

  function timestamp() {
    return new Date().getTime();
  }

  let now, dt, last = timestamp();

  function loop() {
    if (pauseCat) {
      dirCat = 0;
    }

    if (pauseGame) {
      return cancelAnimationFrame(loop);
    }

    // if (game.lost()) {
    //   game.angry();
      
    //   gameInstruct.classList.add("hidden");
    //   playingText.classList.add("hidden");
    //   gameoverText.classList.remove("hidden");

    //   return cancelAnimationFrame(loop);
    // }

    now = timestamp();
    dt = dt + Math.min(1, (now - last) / 1000);
    dt = (now - last) / 1000;

    game.animate(dirCat, pauseCat, dt);

    last = now;

    requestAnimationFrame(loop);
  }

  window.game = game
  window.game.fetchedIdx = game.fetchedIdx
});

console.log("Webpack is working!")