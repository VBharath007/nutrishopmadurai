const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

const regex = /(\"name\": \"MORINGA  PODI\"[\s\S]*?\"images\": \[\s*)\"[^\"]+\"/g;
content = content.replace(regex, `$1\"/Product-images/Podi Varieties/Moringa  podi.png\"`);

fs.writeFileSync('src/data/products.js', content);
console.log('Moringa podi image fixed!');
