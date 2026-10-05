const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

// Fix MALLI PODI top-level price
content = content.replace(/(\"name\": \"MALLI PODI\"[\s\S]*?\"price\": )210/g, '$145');

// Fix KULAMBU MASALA PODI top-level price
content = content.replace(/(\"name\": \"KULAMBU MASALA PODI\"[\s\S]*?\"price\": )210/g, '$178');

fs.writeFileSync('src/data/products.js', content);
console.log('Fixed MALLI and KULAMBU top level prices');
