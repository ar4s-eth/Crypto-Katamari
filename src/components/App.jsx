import React from "react";
import Phaser from "phaser";
import World from "../scene/world"
import Katamari from "../scene/katamari";
// import "../index.scss";

export const config = {
	type: Phaser.AUTO,
	parent: "phaser",
	width: window.innerWidth,
	height: window.innerHeight,
	scale: { 
		mode: Phaser.Scale.FIT , 
		autoCenter: Phaser.Scale.CENTER_BOTH },
	scene: [ World ]
};

// Create the game instance

const game = new Phaser.Game(config);

// console.log(game)

export default function App(props) {	
	return <main className='world'>{game.canvas}</main>
}