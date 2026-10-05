const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

// The product block looks something like:
// {
//     "id": 123,
//     "name": "NUTS & SEEDS",
//     "slug": "nuts-seeds",
//     "category": "MAX PROTIEN BAR",
//     ...
//     "rating": 4.3,
//     "reviews": 31
// },

// We need to parse JSON to safely remove it, or use a robust regex.
// Parsing JSON is safer. However, products.js might not be pure JSON (e.g. export const products = [...]).
// Let's check how it's structured. Usually it's `export const products = [...]` or `const products = [...]`.
// We can use regex to remove the object.

const regex = /\{\s*\"id\":\s*\d+,\s*\"name\":\s*\"NUTS & SEEDS\",\s*\"slug\"[\s\S]*?\"reviews\":\s*\d+\s*\},?/g;
content = content.replace(regex, '');

fs.writeFileSync('src/data/products.js', content);
console.log('Removed NUTS & SEEDS from catalog!');
