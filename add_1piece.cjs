const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

// Add 1 PIECE for KAMARKAT BOX
const kamarkatRegex = /(\"name\": \"KAMARKAT BOX\"[\s\S]*?\"variants\": \[\s*\{\s*\"size\": \"BOX\",\s*\"price\": 300\s*\})/g;
content = content.replace(kamarkatRegex, `$1,\n            {\n                "size": "1 PIECE",\n                "price": 3\n            }`);

// Add 1 PIECE for KARUPATTI CHOCOLATE
const karupattiRegex = /(\"name\": \"KARUPATTI CHOCOLATE\"[\s\S]*?\"variants\": \[\s*\{\s*\"size\": \"BOX\",\s*\"price\": 250\s*\})/g;
content = content.replace(karupattiRegex, `$1,\n            {\n                "size": "1 PIECE",\n                "price": 5\n            }`);

fs.writeFileSync('src/data/products.js', content);
console.log('Added 1 PIECE options!');
