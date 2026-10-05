const fs = require('fs');
const path = 'd:/suriyamillets/src/data/cosmeticsProducts.js';
let content = fs.readFileSync(path, 'utf8');

// Updates map: { name: [size, price] }
const updates = {
    "Avocado Face Scrub": ["100gm", 400],
    "Charcoal Face Scrub": ["100gm", 500],
    "Coffee Face Scrub": ["100gm", 400],
    "Orange Face Scrub": ["100gm", 360],
    "Walnut Face Scrub": ["100gm", 360]
};

for (const [name, [size, price]] of Object.entries(updates)) {
    const safeName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const blockRegex = new RegExp(`(\\"name\\"\\s*:\\s*\\"${safeName}\\"[\\s\\S]*?\\"price\\"\\s*:\\s*)\\d+([\\s\\S]*?\\"variants\\"\\s*:\\s*\\[\\s*\\{[\\s\\S]*?\\"size\\"\\s*:\\s*\\")[^\\"]+(\\"[\\s\\S]*?\\"price\\"\\s*:\\s*)\\d+`, 'g');
    
    content = content.replace(blockRegex, (match, p1, p2, p3) => {
        return `${p1}${price}${p2}${size}${p3}${price}`;
    });
}

// Add Aloevera Face Scrub if missing
if (!content.includes('"name": "Aloevera Face Scrub"')) {
    const importRegex = /import img_aloeScrub from '\.\.\/assets\/Cosmeticimages\/Face Scrub Webp\/aloe vera face scrub\.webp';/;
    if (!importRegex.test(content)) {
        content = content.replace(/export const cosmeticProductsData = \[/, `import img_aloeScrub from '../assets/Cosmeticimages/Face Scrub Webp/aloe vera face scrub.webp';\nexport const cosmeticProductsData = [`);
    }

    const newProduct = `    {
        "id": 380,
        "name": "Aloevera Face Scrub",
        "slug": "aloevera-face-scrub",
        "category": "FACE SCRUB",
        "price": 360,
        "oldPrice": 450,
        "discount": "20% Off",
        "rating": 4.8,
        "reviews": 120,
        "tag": "Offer",
        "metaTitle": "Aloevera Face Scrub | Nutrishop",
        "metaDescription": "Buy high quality Aloevera Face Scrub from Nutrishop. 100% natural and pure.",
        "images": [
            img_aloeScrub
        ],
        "highlights": [
            "100% Natural",
            "Authentic Ayurveda",
            "Deep Cleansing"
        ],
        "description": "Premium quality Aloevera Face Scrub from Nutrishop. Carefully formulated using traditional herbal recipes.",
        "variants": [
            {
                "size": "100gm",
                "price": 360
            }
        ],
        "offers": [],
        "faqs": []
    },
`;
    content = content.replace(/export const cosmeticProductsData = \[\n/, `export const cosmeticProductsData = [\n${newProduct}`);
}

// Add Saffron Face Scrub if missing
if (!content.includes('"name": "Saffron Face Scrub"')) {
    const importRegex = /import img_saffronScrub from '\.\.\/assets\/Cosmeticimages\/Face Scrub Webp\/saffron face scrub\.webp';/;
    if (!importRegex.test(content)) {
        content = content.replace(/export const cosmeticProductsData = \[/, `import img_saffronScrub from '../assets/Cosmeticimages/Face Scrub Webp/saffron face scrub.webp';\nexport const cosmeticProductsData = [`);
    }

    const newProduct = `    {
        "id": 381,
        "name": "Saffron Face Scrub",
        "slug": "saffron-face-scrub",
        "category": "FACE SCRUB",
        "price": 400,
        "oldPrice": 500,
        "discount": "20% Off",
        "rating": 4.8,
        "reviews": 120,
        "tag": "Offer",
        "metaTitle": "Saffron Face Scrub | Nutrishop",
        "metaDescription": "Buy high quality Saffron Face Scrub from Nutrishop. 100% natural and pure.",
        "images": [
            img_saffronScrub
        ],
        "highlights": [
            "100% Natural",
            "Authentic Ayurveda",
            "Skin Brightening"
        ],
        "description": "Premium quality Saffron Face Scrub from Nutrishop. Carefully formulated using traditional herbal recipes.",
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

fs.writeFileSync(path, content, 'utf8');
console.log('Update scrub script completed successfully.');
