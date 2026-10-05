const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

const regex = /(\"name\": \"DIABETIC FRIENDLY HEALTH MIX\"[\s\S]*?\"images\": \[\s*)\"[^\"]+\"/g;
content = content.replace(regex, `$1"/Product-images/Health Mix/DIAPETIC FRIENDLY.webp"`);

fs.writeFileSync('src/data/products.js', content);
console.log('Diabetic friendly health mix image fixed!');
