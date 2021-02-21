import React from 'react'

import "../stylesheets/infoHUD.css"


export default function InfoHUD(props) {	

  console.log(`from infoHUD`, props)
  let name = props.info.name;
  let animation = props.info.animation;
  let image = props.info.thumbnail;
  let perma = props.info.perma;
  let ethPrice = props.info.eth_price;
  let usdPrice = props.info.usd_price;

  return (
    <section className='infoHUD'>
      <h5>{name}</h5>
      <a href={perma} target="_blank"><img src={image} id='infoImage'></img></a>
      <h5>{ethPrice}</h5>
      <h5>{usdPrice}</h5>
    </section>
  )
}