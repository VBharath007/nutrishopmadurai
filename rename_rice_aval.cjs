const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

// Replace the name "RICE AVUL" with "RICE AVAL"
content = content.replace(/\"name\": \"RICE AVUL\"/g, '\"name\": \"RICE AVAL\"');

fs.writeFileSync('src/data/products.js', content);
console.log('Renamed RICE AVUL to RICE AVAL!');
