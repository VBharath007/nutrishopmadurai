const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

const replacements = {
  'ASAFOETIDA CUBES': '/Product-images/Spices/New folder/ASAFOETIDA CUBES.webp',
  'ORGANIC HING POWDER': '/Product-images/Spices/New folder/ORGANIC HING POWDER.webp',
  'KUNGUMAPOO': '/Product-images/Spices/New folder/KUNGUMAPOO.webp'
};

for (const [name, img] of Object.entries(replacements)) {
  const regex = new RegExp(`(\"name\": \"${name}\"[\\s\\S]*?\"images\": \\[\\s*)\"[^\"]+\"`, 'g');
  content = content.replace(regex, `$1\"${img}\"`);
}

fs.writeFileSync('src/data/products.js', content);
console.log('Spices images fixed!');
