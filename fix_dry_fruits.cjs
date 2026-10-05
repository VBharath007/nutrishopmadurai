const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

const imageReplacements = {
  'CASHEW WHOLE': '/Product-images/Dryfruits/cashewwhole-dry.webp',
  'BROKEN CASHEW': '/Product-images/Dryfruits/brokencashew-dry.webp',
  'YELLOW KISMIS': '/Product-images/Dryfruits/kismis(yellow)-dry.webp',
  'BLACK KISMIS': '/Product-images/Dryfruits/blackkismis-dry.webp',
  'LOOSE  WALNUT': '/Product-images/Dryfruits/Loose wallnut.webp',
  'HANSRAJ WALNUT BOX': '/Product-images/Dryfruits/HANSRAJ WALNUT BOX.webp'
};

for (const [name, img] of Object.entries(imageReplacements)) {
  const regex = new RegExp(`(\"name\": \"${name}\"[\\s\\S]*?\"images\": \\[\\s*)\"[^\"]+\"`, 'g');
  content = content.replace(regex, `$1\"${img}\"`);
}

// Add 1kg variant for DATES
const datesRegex = /(\"name\": \"DATES\"[\s\S]*?\"variants\": \[\s*\{\s*\"size\": \"250GM\",\s*\"price\": 155\s*\})/g;
content = content.replace(datesRegex, `$1,\n            {\n                "size": "1 kg",\n                "price": 600\n            }`);

fs.writeFileSync('src/data/products.js', content);
console.log('Dry Fruits updated!');
