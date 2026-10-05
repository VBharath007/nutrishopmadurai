const fs = require('fs');

const filePath = 'd:\\suriyamillets\\src\\data\\cosmeticsProducts.js';
let content = fs.readFileSync(filePath, 'utf8');

// Replace prices and sizes for existing INCENSE STICKS
content = content.replace(/"category": "INCENSE STICKS",\s*"price": 199,\s*"oldPrice": 249,\s*"discount": "20% Off",/g, 
`"category": "INCENSE STICKS",
        "price": 100,
        "oldPrice": 150,
        "discount": "33% Off",`);

content = content.replace(/("description": "Premium quality (.*?) from Nutrishop. Carefully sourced for a refreshing aroma.",\s*"variants": \[\s*\{\s*)"size": "Standard",\s*"price": 199(\s*\}\s*\])/g, 
`$1"size": "50gm",
                "price": 100$3`);

// Add imports if they don't exist
if (!content.includes('img_davana')) {
    content = content.replace(/export const cosmeticProductsData = \[/, 
`import img_davana from '../assets/Cosmeticimages/Incense Sticks/davana incense stick.webp';
import img_vettiver from '../assets/Cosmeticimages/Incense Sticks/vettiver incense stick.webp';
import img_mattipal from '../assets/Cosmeticimages/Incense Sticks/sandal.webp';

export const cosmeticProductsData = [`);
}

// Add new items to array
if (!content.includes('Davana Incense Stick')) {
    const newItems = `    },
    {
        "id": 294,
        "name": "Davana Incense Stick",
        "slug": "davana-incense-stick",
        "category": "INCENSE STICKS",
        "price": 100,
        "oldPrice": 150,
        "discount": "33% Off",
        "rating": 4.8,
        "reviews": 120,
        "tag": "Offer",
        "metaTitle": "Davana Incense Stick | Nutrishop",
        "metaDescription": "Buy high quality Davana Incense Stick from Nutrishop. 100% natural and fragrant.",
        "images": [
            img_davana
        ],
        "highlights": [
            "100% Natural",
            "Long Lasting Fragrance",
            "Calming Aroma"
        ],
        "description": "Premium quality Davana Incense Stick from Nutrishop. Carefully sourced for a refreshing aroma.",
        "variants": [
            {
                "size": "50gm",
                "price": 100
            }
        ],
        "offers": [],
        "faqs": []
    },
    {
        "id": 295,
        "name": "Mattipal Incense Stick",
        "slug": "mattipal-incense-stick",
        "category": "INCENSE STICKS",
        "price": 100,
        "oldPrice": 150,
        "discount": "33% Off",
        "rating": 4.8,
        "reviews": 120,
        "tag": "Offer",
        "metaTitle": "Mattipal Incense Stick | Nutrishop",
        "metaDescription": "Buy high quality Mattipal Incense Stick from Nutrishop. 100% natural and fragrant.",
        "images": [
            img_mattipal
        ],
        "highlights": [
            "100% Natural",
            "Long Lasting Fragrance",
            "Calming Aroma"
        ],
        "description": "Premium quality Mattipal Incense Stick from Nutrishop. Carefully sourced for a refreshing aroma.",
        "variants": [
            {
                "size": "50gm",
                "price": 100
            }
        ],
        "offers": [],
        "faqs": []
    },
    {
        "id": 296,
        "name": "Vettiver Incense Stick",
        "slug": "vettiver-incense-stick",
        "category": "INCENSE STICKS",
        "price": 100,
        "oldPrice": 150,
        "discount": "33% Off",
        "rating": 4.8,
        "reviews": 120,
        "tag": "Offer",
        "metaTitle": "Vettiver Incense Stick | Nutrishop",
        "metaDescription": "Buy high quality Vettiver Incense Stick from Nutrishop. 100% natural and fragrant.",
        "images": [
            img_vettiver
        ],
        "highlights": [
            "100% Natural",
            "Long Lasting Fragrance",
            "Calming Aroma"
        ],
        "description": "Premium quality Vettiver Incense Stick from Nutrishop. Carefully sourced for a refreshing aroma.",
        "variants": [
            {
                "size": "50gm",
                "price": 100
            }
        ],
        "offers": [],
        "faqs": []
    }
];`;
    content = content.replace(/    \}\n\];/, newItems);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Update complete.');
