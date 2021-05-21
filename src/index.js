const Game = require('./classes/game');

document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById("game-canvas");
  let game = new Game(canvas);
  let dirCat = 0, pauseCat = true, pauseGame = true;

  requestAnimationFrame(loop);

  const musicControls = document.getElementById("music-controls");
  const musicPlay = document.getElementById("music-play");
  const musicPause = document.getElementById("music-pause");
  const music = document.getElementById("music");

  const leftButton = document.getElementById("left-button");
  const rightButton = document.getElementById("right-button");
  const pauseButton = document.getElementById("pause-button");
  const restartButton = document.getElementById("restart-button");

  const gameInstruct = document.getElementById("instruction");
  const playingText = document.getElementById("playing-text");
  const gameoverText = document.getElementById("gameover-text");
  const wonText = document.getElementById("won-text");

  musicControls.addEventListener("click", e => {
    if (music.paused) {
      music.play();
      musicPlay.classList.add("hidden");
      musicPause.classList.remove("hidden");
    } else {
      music.pause();
      musicPause.classList.add("hidden");
      musicPlay.classList.remove("hidden");
    }
  })

  document.addEventListener("keydown", e => {
    if (e.defaultPrevented) return;
    e.preventDefault();

    switch(e.code) {
      case "ArrowLeft":
        dirCat = -1.3;
        pauseCat = !pauseCat;
        break;
      case "ArrowRight":
        dirCat = 1.3;
        pauseCat = !pauseCat;
        break;
      case "KeyR":
        gameoverText.classList.add("hidden");
        playingText.classList.add("hidden");
        wonText.classList.add("hidden");
        gameInstruct.classList.remove("hidden");

        dirCat = 0;
        pauseCat = true;
        pauseGame = true;
        game = new Game(canvas);
        break;
      case "Space":
        pauseGame = !pauseGame;

        if (!pauseGame) {
          gameInstruct.classList.add("hidden");
          gameoverText.classList.add("hidden");
          wonText.classList.add("hidden");
          playingText.classList.remove("hidden");
        } else {
          playingText.classList.add("hidden");
          gameoverText.classList.add("hidden");
          wonText.classList.add("hidden");
          gameInstruct.classList.remove("hidden");
        }
        
        loop();
        break;
    }
  })

  leftButton.addEventListener("mousedown", e => {
    dirCat = -1.3;
    pauseCat = !pauseCat;
  });

  rightButton.addEventListener("mousedown", e => {
    dirCat = 1.3;
    pauseCat = !pauseCat;
  });

  pauseButton.addEventListener("mousedown", e => {
    pauseGame = !pauseGame;

    if (!pauseGame) {
      gameInstruct.classList.add("hidden");
      gameoverText.classList.add("hidden");
      wonText.classList.add("hidden");
      playingText.classList.remove("hidden");
    } else {
      playingText.classList.add("hidden");
      gameoverText.classList.add("hidden");
      wonText.classList.add("hidden");
      gameInstruct.classList.remove("hidden");
    }

    loop();
  })

  restartButton.addEventListener("mousedown", e => {
    gameoverText.classList.add("hidden");
    playingText.classList.add("hidden");
    wonText.classList.add("hidden");
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

    if (game.lost()) {
      game.angry();
      
      gameInstruct.classList.add("hidden");
      playingText.classList.add("hidden");
      wonText.classList.add("hidden");
      gameoverText.classList.remove("hidden");

      return cancelAnimationFrame(loop);
    }

    if (game.gameWon) {
      gameInstruct.classList.add("hidden");
      playingText.classList.add("hidden");
      gameoverText.classList.add("hidden");
      wonText.classList.remove("hidden");

      return cancelAnimationFrame(loop);
    }

    now = timestamp();
    dt = (now - last) / 1000;

    game.animate(dirCat, pauseCat, dt);

    last = now;

    requestAnimationFrame(loop);
  }
});
