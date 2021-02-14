import React from "react";
import Phaser from "phaser";
import World from "../phaser/world"
import PlayGame from "../phaser/scene";

export const config = {
	type: Phaser.AUTO,
	parent: "phaser",
	width: 1024,
	height: 768,
	scene: [
		new World({ key: 'world'}),
		new PlayGame({ key: 'play'})
	],
	// scene: PlayGame,
	// loader: { baseURL:}
	callbacks: {
    postBoot: function (play) {
      // Don't use this anywhere else ;)
      // Check that your keys are correct.
      // 'boot' should be loading (active), 'game' and 'hud' should be init (inactive)
      play.scene.dump();
		}
	}
};

const game = new Phaser.Game(config);

console.log(game)

export default function App(props) {	
	return <div>{game.canvas}</div>
}