const Koa = require('koa');

const app = new Koa();

const query = 'assets?order_by=sale_price&order_direction=asc&offset=0&limit=20'

app.use(async ctx => {
  ctx.url = `https://api.opensea.io/api/v1${query}`;
  console.log(ctx.body)
})

app.use(async ctx => {
  ctx; // is the Context
  ctx.request; // is a Koa Request
  ctx.response; // is a Koa Response
});

app.listen(3000);