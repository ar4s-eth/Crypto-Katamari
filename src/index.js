import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
// import playGame from "./phaser/scene";
import PlayGame from "./phaser/scene";

// const obj = PlayGame.new(robot) 

//console.log(App);
// OG Code
export const config = {
  type: Phaser.AUTO,
  parent: "phaser",
  width: 1024,
  height: 768,
  scene: PlayGame
};

// export const config = {
//   type: Phaser.CANVAS,
//   parent: "phaser",
//   width: 800,
//   height: 600,
//   scene: PlayGame
// };

const game = new Phaser.Game(config);
// game.create()
ReactDOM.render(
  <App 
  katamari={game}
  />,
  document.getElementById("root") || document.createElement("div")
);

