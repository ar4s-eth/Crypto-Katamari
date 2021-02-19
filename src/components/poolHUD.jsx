import React, { useState } from "react";

// Graphics
import "../stylesheets/poolHUD.css";
import "../stylesheets/index.css";
import kball from '../assets/sprites/kball.png'
import opensea from '../assets/icons/opensea_icon.png'
import ethereum from '../assets/icons/eth_icon.svg'
import dai from '../assets/icons/dai_icon.svg'


export default function PoolHUD(props) {	
  const [ score, setScore ] = useState(0)

	let increment = (x) => {
		setScore(x + 1)
	}

  return (
		<div className='katamari'>
				<img src={kball} className='rotate' id='poolHUD'></img>

					<h5 className='universe' id='pool_amount'>

      			<div className='eth'>{props.eth}<img className='symbol' src={ethereum} alt='ETH'></img></div>

      			<div className='dai'>{props.dai}<img className='symbol' src={dai} alt='Dai'></img></div>

      			<div className='nft'>{props.nft}<img className='symbol' src={opensea} alt='OpenSea'></img></div>

    			</h5>
		</div>
	)
}