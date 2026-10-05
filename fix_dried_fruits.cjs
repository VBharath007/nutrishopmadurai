const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

const imageReplacements = {
  'MANGO': '/Product-images/dried fruits/mango dried fruit.webp',
  'PINE APPLE': '/Product-images/dried fruits/pineapple dried fruit.webp'
};

for (const [name, img] of Object.entries(imageReplacements)) {
  // Ensure we only replace the DRIED FRUITS MANGO, not the Pickles MANGO if there are multiple.
  // We'll use a regex that looks for the category DRIED FRUITS in the block.
  const regex = new RegExp(`(\"name\": \"${name}\"[\\s\\S]*?\"category\": \"DRIED FRUITS\"[\\s\\S]*?\"images\": \\[\\s*)\"[^\"]+\"`, 'g');
  content = content.replace(regex, `$1\"${img}\"`);
  
  // Try reversed order if category comes first
  const regex2 = new RegExp(`(\"category\": \"DRIED FRUITS\"[\\s\\S]*?\"name\": \"${name}\"[\\s\\S]*?\"images\": \\[\\s*)\"[^\"]+\"`, 'g');
  content = content.replace(regex2, `$1\"${img}\"`);
}

fs.writeFileSync('src/data/products.js', content);
console.log('Dried Fruits images fixed!');
