import  React, { useState, useEffect } from "react";
import { poolData } from '../helpers/getPoolData.js'
import App from './App.jsx'
import { weiToEthUsd } from '../helpers/convert.js'
// const axios = require('axios');

// console.log(`from poolHUD`, callPoolTogetherApi(url, query))




export default function PoolHUD(props) {	

  
  const [ price, setPrice ] = useState(null);

  let priceUSD = weiToEthUsd(price, 1);
  let priceETH = weiToEthUsd(price, 0);

  useEffect(() => {
    poolData
      .then(data => { 
        setPrice(() => weiToEthUsd(data.cumulativePrizeGross, 1)) 
      })
  }, [poolData]);

  console.log(`after useEffect`, price);

	
  return(
    <App
      price={price}    
    />
  )
}