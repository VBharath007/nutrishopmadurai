const fs = require('fs');
const path = 'd:/suriyamillets/src/data/cosmeticsProducts.js';
let content = fs.readFileSync(path, 'utf8');

if (!content.includes('import img_vanillaNightCream')) {
    content = content.replace(/export const cosmeticProductsData = \[/, `import img_vanillaNightCream from '../assets/Cosmeticimages/cream Webp/vanilla night cream.webp';\nexport const cosmeticProductsData = [`);
}

// Update the Vannila Night Cream image from fallback to the actual image
content = content.replace(/"name": "Vannila Night Cream"[\s\S]*?"images": \[\s*img_wheatgermVanilla[^\n]*/g, '"name": "Vannila Night Cream",\n        "slug": "vannila-night-cream",\n        "category": "CREAM",\n        "price": 320,\n        "oldPrice": 400,\n        "discount": "20% Off",\n        "rating": 4.8,\n        "reviews": 120,\n        "tag": "Offer",\n        "metaTitle": "Vannila Night Cream | Nutrishop",\n        "metaDescription": "Buy high quality Vannila Night Cream from Nutrishop. 100% natural and pure.",\n        "images": [\n            img_vanillaNightCream');

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed Vanilla Night Cream image');
