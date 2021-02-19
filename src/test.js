const axios = require('axios');

axios.get('https://api.opensea.io/wyvern/v1/orders?bundled=false&include_bundled=false&include_invalid=false&side=1&sale_kind=0&limit=20&offset=0&order_by=created_date&order_direction=desc').then(res => {
  let counter = 0
  res.data.orders.forEach(order => {
    counter++
    if (order.asset !== null) {
      console.log(counter,'###################################################')
      console.log(order.asset.image_url)
      
    } else if (order.asset_bundle !== null) {
      order.asset_bundle.assets.forEach(asset => {
        console.log(counter,'###################################################')
        console.log(asset.image_url);
      })
    }
  })
}).catch(err => console.error(err));