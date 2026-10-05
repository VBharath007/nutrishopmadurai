const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

// Fix CHANNA MASALA price
const regexChanna = /(\"name\": \"CHANNA MASALA\"[\s\S]*?\"price\": )0/g;
content = content.replace(regexChanna, '$185');

// Fix GARAM MASALA price
const regexGaram = /(\"name\": \"GARAM MASALA\"[\s\S]*?\"price\": )0/g;
content = content.replace(regexGaram, '$175');

fs.writeFileSync('src/data/products.js', content);
console.log('Fixed prices for Channa and Garam Masala');
