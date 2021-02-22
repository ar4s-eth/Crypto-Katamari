const order = require('./orderIndex');

let n = 0;
for (const i in order) {
  n++;
  console.log(n);
}