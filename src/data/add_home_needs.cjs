const fs = require('fs');
const path = 'd:/suriyamillets/src/data/cosmeticsProducts.js';
let content = fs.readFileSync(path, 'utf8');

if (!content.includes('"name": "Dishwash Liquid"')) {
    const imports = `import img_dishwash from '../assets/Cosmeticimages/other home needs/Diswash liquid.png';
import img_floorcleaner from '../assets/Cosmeticimages/other home needs/floorcleaner_herbal.webp';
import img_laundry from '../assets/Cosmeticimages/other home needs/laundrywash_herbal.webp';
`;
    content = content.replace(/export const cosmeticProductsData = \[/, `${imports}\nexport const cosmeticProductsData = [`);

    const newProducts = `
    {
        "id": 401,
        "name": "Dishwash Liquid",
        "slug": "dishwash-liquid",
        "category": "OTHER HOME NEEDS",
        "price": 180,
        "oldPrice": 220,
        "discount": "15% Off",
        "rating": 4.8,
        "reviews": 150,
        "tag": "Bestseller",
        "metaTitle": "Dishwash Liquid | Nutrishop",
        "metaDescription": "Buy high quality Dishwash Liquid from Nutrishop.",
        "images": [
            img_dishwash
        ],
        "highlights": [
            "Tough on Stains",
            "Gentle on Hands",
            "Eco-friendly"
        ],
        "description": "Premium Dishwash Liquid from Nutrishop. Effectively removes grease and grime.",
        "variants": [
            {
                "size": "500ml",
                "price": 180
            }
        ],
        "offers": [],
        "faqs": []
    },
    {
        "id": 402,
        "name": "Herbal Floor Cleaner",
        "slug": "herbal-floor-cleaner",
        "category": "OTHER HOME NEEDS",
        "price": 280,
        "oldPrice": 350,
        "discount": "20% Off",
        "rating": 4.9,
        "reviews": 210,
        "tag": "Offer",
        "metaTitle": "Herbal Floor Cleaner | Nutrishop",
        "metaDescription": "Buy high quality Herbal Floor Cleaner from Nutrishop.",
        "images": [
            img_floorcleaner
        ],
        "highlights": [
            "100% Herbal",
            "Kills Germs",
            "Safe for Pets"
        ],
        "description": "Premium Herbal Floor Cleaner from Nutrishop. Leaves your floor sparkling clean.",
        "variants": [
            {
                "size": "500ml",
                "price": 280
            }
        ],
        "offers": [],
        "faqs": []
    },
    {
        "id": 403,
        "name": "Herbal Laundry Wash",
        "slug": "herbal-laundry-wash",
        "category": "OTHER HOME NEEDS",
        "price": 200,
        "oldPrice": 250,
        "discount": "20% Off",
        "rating": 4.8,
        "reviews": 180,
        "tag": "Offer",
        "metaTitle": "Herbal Laundry Wash | Nutrishop",
        "metaDescription": "Buy high quality Herbal Laundry Wash from Nutrishop.",
        "images": [
            img_laundry
        ],
        "highlights": [
            "Removes Tough Stains",
            "Fabric Safe",
            "Herbal Formula"
        ],
        "description": "Premium Herbal Laundry Wash from Nutrishop. Gentle on clothes, tough on stains.",
        "variants": [
            {
                "size": "500ml",
                "price": 200
            }
        ],
        "offers": [],
        "faqs": []
    },
`;

    content = content.replace(/export const cosmeticProductsData = \[\n/, `export const cosmeticProductsData = [\n${newProducts}`);
    fs.writeFileSync(path, content, 'utf8');
    console.log('Added Other Home Needs category and products successfully.');
} else {
    console.log('Already added.');
}
