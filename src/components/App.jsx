import React from "react";
import Phaser from "phaser";
import World from "../scene/world"
import Katamari from "../scene/katamari";

export const config = {
	type: Phaser.AUTO,
	parent: "phaser",
	width: 1920,
	height: 1080,
	scale: { 
		mode: Phaser.Scale.FIT , 
		autoCenter: Phaser.Scale.CENTER_BOTH },
	scene: [ World ]
};

// Create the game instance

const game = new Phaser.Game(config);

// console.log(game)

export default function App(props) {	
	return <div>{game.canvas}</div>
}