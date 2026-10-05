const fs = require('fs');
let file = 'd:/suriyamillets/src/data/cosmeticsProducts.js';
let content = fs.readFileSync(file, 'utf8');

// Avocado Facewash (id 227)
content = content.replace(
    /"name":\s*"Avacado Facewash",[\s\S]*?"variants":\s*\[\s*\{\s*"size":\s*"Standard",\s*"price":\s*\d+\s*\}\s*\]/,
    (match) => match.replace('"size": "Standard"', '"size": "200ml"').replace(/"price":\s*\d+/, '"price": 400')
);

// Neempapaya Facewash (id 228)
content = content.replace(
    /"name":\s*"Neempapaya Facewash",[\s\S]*?"variants":\s*\[\s*\{\s*"size":\s*"Standard",\s*"price":\s*\d+\s*\}\s*\]/,
    (match) => match.replace('"size": "Standard"', '"size": "200ml"').replace(/"price":\s*\d+/, '"price": 300')
);

// Orange Facewash (id 229)
content = content.replace(
    /"name":\s*"Orange Facewash",[\s\S]*?"variants":\s*\[\s*\{\s*"size":\s*"Standard",\s*"price":\s*\d+\s*\}\s*\]/,
    (match) => match.replace('"size": "Standard"', '"size": "200ml"').replace(/"price":\s*\d+/, '"price": 300')
);

// Teatree Facewash (id 230)
content = content.replace(
    /"name":\s*"Teatree Facewash",[\s\S]*?"variants":\s*\[\s*\{\s*"size":\s*"Standard",\s*"price":\s*\d+\s*\}\s*\]/,
    (match) => match.replace('"size": "Standard"', '"size": "200ml"').replace(/"price":\s*\d+/, '"price": 360')
);

// Hibiscus Face wash (id 282)
content = content.replace(
    /"name":\s*"Hibiscus Face wash",[\s\S]*?"variants":\s*\[\s*\{\s*"size":\s*"Standard",\s*"price":\s*\d+\s*\}\s*\]/,
    (match) => match.replace('"size": "Standard"', '"size": "200ml"').replace(/"price":\s*\d+/, '"price": 240')
);

fs.writeFileSync(file, content, 'utf8');
console.log('Update complete.');
