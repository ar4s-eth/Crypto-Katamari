// const axios = require('axios');
// axios.get('https://api.etherscan.io/api?module=stats&action=ethprice&apikey=APIKEY')
// .then(res => {
//   if (res.status === 1) {
//     usd = res.result.ethusd;
//   } else {
//     usd = 1500;
//   }
//   // const eth = wei * 0.000000000000000001;
//   // return usdBool ? `$${(eth * usd).toFixed(2)}` : `${eth.toFixed(3)}`;
// });

const weiToEthUsd = (wei, usdBool) => {
  const eth = wei * 0.000000000000000001;
  const usd = 1483.79;

  return usdBool ? `$${(eth * usd).toFixed(2)}` : `${eth.toFixed(3)}`;
};

module.exports = { weiToEthUsd };