const fs = require('fs');

const path = 'd:/suriyamillets/src/data/cosmeticsProducts.js';
let content = fs.readFileSync(path, 'utf8');

const lines = content.split('\n');
const newLines = lines.filter(line => {
    if (line.startsWith('import ')) {
        if (line.includes('Incense Sticks')) return false;
        if (line.includes('other home needs')) return false;
        if (line.includes('Floor Cleaner Webp')) return false;
    }
    return true;
});

fs.writeFileSync(path, newLines.join('\n'), 'utf8');
console.log('Successfully updated paths in cosmeticsProducts.js');
