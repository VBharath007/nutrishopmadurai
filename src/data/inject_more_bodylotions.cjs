const fs = require('fs');
let file = 'd:/suriyamillets/src/data/cosmeticsProducts.js';
let content = fs.readFileSync(file, 'utf8');

function injectProduct(name, slug, imageImport, imagePath, price) {
    if (!content.includes(imageImport)) {
        let match;
        let maxId = 0;
        const idRegex = /"id":\s*(\d+)/g;
        while ((match = idRegex.exec(content)) !== null) {
            let id = parseInt(match[1]);
            if (id > maxId) maxId = id;
        }
        
        const newImport = `import ${imageImport} from '${imagePath}';`;
        content = content.replace("export const cosmeticProductsData = [", newImport + "\nexport const cosmeticProductsData = [");
        
        const newProduct = `    {
        "id": ${maxId + 1},
        "name": "${name}",
        "slug": "${slug}",
        "category": "BODYLOTION",
        "price": ${price},
        "oldPrice": 399,
        "discount": "25% Off",
        "rating": 4.8,
        "reviews": 120,
        "tag": "Offer",
        "metaTitle": "${name} | Nutrishop",
        "metaDescription": "Buy high quality ${name} from Nutrishop. 100% natural, healthy, and organic.",
        "images": [
            ${imageImport}
        ],
        "highlights": [
            "100% Organic",
            "Pure & Natural",
            "Packed with Nutrition"
        ],
        "description": "Premium quality ${name} from Nutrishop. Carefully sourced and hygienically packed to retain all natural goodness.",
        "variants": [
            {
                "size": "100gm",
                "price": ${price}
            }
        ],
        "offers": [],
        "faqs": []
    }
`;
        
        const closingBracketIndex = content.lastIndexOf('];');
        if (closingBracketIndex !== -1) {
            content = content.slice(0, closingBracketIndex) + ',\n' + newProduct + content.slice(closingBracketIndex);
        }
    }
}

injectProduct("Cold Moisturising Bodylotion", "cold-moisturising-bodylotion", "img_coldMoisturising", "../assets/Cosmeticimages/Bodylotion Webp/cold moisturising body lotion.webp", 240);
injectProduct("Wheatgerm & Vanilla Bodylotion", "wheatgerm-vanilla-bodylotion", "img_wheatgermVanilla", "../assets/Cosmeticimages/Bodylotion Webp/Wheatgerm & Vanilla body lotion.webp", 380);

fs.writeFileSync(file, content, 'utf8');
console.log('Cold Moisturising and Wheatgerm Bodylotions injection complete.');
