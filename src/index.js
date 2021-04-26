const Cat = require("./classes/cat");
window.Cat = Cat;

document.addEventListener("DOMContentLoaded", () => {
  
  let canvas = document.getElementById("game-canvas");
  let context = canvas.getContext("2d");
  window.context = context;
});

console.log("Webpack is working!")