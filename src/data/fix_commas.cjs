const fs = require('fs');

const path = 'd:/suriyamillets/src/data/cosmeticsProducts.js';
let content = fs.readFileSync(path, 'utf8');

// Replace } followed by optional whitespace and { with }, {
// Ensure we don't break things like { } by requiring at least one newline
content = content.replace(/\}\s*\n\s*\{/g, '},\n    {');

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed missing commas!');
