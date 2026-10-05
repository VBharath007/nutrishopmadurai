const fs = require('fs');

const filePath = 'd:\\suriyamillets\\src\\data\\cosmeticsProducts.js';
let content = fs.readFileSync(filePath, 'utf8');

const herbalProducts = [
  { name: "Body Massage Oil", file: "body message.webp", size: "200 ml", price: 400 },
  { name: "Herbal Hair oil", file: "herbal oil.webp", size: "100ml", price: 280 },
  { name: "Herbal massage oil", file: "herbal massage oil.webp", size: "100ml", price: 380 },
  { name: "Joint pain oil", file: "jointpainoil.webp", size: "100ml", price: 240 }
];

let startId = 360;
let importStatements = "";
let arrayItems = "";

herbalProducts.forEach((product, index) => {
    const importVarName = `img_hp_${index}`;
    importStatements += `import ${importVarName} from '../assets/Cosmeticimages/Herbal Products/${product.file}';\n`;
    
    arrayItems += `    },
    {
        "id": ${startId + index},
        "name": "${product.name}",
        "slug": "${product.name.toLowerCase().replace(/\s+/g, '-')}",
        "category": "Herbal Products",
        "price": ${product.price},
        "oldPrice": ${Math.floor(product.price * 1.25)},
        "discount": "20% Off",
        "rating": 4.8,
        "reviews": 120,
        "tag": "Offer",
        "metaTitle": "${product.name} | Nutrishop",
        "metaDescription": "Buy high quality ${product.name} from Nutrishop. 100% natural and pure.",
        "images": [
            ${importVarName}
        ],
        "highlights": [
            "100% Natural",
            "Authentic Ayurveda",
            "Therapeutic Properties"
        ],
        "description": "Premium quality ${product.name} from Nutrishop. Carefully formulated using traditional herbal recipes.",
        "variants": [
            {
                "size": "${product.size.replace(' ', '')}",
                "price": ${product.price}
            }
        ],
        "offers": [],
        "faqs": []
`;
});

// Avoid duplicate insertion
if (!content.includes('category": "Herbal Products"')) {
    // Add imports right before export const cosmeticProductsData
    content = content.replace(/export const cosmeticProductsData = \[/, 
        importStatements + '\nexport const cosmeticProductsData = [');
    
    // Add array items at the end
    content = content.replace(/    \}\n\];/, arrayItems + '    }\n];');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully added Herbal Products.');
} else {
    console.log('Herbal Products already exist.');
}
