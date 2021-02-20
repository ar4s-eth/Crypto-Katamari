const { weiToEthUsd } = require('./convertWei')
const order11 = require('../orders/order11')
const order12 = require('../orders/order12')
const order13 = require('../orders/order13')
const order14 = require('../orders/order14')
const order15 = require('../orders/order15')
const order16 = require('../orders/order16')
const order17 = require('../orders/order17')
const order18 = require('../orders/order18')
const order19 = require('../orders/order19')
const order20 = require('../orders/order20')
const order21 = require('../orders/order21')
const order22 = require('../orders/order22')
const order23 = require('../orders/order23')
const order24 = require('../orders/order24')
const order25 = require('../orders/order25')
const order26 = require('../orders/order26')
const order27 = require('../orders/order27')
const order28 = require('../orders/order28')
const order29 = require('../orders/order29')
const order30 = require('../orders/order30')
const order31 = require('../orders/order31')
const order32 = require('../orders/order32')
const order33 = require('../orders/order33')
const order34 = require('../orders/order34')
const order35 = require('../orders/order35')
const order36 = require('../orders/order36')
const order37 = require('../orders/order37')
const order38 = require('../orders/order38')
const order39 = require('../orders/order39')
const order40 = require('../orders/order40')
const order41 = require('../orders/order41')
const order42 = require('../orders/order42')
const order43 = require('../orders/order43')
const order44 = require('../orders/order44')
const order45 = require('../orders/order45')
const order46 = require('../orders/order46')
const order47 = require('../orders/order47')














// var string = JSON.stringify(order0)

// var mods = JSON.parse(string); //contains the json string
// for (let key in mods) {
//   // console.log(key);
//   console.log(mods[key]);
//   var keys = Object.keys(mods[key]);
  
//   const entries = new Map([`${keys}`])
//   console.log(entries);

// }

// var mods = JSON.parse(string); //contains the json string

// let convert = Object.entries(string)

// console.log(order0.order0.asset.image_thumbnail_url)

const makeSprite = (json) => {
  let obj = Object.keys(json)[0]
  
  // Filter out mp4'd
  const isMP4 = json[obj].asset.image_thumbnail_url.slice(-3)
  if(isMP4 === 'mp4') {
    return
  }
  // console.log(`slice`, isMP4)

  const ethPrice = weiToEthUsd(json[obj].current_price, 0)
  const usdPrice = weiToEthUsd(json[obj].current_price, 1)

  return console.log({ 
    name: json[obj].asset.name, 
    thumbnail: json[obj].asset.image_thumbnail_url, 
    animation: json[obj].asset.animation_url, 
    image: json[obj].asset.image_preview_url, 
    eth_price: ethPrice, 
    usd_price: usdPrice 
  })

  // console.log(`name`, json[obj].asset.name)
  // console.log(`thumbnail`, json[obj].asset.image_thumbnail_url)
  // console.log(`permalink`, json[obj].asset.permalink)
  // console.log(`infoMedia Anim`, json[obj].asset.animation_url)
  // console.log(`infoMedia`, json[obj].asset.image_preview_url)
  // console.log(`eth`, weiToEthUsd(json[obj].current_price, 0))
  // console.log(`usd`, weiToEthUsd(json[obj].current_price, 1))
  
}

// console.log(order11)

makeSprite(order11)
makeSprite(order12)
makeSprite(order13)
makeSprite(order14)
makeSprite(order15)
makeSprite(order16)
makeSprite(order17)
makeSprite(order18)
makeSprite(order19)
makeSprite(order20)
makeSprite(order21)
makeSprite(order22)
makeSprite(order23)
makeSprite(order24)
makeSprite(order25)
makeSprite(order26)
makeSprite(order27)
makeSprite(order28)
makeSprite(order29)
makeSprite(order30)
makeSprite(order31)
makeSprite(order32)
makeSprite(order33)
makeSprite(order34)
makeSprite(order35)
makeSprite(order36)
makeSprite(order37)
makeSprite(order38)
makeSprite(order39)
makeSprite(order40)
makeSprite(order41)
makeSprite(order42)
makeSprite(order43)
makeSprite(order44)
makeSprite(order45)
makeSprite(order46)
makeSprite(order47)

