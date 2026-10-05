const fs = require('fs');
const path = require('path');
const content = fs.readFileSync(path.join(__dirname, 'src', 'data', 'products.js'), 'utf8');
const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
    const lineLower = lines[i].toLowerCase();
    if (lineLower.includes('"name":') && (lineLower.includes('barley') || lineLower.includes('barely') || lineLower.includes('beet') || lineLower.includes('malt'))) {
        console.log(`Line ${i + 1}: ${lines[i].trim()}`);
    }
}
