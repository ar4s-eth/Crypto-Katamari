const orders = require('./orderIndex');
const { weiToEthUsd } = require('../helpers/convertWei')

const ordersArray = [];
for (const order in orders) {

  if (orders[order][order].asset) {
    ordersArray.push({ 
      eth_price: weiToEthUsd(orders[order][order].current_price, 0),
      usd_price: weiToEthUsd(orders[order][order].current_price, 1),
      thumbnail: orders[order][order].asset.image_thumbnail_url,
      image: orders[order][order].asset.image_url,
      name: orders[order][order].asset.name,
      perma: orders[order][order].asset.permalink,
      description: orders[order][order].asset.description
    });
  }

}

module.exports = { ordersArray };