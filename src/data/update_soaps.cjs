const fs = require('fs');
let file = 'd:/suriyamillets/src/data/cosmeticsProducts.js';
let content = fs.readFileSync(file, 'utf8');

const updatedBlocks = [];
let currentIndex = 0;

// Use regex to find product objects
const productRegex = /\{\s*"id":\s*\d+,[^}]*?"name":\s*"([^"]+)",[^}]*?"category":\s*"([^"]+)",/gs;

content = content.replace(productRegex, (match, name, category) => {
    if (category === "SOAP") {
        let subCategory = '';
        if (name.includes('Aloevera') || name.includes('Sandal') || name.includes('Kasturimanjal') || name.includes('Multanimitti') || name.includes('Neem')) {
            subCategory = 'Herbal';
        } else if (name.includes('Freshcream') || name.includes('Goatmilk') || name.includes('Charcoal') || name.includes('Sheabutter') || name.includes('Honey')) {
            subCategory = 'Premium';
        } else if (name.includes('Avacado') || name.includes('Papaya') || name.includes('Cucumber') || name.includes('Rose') || name.includes('Jasmine') || name.includes('Orange')) {
            subCategory = 'Fruits & Flowers';
        } else if (name.includes('Vettiver') || name.includes('Lavender') || name.includes('Lemongrass') || name.includes('Teatree') || name.includes('Eucalyptus') || name.includes('Bergamot')) {
            subCategory = 'Aromatherapy';
        }

        if (subCategory) {
            return match.replace('"category": "SOAP",', `"category": "Hand Made Soap",\n        "subCategory": "${subCategory}",`);
        }
    }
    return match;
});

fs.writeFileSync(file, content, 'utf8');
console.log('Update finished.');
