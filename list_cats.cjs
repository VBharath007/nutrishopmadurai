const fs = require('fs');
const data = fs.readFileSync('d:/suriyamillets/src/data/products.js', 'utf8');
const cats = new Set();
const regex = /"category":\s*"([^"]+)"/g;
let match;
while ((match = regex.exec(data)) !== null) {
    cats.add(match[1]);
}
console.log(Array.from(cats).join(', '));
