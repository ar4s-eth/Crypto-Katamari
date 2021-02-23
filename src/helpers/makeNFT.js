const { weiToEthUsd } = require('./convertWei')
const n = 12
const order = require(`../orders/order${n}`)


const makeNFT = (json) => {
  let obj = Object.keys(json)[0]
  const ethPrice = weiToEthUsd(json[obj].current_price, 0)
  const usdPrice = weiToEthUsd(json[obj].current_price, 1)
  
  // Filter out mp4'd
  const isMP4 = json[obj].asset.image_thumbnail_url.slice(-3)
  if(isMP4 === 'mp4') {
    return
  }
  // console.log(`slice`, isMP4)
  
  const payLoad = { 
    name: json[obj].asset.name, 
    thumbnail: json[obj].asset.image_thumbnail_url, 
    animation: json[obj].asset.animation_url, 
    image: json[obj].asset.image_preview_url, 
    perma: json[obj].asset.permalink,
    eth_price: ethPrice, 
    usd_price: usdPrice 
  }
  return payLoad
}

const testNFT = makeNFT(order)

// console.log(testNFT)

// console.log(`name`, json[obj].asset.name)
// console.log(`thumbnail`, json[obj].asset.image_thumbnail_url)
// console.log(`permalink`, json[obj].asset.permalink)
// console.log(`infoMedia Anim`, json[obj].asset.animation_url)
// console.log(`infoMedia`, json[obj].asset.image_preview_url)
// console.log(`eth`, weiToEthUsd(json[obj].current_price, 0))
// console.log(`usd`, weiToEthUsd(json[obj].current_price, 1))

module.exports = testNFT