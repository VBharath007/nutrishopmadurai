const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

const imageReplacements = {
  'ELLU IDLY PODI': '/Product-images/Podi Varieties/ellu idli podi.webp',
  'IDLY PODI': '/Product-images/Podi Varieties/idly podi.webp'
};

for (const [name, img] of Object.entries(imageReplacements)) {
  const regex = new RegExp(`(\"name\": \"${name}\"[\\s\\S]*?\"images\": \\[\\s*)\"[^\"]+\"`, 'g');
  content = content.replace(regex, `$1\"${img}\"`);
}

fs.writeFileSync('src/data/products.js', content);
console.log('Podi images fixed!');
