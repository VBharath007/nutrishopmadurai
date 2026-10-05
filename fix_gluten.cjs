const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

const imageReplacements = {
  'QUIN0A': '/Product-images/Gluten Free Products/quinoa.webp',
  'JUMBO OATS': '/Product-images/Gluten Free Products/jumbo_oats.webp'
};

for (const [name, img] of Object.entries(imageReplacements)) {
  const regex = new RegExp(`(\"name\": \"${name}\"[\\s\\S]*?\"images\": \\[\\s*)\"[^\"]+\"`, 'g');
  content = content.replace(regex, `$1\"${img}\"`);
}

fs.writeFileSync('src/data/products.js', content);
console.log('Gluten free images fixed!');
