const fs = require('fs');
const path = 'd:/suriyamillets/src/data/cosmeticsProducts.js';
let content = fs.readFileSync(path, 'utf8');

// 1. Update Category
content = content.replace(/"category": "FACE CREAM"/g, '"category": "CREAM"');

// Updates map: { oldName: [newName, size, price] }
const updates = {
    "Avocado Face Cream": ["Avocado Cream", "100gm", 440],
    "Lemon & Turmeric Face Cream": ["Lemon Turmeric Cream", "100gm", 360],
    "Neem & Tulsi Face Cream": ["Neem & Tulsi Cream", "100gm", 360],
    "Papaya Face Cream": ["Papaya Cream", "100gm", 300],
    "Sandal Face Cream": ["Sandal Cream", "100gm", 360],
    "Almond & Saffron Face Cream": ["Almond & Saffron Cream", "100gm", 480],
    "Antiageing Face Cream": ["Anti ageing Cream", "100gm", 400],
    "Cream Foot Care": ["Foot Care Cream", "100gm", 300]
};

for (const [oldName, [newName, size, price]] of Object.entries(updates)) {
    // Escape special characters in oldName
    const safeOldName = oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Create a regex to match the product block (simplified)
    const blockRegex = new RegExp(`(\\"name\\"\\s*:\\s*\\"${safeOldName}\\"[\\s\\S]*?\\"price\\"\\s*:\\s*)\\d+([\\s\\S]*?\\"variants\\"\\s*:\\s*\\[\\s*\\{[\\s\\S]*?\\"size\\"\\s*:\\s*\\")[^\\"]+(\\"[\\s\\S]*?\\"price\\"\\s*:\\s*)\\d+`, 'g');
    
    content = content.replace(blockRegex, (match, p1, p2, p3) => {
        return `${p1}${price}${p2}${size}${p3}${price}`;
    });

    // Rename the product itself
    content = content.replace(new RegExp(`\\"name\\"\\s*:\\s*\\"${safeOldName}\\"`, 'g'), `"name": "${newName}"`);
}

// Add Fairness Cream if missing
if (!content.includes('"name": "Fairness Cream"')) {
    const importRegex = /import img_newFaceCream from '\.\.\/assets\/Cosmeticimages\/Face Cream Webp\/fairness cream\.webp';/;
    if (!importRegex.test(content)) {
        content = content.replace(/export const cosmeticProductsData = \[/, `import img_newFaceCream from '../assets/Cosmeticimages/Face Cream Webp/fairness cream.webp';\nexport const cosmeticProductsData = [`);
    }

    const newProduct = `    {
        "id": 370,
        "name": "Fairness Cream",
        "slug": "fairness-cream",
        "category": "CREAM",
        "price": 400,
        "oldPrice": 500,
        "discount": "20% Off",
        "rating": 4.8,
        "reviews": 120,
        "tag": "Offer",
        "metaTitle": "Fairness Cream | Nutrishop",
        "metaDescription": "Buy high quality Fairness Cream from Nutrishop. 100% natural and pure.",
        "images": [
            img_newFaceCream
        ],
        "highlights": [
            "100% Natural",
            "Authentic Ayurveda",
            "Glowing Skin"
        ],
        "description": "Premium quality Fairness Cream from Nutrishop. Carefully formulated using traditional herbal recipes.",
        "variants": [
            {
                "size": "100gm",
                "price": 400
            }
        ],
        "offers": [],
        "faqs": []
    },
`;
    content = content.replace(/export const cosmeticProductsData = \[\n/, `export const cosmeticProductsData = [\n${newProduct}`);
}

// Add Vanilla Night Cream if missing
if (!content.includes('"name": "Vannila Night Cream"')) {
    const newProduct = `    {
        "id": 371,
        "name": "Vannila Night Cream",
        "slug": "vannila-night-cream",
        "category": "CREAM",
        "price": 320,
        "oldPrice": 400,
        "discount": "20% Off",
        "rating": 4.8,
        "reviews": 120,
        "tag": "Offer",
        "metaTitle": "Vannila Night Cream | Nutrishop",
        "metaDescription": "Buy high quality Vannila Night Cream from Nutrishop. 100% natural and pure.",
        "images": [
            img_wheatgermVanilla // fallback
        ],
        "highlights": [
            "100% Natural",
            "Authentic Ayurveda",
            "Night Repair"
        ],
        "description": "Premium quality Vannila Night Cream from Nutrishop. Carefully formulated using traditional herbal recipes.",
        "variants": [
            {
                "size": "100gm",
                "price": 320
            }
        ],
        "offers": [],
        "faqs": []
    },
`;
    content = content.replace(/export const cosmeticProductsData = \[\n/, `export const cosmeticProductsData = [\n${newProduct}`);
}

// Foot Care Cream's category change if it was FOOT CARE
content = content.replace(/"name": "Foot Care Cream",\s*"slug": "cream-foot-care",\s*"category": "FOOT CARE"/g, '"name": "Foot Care Cream",\n        "slug": "cream-foot-care",\n        "category": "CREAM"');
content = content.replace(/"name": "Foot Care Cream",\s*"slug": "cream-foot-care",\s*"metaTitle":/g, '"name": "Foot Care Cream",\n        "slug": "cream-foot-care",\n        "category": "CREAM",\n        "metaTitle":'); // Add category if it was missing

fs.writeFileSync(path, content, 'utf8');
console.log('Update script completed successfully.');
