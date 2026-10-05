const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

const imageReplacements = {
  'AMARANTHUS FLOUR': '/Product-images/Gluten Free Products/AMARANTHUS FLOUR.png',
  'BUCK WHEAT FLOUR': '/Product-images/Gluten Free Products/buckwheat flour.png',
  'INSTANT OATS': '/Product-images/Gluten Free Products/instant oats.png',
  'ROLLED OATS': '/Product-images/Gluten Free Products/Rolled oats.png',
  'STEEL CUT OATS': '/Product-images/Gluten Free Products/steelcut oats.png'
};

for (const [name, img] of Object.entries(imageReplacements)) {
  const regex = new RegExp(`(\"name\": \"${name}\"[\\s\\S]*?\"images\": \\[\\s*)\"[^\"]+\"`, 'g');
  content = content.replace(regex, `$1\"${img}\"`);
}

fs.writeFileSync('src/data/products.js', content);
console.log('Gluten free images fixed successfully!');
