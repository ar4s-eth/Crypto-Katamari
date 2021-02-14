import React from "react";
import Phaser from "phaser";
import World from "../scene/world"
import Katamari from "../scene/katamari";

export const config = {
	type: Phaser.AUTO,
	parent: "phaser",
	width: 1024,
	height: 768,
	scene: [ World ]
};

const game = new Phaser.Game(config);

// console.log(game)

export default function App(props) {	
	return <div>{game.canvas}</div>
}