const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

const regex = /(\"name\": \"ACHARI MASALA\"[\s\S]*?\"images\": \[\s*)\"[^\"]+\"/g;
content = content.replace(regex, `$1\"/Product-images/Millet Extruder Snacks/Achari masala.png\"`);

fs.writeFileSync('src/data/products.js', content);
console.log('Achari Masala image fixed!');
