const fs = require('fs');

const data = fs.readFileSync('src/data/products.js', 'utf8');
const unsplashLinks = data.match(/https:\/\/images\.unsplash\.com[^"]+/g);

const uniqueLinks = new Set(unsplashLinks);
console.log(Array.from(uniqueLinks));
