const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

const replacements = {
  'DRYFRUIT LADOO BOX': '/Product-images/Ladoo/dry fruit ladoo.webp',
  'FLAXSEED LADOO BOX': '/Product-images/Ladoo/flax seed ladoo.webp'
};

for (const [name, img] of Object.entries(replacements)) {
  const regex = new RegExp(`(\"name\": \"${name}\"[\\s\\S]*?\"images\": \\[\\s*)\"[^\"]+\"`, 'g');
  content = content.replace(regex, `$1\"${img}\"`);
}

fs.writeFileSync('src/data/products.js', content);
console.log('Ladoo box images fixed!');
