const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

const regex = /(\"name\": \"RICE AVUL\"[\s\S]*?\"images\": \[\s*)\"[^\"]+\"/g;
content = content.replace(regex, `$1\"/Product-images/Aval/RICE AVAL.png\"`);

fs.writeFileSync('src/data/products.js', content);
console.log('Rice Avul image fixed!');
