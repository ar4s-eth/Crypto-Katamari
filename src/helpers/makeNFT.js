const { weiToEthUsd } = require('./convertWei')
const n = 12
const order = require(`../orders/order${n}`)


const makeNFT = (order) => {
  let obj = Object.keys(order)[0]
  const ethPrice = weiToEthUsd(order[obj].current_price, 0)
  const usdPrice = weiToEthUsd(order[obj].current_price, 1)
  
  // Filter out mp4'd
  const isMP4 = order[obj].asset.image_thumbnail_url.slice(-3)
  if(isMP4 === 'mp4') {
    return
  }
  // console.log(`slice`, isMP4)
  
  const payLoad = { 
    name: order.name,
    thumbnail: order.thumbnail,
    animation: order.animation,
    image: order.image,
    perma: order.perma,
    eth_price: order.eth_price, 
    usd_price: order.usd_price
  }
  return payLoad
}

// const testNFT = makeNFT(order)

// console.log(testNFT)

// console.log(`name`, json[obj].asset.name)
// console.log(`thumbnail`, json[obj].asset.image_thumbnail_url)
// console.log(`permalink`, json[obj].asset.permalink)
// console.log(`infoMedia Anim`, json[obj].asset.animation_url)
// console.log(`infoMedia`, json[obj].asset.image_preview_url)
// console.log(`eth`, weiToEthUsd(json[obj].current_price, 0))
// console.log(`usd`, weiToEthUsd(json[obj].current_price, 1))

module.exports = makeNFT;