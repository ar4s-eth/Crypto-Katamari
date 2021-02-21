import  React, { useState, useEffect } from "react";
import Phaser from 'phaser'
import EventDispatcher from '../helpers/eventDispatcher.js'

// Data
import { poolData } from '../helpers/getPoolData.js'
import { weiToEthUsd } from '../helpers/convertWei.js'
import World, { nftEvent } from '../scene/world'
import game from './game.js'

// Components
import PoolHUD from './PoolHUD.jsx'
import PoolTab from './PoolTab.jsx'
import InfoHUD from './InfoHUD.jsx'
import { Scene } from "phaser";


export default function App(props) {	  
  const [ dai, setDai ] = useState(null);
  const [ eth, setEth ] = useState(null);
  const [ nft, setNft ] = useState(0)
  const [ info, setInfo ] = useState('')

  // Update the NFT count
  useEffect(() => {
    const listener = EventDispatcher.getInstance()
    listener.on("AND_1", oneUp => setNft((prev) => prev + oneUp))    
  }, [])

  // Update the infoHUD
  useEffect(() => {
    const listener = EventDispatcher.getInstance()
    listener.on("LOAD_INFO", data => setInfo(() => data)
    )
  }, [])

  console.log(`from app`, info)
  
  // Fetch poolTogether Data
  useEffect(() => {
    poolData
    .then(data => { 
      setDai(() => weiToEthUsd(data.cumulativePrizeGross, 1)) 
      setEth(() => weiToEthUsd(data.cumulativePrizeGross, 0)) 
    })
  }, [poolData]);
	
  return(
    <>

        <InfoHUD
        info={info}
        />
        <PoolTab />
        <div className='universe'>
          <PoolHUD
            eth={eth}
            dai={dai}
            nft={nft}
          />
        </div>

    </>
    )
  }

  
