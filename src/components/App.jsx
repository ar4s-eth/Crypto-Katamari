import React, { useState } from "react";

// Game imports
import Phaser from "phaser";
import World from "../scene/world"

import "../index.css";

// Graphics
import kball from '../assets/sprites/kball.png'
import opensea from '../assets/icons/opensea_icon.png'
import ethereum from '../assets/icons/eth_icon.svg'
import dai from '../assets/icons/dai_icon.svg'
// import PoolHUD from './PoolHUD.jsx'

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

	// const [ state, setState ] = useState('loaded')

	console.log(`App props`, props)

	return (
		<div className='universe katamari'>
			
				<img src={kball} className='rotate' id='poolHUD'></img>

					<h5 className='universe' id='pool_amount'>

      			<div className='eth'>{props.price}<img className='symbol' src={ethereum} alt='ETH'></img></div>

      			<div className='dai'>5000.35<img className='symbol' src={dai} alt='Dai'></img></div>

      			<div className='nft'>123<img className='symbol' src={opensea} alt='OpenSea'></img></div>

    			</h5>
			<main className='world'>{game.canvas}</main>

			{/* <PoolHUD
			state={state}
			/> */}
		</div>
	)
}