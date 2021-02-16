import React from "react";
import { callPoolTogetherApi } from '../../graphql/script.js'
import App from './App.jsx'

const url = 'https://api.thegraph.com/subgraphs/name/pooltogether/pooltogether-v3_1_0'
const id = '0x0650d780292142835f6ac58dd8e2a336e87b4393'
const query = `query {
  prizePools(where:{id:"${id}"}) {
    id
    cumulativePrizeNet
    cumulativePrizeGross
    cumulativePrizeReserveFee
  }
}`

console.log(`from poolHUD`, callPoolTogetherApi(url, query))
export default function PoolHUD(props) {	

  let prizeQuery = callPoolTogetherApi(url, query)


  const poolTotal = prizeQuery


	return(
    <App 
      poolTotal={poolTotal}
    />

  )
}