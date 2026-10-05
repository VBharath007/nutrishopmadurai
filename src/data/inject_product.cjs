const fs = require('fs');
let content = fs.readFileSync('d:/suriyamillets/src/data/cosmeticsProducts.js', 'utf8');

// Max ID
let match;
let maxId = 0;
const idRegex = /"id":\s*(\d+)/g;
while ((match = idRegex.exec(content)) !== null) {
    let id = parseInt(match[1]);
    if (id > maxId) maxId = id;
}
console.log('Max ID:', maxId);

// Max Img ID
let maxImgId = 0;
const imgRegex = /img_(\d+)/g;
while ((match = imgRegex.exec(content)) !== null) {
    let id = parseInt(match[1]);
    if (id > maxImgId) maxImgId = id;
}
console.log('Max Img ID:', maxImgId);

// Add the new import
const newImport = "import img_newFacewash from '../assets/Cosmeticimages/Facewash Webp/Hibiscus  Face wash.webp';";
content = content.replace("export const cosmeticProductsData = [", newImport + "\nexport const cosmeticProductsData = [");

// Add the new product right before the closing bracket of cosmeticProductsData
const newProduct = `    {
        "id": ${maxId + 1},
        "name": "Hibiscus Face wash",
        "slug": "hibiscus-face-wash",
        "category": "FACEWASH",
        "price": 299,
        "oldPrice": 399,
        "discount": "25% Off",
        "rating": 4.8,
        "reviews": 120,
        "tag": "Offer",
        "metaTitle": "Hibiscus Face wash | Nutrishop",
        "metaDescription": "Buy high quality Hibiscus Face wash from Nutrishop. 100% natural, healthy, and organic.",
        "images": [
            img_newFacewash
        ],
        "highlights": [
            "100% Organic",
            "Pure & Natural",
            "Packed with Nutrition"
        ],
        "description": "Premium quality Hibiscus Face wash from Nutrishop. Carefully sourced and hygienically packed to retain all natural goodness.",
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
    fs.writeFileSync('d:/suriyamillets/src/data/cosmeticsProducts.js', content, 'utf8');
    console.log('Successfully updated cosmeticsProducts.js');
} else {
    console.log('Could not find closing bracket');
}
