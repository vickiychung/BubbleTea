const Game = require('./classes/game');

document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById("game-canvas");

  const game = new Game(canvas);
  let dirCat = 0, pause = true;
  // loop();
  requestAnimationFrame(loop);
  // randomTurn();

  const leftButton = document.getElementById("left-button");
  const rightButton = document.getElementById("right-button");
  // const playButton = document.getElementById("play-button");

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

  // playButton.addEventListener("mousedown", e => {
  //   pause = false;
  //   loop();
  // })

  // function randomTurn() {
  //    console.log(turnHuman);

  //   const min = 3, max = 5;
  //   let rand = Math.floor(Math.random() * (max - min + 1) + min);
  //   turnHuman = !turnHuman;
  //   window.setTimeout(randomTurn(), rand * 1000);
  // }

  function timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
  }

  // let now, dt = 0, last = timestamp(), step = 1/60;
  let now, dt, last = timestamp();

  function loop() {
    if (pause) {
      return cancelAnimationFrame(loop);
    }

    now = timestamp();
    // dt = dt + Math.min(1, (now - last) / 1000);
    // while (dt > step) {
    //   dt = dt - step;
    // }

    dt = (now - last) / 1000;

    game.animate(dirCat, dt);

    last = now;

    requestAnimationFrame(loop);
  } 

});

console.log("Webpack is working!")