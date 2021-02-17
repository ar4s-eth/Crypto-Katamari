import React from "react";
import { poolData } from '../../graphql/script.js'
import App from './App.jsx'
import weiToEthUsd from '../helpers/convertETH.js'

// console.log(`from poolHUD`, callPoolTogetherApi(url, query))

export default function PoolHUD(props) {	




	return(
    <h1 className='universe' id='pool_amount'>
      <eth>{pool}</eth><sym><img src={ethereum} alt='ETH'></img></sym>
      <dai>5000.35</dai><sym><img src={dai} alt='Dai'></img></sym>
      <nft>123</nft><sym><img src={opensea} alt='OpenSea'></img></sym>
    </h1>
  )
}