const fs = require('fs');
let file = 'd:/suriyamillets/src/data/cosmeticsProducts.js';
let content = fs.readFileSync(file, 'utf8');

// First: Inject After Shave Face Gel if not already there
const newImport = "import img_newFaceGel from '../assets/Cosmeticimages/Face gel Webp/after shave face gel.webp';";
if (!content.includes('img_newFaceGel')) {
    let match;
    let maxId = 0;
    const idRegex = /"id":\s*(\d+)/g;
    while ((match = idRegex.exec(content)) !== null) {
        let id = parseInt(match[1]);
        if (id > maxId) maxId = id;
    }
    
    content = content.replace("export const cosmeticProductsData = [", newImport + "\nexport const cosmeticProductsData = [");
    
    const newProduct = `    {
        "id": ${maxId + 1},
        "name": "After Shave Face Gel",
        "slug": "after-shave-face-gel",
        "category": "FACE GEL",
        "price": 300,
        "oldPrice": 399,
        "discount": "25% Off",
        "rating": 4.8,
        "reviews": 120,
        "tag": "Offer",
        "metaTitle": "After Shave Face Gel | Nutrishop",
        "metaDescription": "Buy high quality After Shave Face Gel from Nutrishop. 100% natural, healthy, and organic.",
        "images": [
            img_newFaceGel
        ],
        "highlights": [
            "100% Organic",
            "Pure & Natural",
            "Packed with Nutrition"
        ],
        "description": "Premium quality After Shave Face Gel from Nutrishop. Carefully sourced and hygienically packed to retain all natural goodness.",
        "variants": [
            {
                "size": "100gm",
                "price": 300
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

// Second: Update sizes and prices for all face gels
const priceMap = {
    "After Shave": 300,
    "Aloevera": 240,
    "Cucumber": 300,
    "Saffron": 320,
    "Teatree": 320
};

function updateProduct(nameKey, newPrice) {
    const regex = new RegExp(`("name":\\s*"${nameKey}[\\w\\s]*Face\\s*Gel",[\\s\\S]*?"price":\\s*)\\d+([\\s\\S]*?"variants":\\s*\\[\\s*\\{\\s*"size":\\s*)"[^"]+"(,\\s*"price":\\s*)\\d+(\\s*\\}\\s*\\])`, "gi");
    content = content.replace(regex, (match, p1, p2, p3, p4) => {
        return p1 + newPrice + p2 + '"100gm"' + p3 + newPrice + p4;
    });
}

for (const [nameKey, newPrice] of Object.entries(priceMap)) {
    updateProduct(nameKey, newPrice);
}

fs.writeFileSync(file, content, 'utf8');
console.log('Face gel injection and update complete.');
