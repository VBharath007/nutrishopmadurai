const fs = require('fs');
let file = 'd:/suriyamillets/src/data/cosmeticsProducts.js';
let content = fs.readFileSync(file, 'utf8');

const priceMap = {
    "Honeymilk": 440,
    "Honey & Milk": 440,
    "Saffron": 360,
    "Lavender": 300,
    "Neemaloevera": 280,
    "Neem & Aloevera": 280
};

// Function to update product
function updateProduct(nameKey, newPrice) {
    const regex = new RegExp(`("name":\\s*"${nameKey}[\\w\\s&]*Bodywash",[\\s\\S]*?"price":\\s*)\\d+([\\s\\S]*?"variants":\\s*\\[\\s*\\{\\s*"size":\\s*)"[^"]+"(,\\s*"price":\\s*)\\d+(\\s*\\}\\s*\\])`, "g");
    content = content.replace(regex, (match, p1, p2, p3, p4) => {
        return p1 + newPrice + p2 + '"200ml"' + p3 + newPrice + p4;
    });
}

for (const [nameKey, newPrice] of Object.entries(priceMap)) {
    updateProduct(nameKey, newPrice);
}

fs.writeFileSync(file, content, 'utf8');
console.log('Update complete.');
