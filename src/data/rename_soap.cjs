const fs = require('fs');
for (const file of ['d:/suriyamillets/src/data/products.js', 'd:/suriyamillets/src/data/cosmeticsProducts.js']) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/"category":\s*"Homemade Soap"/g, '"category": "Hand Made Soap"');
    fs.writeFileSync(file, content, 'utf8');
}
console.log('Done');
