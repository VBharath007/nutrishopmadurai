const fs = require('fs');
let file = 'd:/suriyamillets/src/data/cosmeticsProducts.js';
let content = fs.readFileSync(file, 'utf8');

// Replace double instances
content = content.replace(/Hand Made Hand Made Soap/g, 'Hand Made Soap');
content = content.replace(/Hand Made Soap Hand Made Soap/g, 'Hand Made Soap');
content = content.replace(/Hand Made Soap Soap/g, 'Hand Made Soap');
content = content.replace(/Hand Made Soap  Hand Made Soap/g, 'Hand Made Soap'); // Just in case of extra spaces

fs.writeFileSync(file, content, 'utf8');
console.log('Cleanup complete.');
