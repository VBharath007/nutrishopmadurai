const fs = require('fs');

const filePath = 'd:\\suriyamillets\\src\\data\\cosmeticsProducts.js';
let content = fs.readFileSync(filePath, 'utf8');

const essentialOils = [
  { name: "Eucalyptus oil", file: "EUCALYPTUS OIL.webp", size: "100ml", price: 250 },
  { name: "Citronella Oil", file: "CITRONELLA OIL.webp", size: "100 ml", price: 300 },
  { name: "Lemongrass Oil", file: "lemongrassoil.webp", size: "100 ml", price: 275 },
  { name: "Teatree Oil", file: "TEATREE OIL.webp", size: "10 ml", price: 260 },
  { name: "Basil Oil", file: "BASIL OIL.webp", size: "10 ml", price: 280 },
  { name: "Spearmint Oil", file: "SPEAR MINT OIL.webp", size: "10 ml", price: 330 },
  { name: "Lavender Oil", file: "Lavender oil.webp", size: "10 ml", price: 300 },
  { name: "Clove Oil", file: "clove oil.jpeg", size: "10 ml", price: 225 },
  { name: "Petitgrain Oil", file: "PETITGRAIN OIL.webp", size: "10 ml", price: 300 },
  { name: "Peppermint Oil", file: "peppermint oil.webp", size: "10 ml", price: 250 },
  { name: "Cardamom Oil", file: "cardamom oil.webp", size: "10 ml", price: 200 },
  { name: "Ajwain oil", file: "ajwain oil.webp", size: "10 ml", price: 200 },
  { name: "Bergamot Oil", file: "bergamot oil.webp", size: "10 ml", price: 225 },
  { name: "Geranium Oil", file: "Geranium Oil.webp", size: "10 ml", price: 450 },
  { name: "Rosemary Oil", file: "Rosemary oil.webp", size: "10 ml", price: 260 },
  { name: "Lemon Oil", file: "lemon oil.webp", size: "10 ml", price: 200 },
  { name: "Cedarwood Oil", file: "Cedarwood Oil.webp", size: "10 ml", price: 225 },
  { name: "Ylang Ylang Oil", file: "Ylang Ylang Oil.webp", size: "10 ml", price: 280 },
  { name: "Orange Oil", file: "orange oil.webp", size: "10 ml", price: 240 },
  { name: "Patchouli Oil", file: "Patchouli Oil.webp", size: "10 ml", price: 350 },
  { name: "Cypress Oil", file: "Cypress Oil.webp", size: "10 ml", price: 420 }
];

let startId = 300;
let importStatements = "";
let arrayItems = "";

essentialOils.forEach((oil, index) => {
    const importVarName = `img_eo_${index}`;
    importStatements += `import ${importVarName} from '../assets/Cosmeticimages/Essential oils/${oil.file}';\n`;
    
    arrayItems += `    },
    {
        "id": ${startId + index},
        "name": "${oil.name}",
        "slug": "${oil.name.toLowerCase().replace(/\s+/g, '-')}",
        "category": "Essential Oils",
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
            "Therapeutic Grade",
            "Natural Essential Oil"
        ],
        "description": "Premium quality ${oil.name} from Nutrishop. Carefully extracted to retain maximum therapeutic benefits.",
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
if (!content.includes('category": "Essential Oils"')) {
    // Add imports right before export const cosmeticProductsData
    content = content.replace(/export const cosmeticProductsData = \[/, 
        importStatements + '\nexport const cosmeticProductsData = [');
    
    // Add array items at the end
    content = content.replace(/    \}\n\];/, arrayItems + '    }\n];');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully added Essential Oils.');
} else {
    console.log('Essential Oils already exist.');
}
