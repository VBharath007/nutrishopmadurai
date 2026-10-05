const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public', 'Product-images');
const newDir = path.join(publicDir, 'Millet Extruder Snacks');

if (!fs.existsSync(newDir)) {
  fs.mkdirSync(newDir, { recursive: true });
}

const imagesToMove = [
  { old: 'Snacks/m60 ragi choco stars.webp', new: 'Millet Extruder Snacks/m60 ragi choco stars.webp' },
  { old: 'Snacks/m60 ragi center fills.webp', new: 'Millet Extruder Snacks/m60 ragi center fills.webp' },
  { old: 'Snacks/mm choco coated monke.webp', new: 'Millet Extruder Snacks/mm choco coated monke.webp' },
  { old: 'Snacks/mm almond hearts.webp', new: 'Millet Extruder Snacks/mm almond hearts.webp' },
  { old: 'Snacks/mm peanut balls.webp', new: 'Millet Extruder Snacks/mm peanut balls.webp' },
  { old: 'Snacks/m60 multigrain  small rings.webp', new: 'Millet Extruder Snacks/m60 multigrain  small rings.webp' },
  { old: 'Snacks/m60 quinoa puffs.webp', new: 'Millet Extruder Snacks/m60 quinoa puffs.webp' },
  { old: 'Max Protein Chips/peri peri.webp', new: 'Millet Extruder Snacks/peri peri.webp' }
];

let productsContent = fs.readFileSync(path.join(__dirname, 'src', 'data', 'products.js'), 'utf8');

for (const img of imagesToMove) {
  const oldPath = path.join(publicDir, img.old);
  const newPath = path.join(publicDir, img.new);
  
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Moved: ${img.old} -> ${img.new}`);
  } else {
    console.log(`Not found: ${img.old}`);
  }

  // Update in products.js
  const oldUrlPath = `/Product-images/${img.old}`;
  const newUrlPath = `/Product-images/${img.new}`;
  productsContent = productsContent.split(oldUrlPath).join(newUrlPath);
}

fs.writeFileSync(path.join(__dirname, 'src', 'data', 'products.js'), productsContent);
console.log('products.js updated with new paths.');
