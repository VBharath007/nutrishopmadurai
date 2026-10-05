const fs = require('fs');

const productsPath = 'd:/suriyamillets/src/data/products.js';
let productsContent = fs.readFileSync(productsPath, 'utf8');

// The moved items have IDs < 1000. We need to add 1000 to their IDs so they show up.
// IDs to change: 402, 274, 275, 276, 277, 278, 279, 294, 295, 296
const idsToUpdate = [402, 274, 275, 276, 277, 278, 279, 294, 295, 296];

idsToUpdate.forEach(id => {
    // Find "id": 402,
    const regex = new RegExp(`"id":\\s*${id},`, 'g');
    productsContent = productsContent.replace(regex, `"id": ${id + 1000},`);
});

fs.writeFileSync(productsPath, productsContent, 'utf8');
console.log('Successfully updated IDs!');
