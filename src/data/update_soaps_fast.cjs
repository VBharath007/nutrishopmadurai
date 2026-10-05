const fs = require('fs');
let file = 'd:/suriyamillets/src/data/cosmeticsProducts.js';
let content = fs.readFileSync(file, 'utf8');

const priceMap = {
    "Honey": 150,
    "Freshcream": 150,
    "Goatmilk": 150,
    "Charcoal": 125,
    "Sheabutter": 125,
    "Avacado": 110,
    "Papaya": 110,
    "Orange": 110,
    "Cucumber": 110,
    "Rose": 110,
    "Jasmine": 110,
    "Sandal": 90,
    "Kasturimanjal": 90,
    "Multanimitti": 90,
    "Neem & Tulsi": 90,
    "Aloevera": 90,
    "Eucalyptus": 90,
    "Vettiver": 90,
    "Lavender": 90,
    "Bergamot": 90,
    "Lemongrass": 90,
    "Teatree": 90
};

// Function to update product
function updateProduct(nameKey, newPrice) {
    // We match the name loosely to catch "Aloevera Soap" etc.
    const regex = new RegExp(`("name":\\s*"${nameKey}[\\w\\s&]*Soap",[\\s\\S]*?"price":\\s*)\\d+([\\s\\S]*?"variants":\\s*\\[\\s*\\{\\s*"size":\\s*)"[^"]+"(,\\s*"price":\\s*)\\d+(\\s*\\}\\s*\\])`, "g");
    content = content.replace(regex, (match, p1, p2, p3, p4) => {
        return p1 + newPrice + p2 + '"100gm"' + p3 + newPrice + p4;
    });
}

for (const [nameKey, newPrice] of Object.entries(priceMap)) {
    updateProduct(nameKey, newPrice);
}

fs.writeFileSync(file, content, 'utf8');
console.log('Update complete.');
