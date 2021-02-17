import React from "react";
import Phaser from "phaser";
import World from "../scene/world"
// import Katamari from "../scene/katamari";
import "../index.css";
import kball from '../assets/sprites/kball.png'
// import zero2 from '../assets/characters/zero2.gif'
import opensea from '../assets/icons/opensea_icon.png'
import ethereum from '../assets/icons/eth_icon.svg'
import dai from '../assets/icons/dai_icon.svg'

// Game settings
export const config = {
	type: Phaser.AUTO,
	parent: "phaser",
	width: window.innerWidth,
	height: window.innerHeight,
	scale: { 
		mode: Phaser.Scale.FIT , 
		autoCenter: Phaser.Scale.CENTER_BOTH },
	scene: [ World ],
	physics: { default: 'arcade', arcade:{debug:true}}
};

// Create the game instance
const game = new Phaser.Game(config);

// console.log(game)

export default function App(props) {	



	console.log(`props`, props)
	let pool = props.poolTotal

	return (
		<div className='universe katamari'>
				<img src={kball} className='rotate' id='poolHUD'></img>
				{/* <img src={zero2} id='zero2'></img> */}
			<main className='world'>{game.canvas}</main>
		</div>
	)
}