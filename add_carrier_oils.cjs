const fs = require('fs');

const filePath = 'd:\\suriyamillets\\src\\data\\cosmeticsProducts.js';
let content = fs.readFileSync(filePath, 'utf8');

const carrierOils = [
  { name: "Almond Oil", file: "Almond oil.webp", size: "30 ml", price: 225 },
  { name: "Avocado Oil", file: "Avacoda oil.webp", size: "30 ml", price: 225 },
  { name: "Apricot Oil", file: "apricot oil carrier oil.webp", size: "30 ml", price: 225 },
  { name: "Jojoba Oil", file: "jojoba oil carrier oil.webp", size: "30 ml", price: 225 },
  { name: "Walnut Oil", file: "walnut oil carrier oil.webp", size: "30 ml", price: 225 },
  { name: "Wheatgerm Oil", file: "wheatgerm oil carrier oil.webp", size: "30 ml", price: 225 }
];

let startId = 330;
let importStatements = "";
let arrayItems = "";

carrierOils.forEach((oil, index) => {
    const importVarName = `img_co_${index}`;
    importStatements += `import ${importVarName} from '../assets/Cosmeticimages/carrier oils/${oil.file}';\n`;
    
    arrayItems += `    },
    {
        "id": ${startId + index},
        "name": "${oil.name}",
        "slug": "${oil.name.toLowerCase().replace(/\s+/g, '-')}",
        "category": "Carrier Oils",
        "price": ${oil.price},
        "oldPrice": ${Math.floor(oil.price * 1.25)},
        "discount": "20% Off",
        "rating": 4.8,
        "reviews": 120,
        "tag": "Offer",
        "metaTitle": "${oil.name} | Nutrishop",
        "metaDescription": "Buy high quality ${oil.name} from Nutrishop. 100% natural and pure.",
        "images": [
            ${importVarName}
        ],
        "highlights": [
            "100% Pure",
            "Nourishing",
            "Cold Pressed"
        ],
        "description": "Premium quality ${oil.name} from Nutrishop. Carefully extracted to retain maximum benefits for your skin and hair.",
        "variants": [
            {
                "size": "${oil.size.replace(' ', '')}",
                "price": ${oil.price}
            }
        ],
        "offers": [],
        "faqs": []
`;
});

// Avoid duplicate insertion
if (!content.includes('category": "Carrier Oils"')) {
    // Add imports right before export const cosmeticProductsData
    content = content.replace(/export const cosmeticProductsData = \[/, 
        importStatements + '\nexport const cosmeticProductsData = [');
    
    // Add array items at the end
    content = content.replace(/    \}\n\];/, arrayItems + '    }\n];');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully added Carrier Oils.');
} else {
    console.log('Carrier Oils already exist.');
}
