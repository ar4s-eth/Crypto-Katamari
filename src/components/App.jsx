import  React, { useState, useEffect } from "react";
import { poolData } from '../helpers/getPoolData.js'
import PoolHUD from './PoolHUD.jsx'
import { weiToEthUsd } from '../helpers/convert.js'
import game from './game.js'

export default function App(props) {	  
  const [ dai, setDai ] = useState(null);
  const [ eth, setEth ] = useState(null);

  useEffect(() => {
    poolData
      .then(data => { 
        setDai(() => weiToEthUsd(data.cumulativePrizeGross, 1)) 
        setEth(() => weiToEthUsd(data.cumulativePrizeGross, 0)) 
      })
  }, [poolData]);
	
  return(
    <PoolHUD
      eth={eth}
      dai={dai}    
    />
  )
}