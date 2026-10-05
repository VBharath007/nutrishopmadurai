const fs = require('fs');
let file = 'd:/suriyamillets/src/data/cosmeticsProducts.js';
let content = fs.readFileSync(file, 'utf8');

// Max ID
let match;
let maxId = 0;
const idRegex = /"id":\s*(\d+)/g;
while ((match = idRegex.exec(content)) !== null) {
    let id = parseInt(match[1]);
    if (id > maxId) maxId = id;
}
console.log('Max ID:', maxId);

// Add the new import
const newImport = "import img_newShampoo from '../assets/Cosmeticimages/Shampoo Webp/shampoo_antidandruff.webp';";
content = content.replace("export const cosmeticProductsData = [", newImport + "\nexport const cosmeticProductsData = [");

// Add the new product right before the closing bracket of cosmeticProductsData
const newProduct = `    {
        "id": ${maxId + 1},
        "name": "Anti-Dandruff Shampoo",
        "slug": "anti-dandruff-shampoo",
        "category": "SHAMPOO",
        "price": 299,
        "oldPrice": 399,
        "discount": "25% Off",
        "rating": 4.8,
        "reviews": 120,
        "tag": "Offer",
        "metaTitle": "Anti-Dandruff Shampoo | Nutrishop",
        "metaDescription": "Buy high quality Anti-Dandruff Shampoo from Nutrishop. 100% natural, healthy, and organic.",
        "images": [
            img_newShampoo
        ],
        "highlights": [
            "100% Organic",
            "Pure & Natural",
            "Packed with Nutrition"
        ],
        "description": "Premium quality Anti-Dandruff Shampoo from Nutrishop. Carefully sourced and hygienically packed to retain all natural goodness.",
        "variants": [
            {
                "size": "Standard",
                "price": 299
            }
        ],
        "offers": [],
        "faqs": []
    }
`;

// Insert the new product at the end of the array
const closingBracketIndex = content.lastIndexOf('];');
if (closingBracketIndex !== -1) {
    content = content.slice(0, closingBracketIndex) + ',\n' + newProduct + content.slice(closingBracketIndex);
    fs.writeFileSync(file, content, 'utf8');
    console.log('Successfully updated cosmeticsProducts.js');
} else {
    console.log('Could not find closing bracket');
}
