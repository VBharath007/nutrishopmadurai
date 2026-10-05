const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

// Fix typo FIAX SEED -> FLAX SEED
const fiaxRegex = /(\"name\": \")FIAX SEED(\"[\s\S]*?\"images\": \[\s*)\"[^\"]+\"/g;
content = content.replace(fiaxRegex, `$1FLAX SEED$2"/Product-images/Seeds/flaxseed.webp"`);

// Fix image for BADAM BISIN
const badamRegex = /(\"name\": \"BADAM BISIN\"[\s\S]*?\"images\": \[\s*)\"[^\"]+\"/g;
content = content.replace(badamRegex, `$1"/Product-images/Seeds/badam pisin.webp"`);

fs.writeFileSync('src/data/products.js', content);
console.log('Seeds fixed!');
