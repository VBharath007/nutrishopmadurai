const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

content = content.replace(/\"category\": \"MASALA POWDER\(GENERALISE\)\"/g, '\"category\": \"MASALA POWDERS\"');

fs.writeFileSync('src/data/products.js', content);
console.log('Fixed category names to MASALA POWDERS');
