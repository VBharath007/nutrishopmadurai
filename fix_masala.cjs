const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

// Rename products
content = content.replace(/\"name\": \"MALLI POWDER\"/g, '"name": "MALLI PODI"');
content = content.replace(/\"name\": \"SAMBAR POWDER\"/g, '"name": "SAMBAR PODI"');
content = content.replace(/\"name\": \"KULAMBU MASALA POWDER\"/g, '"name": "KULAMBU MASALA PODI"');

// Fix Images
const img1 = /(\"name\": \"VATHAL PODI\"[\s\S]*?\"images\": \[\s*)\"[^\"]+\"/g;
content = content.replace(img1, `$1"/Product-images/Masala/vaththal podi.webp"`);

const img2 = /(\"name\": \"HOME MADE MANJAL PODI\"[\s\S]*?\"images\": \[\s*)\"[^\"]+\"/g;
content = content.replace(img2, `$1"/Product-images/Masala/manjal podi.webp"`);

// Clean up the weird price 0 variants
// Let's just globally replace any variant block that has price 0, size 250gm or 100gm followed by a comma
const badVariant1 = /\{\s*\"size\": \"250gm\",\s*\"price\": 0\s*\},\s*/g;
content = content.replace(badVariant1, '');

const badVariant2 = /\{\s*\"size\": \"100gm\",\s*\"price\": 0\s*\},\s*/g;
content = content.replace(badVariant2, '');

// Also fix the top level "price": 0 if any
content = content.replace(/(\"name\": \"(MALLI PODI|SAMBAR PODI|KULAMBU MASALA PODI)\"[\s\S]*?\"price\": )0/g, '$1210');
// (For Malli and Kulambu, it doesn't matter too much what top level price is since variants override, but let's just make it look clean)

fs.writeFileSync('src/data/products.js', content);
console.log('Masala data fixed!');
