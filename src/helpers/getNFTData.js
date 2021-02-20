const axios    = require('axios');
const fs       = require('fs');
let counter    = 0;

for (let i = 0; i< 4; i++) {
  axios.get(`https://api.opensea.io/wyvern/v1/orders?bundled=false&include_bundled=false&include_invalid=false&side=1&sale_kind=0&limit=50&offset=${i * 50}&order_by=created_date&order_direction=desc`)
    .then(res => {
      res.data.orders.forEach(order => {
        fs.writeFile(`src/orders/order${counter}.js`,
        `const order${counter} = ${JSON.stringify(order)}

        
        module.exports = { order${counter} }`,
        err => {
          if (err) throw error;
        })
        counter++
      })
    })
    .catch(err => console.error(err));

} 