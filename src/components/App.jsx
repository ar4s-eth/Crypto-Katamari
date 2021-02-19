import  React, { useState, useEffect } from "react";
import Phaser from 'phaser'
import EventDispatcher from '../helpers/eventDispatcher.js'

// Data
import { poolData } from '../helpers/getPoolData.js'
import { weiToEthUsd } from '../helpers/convert.js'
import World, { nftEvent } from '../scene/world'
import game from './game.js'

// Components
import PoolHUD from './PoolHUD.jsx'
import PoolTab from './PoolTab.jsx'
import { Scene } from "phaser";


export default function App(props) {	  
  const [ dai, setDai ] = useState(null);
  const [ eth, setEth ] = useState(null);
  const [ nft, setNft ] = useState(0)

  // console.log(`listener`, EventListener)
  // useEffect(() => {
  // })

  const listener = EventDispatcher.getInstance()
  // listener.on("AND_1", setNft((e) => {e + 1}))
  // listener.on("AND_1", e => setNft((prev) => prev + e))
  listener.on("AND_1", (e) => console.log(e))

  console.log(listener)

  useEffect(() => {
    poolData
    .then(data => { 
      setDai(() => weiToEthUsd(data.cumulativePrizeGross, 1)) 
      setEth(() => weiToEthUsd(data.cumulativePrizeGross, 0)) 
    })
  }, [poolData]);
	
  return(
    <>
    <div className='universe'>
      <PoolTab
      />
      <PoolHUD
        eth={eth}
        dai={dai}
        nft={nft}
      />
    </div>
    </>
    )
  }

  
