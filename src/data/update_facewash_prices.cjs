const fs = require('fs');
let file = 'd:/suriyamillets/src/data/cosmeticsProducts.js';
let content = fs.readFileSync(file, 'utf8');

// A generic function to update both main price and variant price
function updateProduct(name, newPrice) {
    const regex = new RegExp(`("name":\\s*"${name}",[\\s\\S]*?"price":\\s*)\\d+([\\s\\S]*?"variants":\\s*\\[\\s*\\{\\s*"size":\\s*)"200ml"(,\\s*"price":\\s*)\\d+(\\s*\\}\\s*\\])`, "g");
    content = content.replace(regex, (match, p1, p2, p3, p4) => {
        return p1 + newPrice + p2 + '"200ml"' + p3 + newPrice + p4;
    });
}

updateProduct("Avacado Facewash", 400);
updateProduct("Neempapaya Facewash", 300);
updateProduct("Orange Facewash", 300);
updateProduct("Teatree Facewash", 360);
updateProduct("Hibiscus Face wash", 240);

fs.writeFileSync(file, content, 'utf8');
console.log('Update complete.');
