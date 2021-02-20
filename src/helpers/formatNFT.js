const { weiToEthUsd } = require('./convert')
const order2 = require('../orders/order2')


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

const createSprite = (json) => {
  let obj = Object.keys(json)[0]
  //gets the NFT thumbnail
  console.log(json[obj].asset.name)
  console.log(json[obj].asset.image_thumbnail_url)
  console.log(json[obj].asset.permalink)
  console.log(weiToEthUsd(json[obj].current_price, 0))
  console.log(weiToEthUsd(json[obj].current_price, 1))
}

console.log(order2)

createSprite(order2)