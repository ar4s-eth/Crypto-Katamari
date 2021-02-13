import React from "react";
import PlayGame from "../phaser/scene";

export const config = {
	type: Phaser.AUTO,
	parent: "phaser",
	width: 1024,
	height: 768,
	scene: PlayGame,
	// loader: { baseURL:}
};

const game = new Phaser.Game(config)

console.log(game)

export default function App(props) {	
	return <div>{game.canvas}</div>
}