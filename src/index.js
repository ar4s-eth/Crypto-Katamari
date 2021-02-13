import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
// import playGame from "./phaser/scene";
import PlayGame from "./phaser/scene";

// const obj = PlayGame.new(robot) 

//console.log(App);

// Test code 

// const config = {
//   loader: {
//           baseURL: 'game/media'
//       },
//   scene: [preloadScene, playGame]
//   }

export const config = {
  type: Phaser.AUTO,
  parent: "phaser",
  width: 1024,
  height: 768,
  scene: PlayGame,
  // loader: { baseURL:}
};

const game = new Phaser.Game(config);

ReactDOM.render(
  <App 
  katamari={game}
  />,
  document.getElementById("root") || document.createElement("div")
);

