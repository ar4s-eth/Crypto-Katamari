// Game imports
import Phaser from "phaser";
import World from "../scene/world"

// Game settings
export const config = {
	type: Phaser.AUTO,
	parent: "phaser",
	width: window.innerWidth,
	height: window.innerHeight,
	scale: { 
		mode: Phaser.Scale.FIT , 
		autoCenter: Phaser.Scale.CENTER_BOTH
  },
	scene: [ World ],
	physics: {
    default: 'arcade',
    arcade:{debug:true}
  }
};

// Create the game instance
const game = new Phaser.Game(config);

module.exports = { game };
