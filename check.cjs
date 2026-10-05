const fs = require('fs');
const data = fs.readFileSync('d:/suriyamillets/src/data/products.js', 'utf8');

const rx = /"name": "([^"]+)",\s*"slug": "[^"]+",\s*"category": "(HEALTH SUPPLEMENTS)"/g;
let m;
while (m = rx.exec(data)) {
    console.log(m.index, ':', m[2], ':', m[1]);
}
