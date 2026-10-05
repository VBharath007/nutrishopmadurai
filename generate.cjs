const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src', 'assets', 'Cosmeticimages');
const productsFile = path.join(__dirname, 'src', 'data', 'products.js');

let imports = '';
let products = [];
let idCounter = 200;

function toTitleCase(str) {
  return str.replace(/_/g, ' ').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

const folders = fs.readdirSync(baseDir).filter(f => fs.statSync(path.join(baseDir, f)).isDirectory());

folders.forEach(folder => {
  const files = fs.readdirSync(path.join(baseDir, folder)).filter(f => f.endsWith('.webp'));
  files.forEach(file => {
    const importName = 'cosmetic_' + idCounter;
    imports += `import ${importName} from '../assets/Cosmeticimages/${folder}/${file}';\n`;
    
    let name = file.replace('.webp', '');
    name = toTitleCase(name);
    
    const slug = file.replace('.webp', '').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    
    products.push(`  {
    id: ${idCounter},
    slug: "${slug}",
    name: "${name}",
    category: "${folder}",
    price: 299,
    oldPrice: 399,
    discount: "25% Off",
    rating: 4.8,
    reviews: 120,
    metaTitle: "${name} | Nutri Shop",
    metaDescription: "Premium ${name}.",
    images: [${importName}],
    highlights: ["Natural Ingredients", "Premium Quality"],
    description: "Experience the premium quality of our ${name}.",
    variants: [{ size: "Standard", price: 299 }],
    offers: [], faqs: []
  }`);
    
    idCounter++;
  });
});

const currentContent = fs.readFileSync(productsFile, 'utf8');

const lastBracketIndex = currentContent.lastIndexOf('];');
if (lastBracketIndex !== -1) {
    let beforeBracket = currentContent.substring(0, lastBracketIndex).trim();
    // Remove the previous dummy // COSMETICS block
    const dummyIndex = beforeBracket.indexOf('// COSMETICS');
    if (dummyIndex !== -1) {
        beforeBracket = beforeBracket.substring(0, dummyIndex).trim();
        // Remove trailing comma if exists
        if (beforeBracket.endsWith(',')) {
            beforeBracket = beforeBracket.substring(0, beforeBracket.length - 1).trim();
        }
    }
    
    const finalContent = imports + '\n' + beforeBracket + ',\n  // COSMETICS\n' + products.join(',\n') + '\n];\n';
    fs.writeFileSync(productsFile, finalContent);
    console.log('Successfully updated products.js with ' + products.length + ' cosmetic products.');
} else {
    console.log('Could not parse products.js properly.');
}
