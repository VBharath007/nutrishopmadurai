const fs = require('fs');
let data = fs.readFileSync('d:/suriyamillets/src/data/cosmeticsProducts.js', 'utf8');
data = data.replace(/"category": "OIL & SERUM"/g, '"category": "THAILAM"');
fs.writeFileSync('d:/suriyamillets/src/data/cosmeticsProducts.js', data);
console.log('Replaced successfully');
