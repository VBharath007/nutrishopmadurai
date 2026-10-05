const fs = require('fs');
const file = 'd:/suriyamillets/src/data/products.js';
const data = fs.readFileSync(file, 'utf8');
const result = data.replace(/category: "(.*?) Webp"/g, 'category: "$1"');
fs.writeFileSync(file, result, 'utf8');
console.log('Fixed categories!');
