const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src', 'assets', 'Cosmeticimages');
const folders = fs.readdirSync(baseDir).filter(f => fs.statSync(path.join(baseDir, f)).isDirectory());

let imports = '';
let products = [];
let idCounter = 200;

function toTitleCase(str) {
  return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Custom format for name like "Avocado & Jojoba Body Lotion" from "bodylotion_avacadojojoba"
function formatName(filename, folderName) {
    let name = filename.replace('.webp', '');
    let parts = name.split('_');
    if (parts.length > 1) {
        let type = parts[0]; // e.g. bodylotion
        let flavour = parts[1]; // e.g. avacadojojoba
        
        // some custom formatting
        if (flavour === 'avacadojojoba') flavour = 'Avocado & Jojoba';
        if (flavour === 'honeymilk') flavour = 'Honey & Milk';
        if (flavour === 'neemaloevera') flavour = 'Neem & Aloevera';
        if (flavour === 'almondsaffron') flavour = 'Almond & Saffron';
        if (flavour === 'lemonturmeric') flavour = 'Lemon & Turmeric';
        if (flavour === 'neemtulsi') flavour = 'Neem & Tulsi';
        if (flavour === 'morningbreeze') flavour = 'Morning Breeze';
        
        flavour = toTitleCase(flavour);
        return `${flavour} ${folderName}`;
    }
    return toTitleCase(name);
}

folders.forEach(folder => {
  const folderPath = path.join(baseDir, folder);
  const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png'));
  
  const categoryName = folder.replace(' Webp', ''); // e.g. "Bodylotion"

  files.forEach(file => {
    const varName = `img_${idCounter}`;
    imports += `import ${varName} from '../assets/Cosmeticimages/${folder}/${file}';\n`;
    
    let prodName = formatName(file, categoryName);
    
    products.push({
      id: idCounter,
      name: prodName,
      slug: prodName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category: categoryName.toUpperCase(),
      price: 299,
      oldPrice: 399,
      discount: "25% Off",
      rating: 4.8,
      reviews: 120,
      tag: "Offer",
      metaTitle: `${prodName} | Suriya Millets`,
      metaDescription: `Buy high quality ${prodName} from Suriya Millets. 100% natural, healthy, and organic.`,
      images: [`IMPORT_REF:${varName}`],
      highlights: ["100% Organic", "Pure & Natural", "Packed with Nutrition"],
      description: `Premium quality ${prodName} from Suriya Millets. Carefully sourced and hygienically packed to retain all natural goodness.`,
      variants: [{ size: "Standard", price: 299 }],
      offers: [],
      faqs: []
    });
    idCounter++;
  });
});

let arrStr = JSON.stringify(products, null, 4);
arrStr = arrStr.replace(/"IMPORT_REF:([^"]+)"/g, '$1');

const fileContent = `${imports}\nexport const cosmeticProductsData = ${arrStr};\n`;
fs.writeFileSync(path.join(__dirname, 'src', 'data', 'cosmeticsProducts.js'), fileContent, 'utf8');
console.log('Successfully generated src/data/cosmeticsProducts.js');
