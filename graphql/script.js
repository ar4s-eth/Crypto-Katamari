const axios = require('axios');

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

// takes two arguments when called, for the URL of the 
// API and the query you want to send. I can always change this.
export function callPoolTogetherApi(url, query) {
  axios({
    url: url,
    method: 'post',
    data: {
      query: query
    }
  }).then(res => {
    /* Possible to just return res.data and handle the nesting when it's
    being used. That will make this funciton more general but a bit more difficult
    to use in production? We should talk about this */
    return res.data.data.prizePools[0];
    // The return statement in that case would look as follows:
    // return res.data;
  }).catch(err => console.error(err));
};